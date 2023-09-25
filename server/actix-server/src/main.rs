use futures::StreamExt;
use spiral_rs::aligned_memory::*;
use spiral_rs::client::*;
use spiral_rs::params::model_parameters::*;
use spiral_rs::server::*;

use spiral_rs::util::{ params_from_json };
use spiral_rs::params::project_parameters::{ PROJECT_PARAMETERS };

use std::collections::HashMap;
use std::collections::VecDeque;
use std::env;
use std::fs::File;
use std::sync::Mutex;

use actix_cors::Cors;
use actix_web::error::PayloadError;
use actix_files::{ Files, NamedFile };
use actix_web::{ get, http, middleware, post, web, App, HttpServer };
use serde::Deserialize;

const PUB_PARAMS_MAX: usize = 250;

// Variables para la direccion y el nombre de archivos.

const PATH_SITE: &str = "../../../site/";
const HTML_FILENAME: &str = "html/p_home.html";
const MAIN_DICT: &str = "../../database/shared_data/main_dict.json";
const PATH_TITLE_INDICES: &str = "../../database/shared/title_and_idx.json";
const PATH_TITLE_TOPICS: &str = "../../database/shared/title_and_topics.json";
const PATH_TOPICS: &str = "../../database/shared_data/topics.json";

struct ServerState<'a> {
  fname: String,
  params: &'a Params,
  db: AlignedMemory64,
  pub_params_map: Mutex<
    (VecDeque<String>, HashMap<String, PublicParameters<'a>>)
  >,
}

async fn get_request_bytes(
  mut body: web::Payload,
  sz_bytes: usize
) -> Result<Vec<u8>, http::Error> {
  let mut bytes = web::BytesMut::new();
  while let Some(item) = body.next().await {
    let item_ref = &item?;
    bytes.extend_from_slice(item_ref);
    if bytes.len() > sz_bytes {
      println!("too big! {}", sz_bytes);
      return Err(PayloadError::Overflow.into());
    }
  }
  Ok(bytes.to_vec())
}

fn get_other_io_err() -> PayloadError {
  PayloadError::Io(std::io::Error::from(std::io::ErrorKind::Other))
}

fn other_io_err<T>(_: T) -> PayloadError {
  get_other_io_err()
}

fn get_not_found_err() -> PayloadError {
  PayloadError::Io(std::io::Error::from(std::io::ErrorKind::NotFound))
}

#[derive(Deserialize)]
pub struct CheckUuid {
  uuid: String,
}

#[get("/api/check")]
async fn check<'a>(
  web::Query(query_params): web::Query<CheckUuid>,
  data: web::Data<ServerState<'a>>
) -> Result<String, http::Error> {
  let pub_params_map = data.pub_params_map.lock().map_err(other_io_err)?;
  let has_uuid = pub_params_map.1.contains_key(&query_params.uuid);
  Ok(
    format!("{{\"uuid\":\"{}\", \"is_valid\":{}}}", query_params.uuid, has_uuid)
  )
}

// `body` es un parámetro de tipo `web::Bytes` que representa el cuerpo de la solicitud HTTP. `web::Bytes` es una estructura de datos inmutable que contiene los bytes del cuerpo de la solicitud. Es possible acceder a los datos dentro de `body` para procesarlos.

// `data` es una instancia de datos compartidos entre los diferentes controladores y middlewares; la cual es de tipo `ServerState<'a>` (definido anteriormente). La instecia compartida se crea en la funcion `main()` de este mismo programa.

#[post("/api/setup")]
async fn setup<'a>(
  body: web::Bytes,
  data: web::Data<ServerState<'a>>
) -> Result<String, http::Error> {
  println!("Seting up some query...");

  // Parse the request
  let pub_params = PublicParameters::deserialize(data.params, &body);

  // Generate a UUID and store it
  let uuid = uuid::Uuid::new_v4();
  let mut pub_params_map = data.pub_params_map.lock().map_err(other_io_err)?;
  pub_params_map.0.push_back(uuid.to_string());
  println!("Hi");
  pub_params_map.1.insert(uuid.to_string(), pub_params);

  // If too many public parameters, remove by LRU
  if pub_params_map.1.len() > PUB_PARAMS_MAX {
    let lru_uuid_str = pub_params_map.0.pop_front().ok_or(get_other_io_err())?;
    pub_params_map.1.remove(&lru_uuid_str);
  }

  Ok(format!("{{\"id\":\"{}\"}}", uuid.to_string()))
}

const UUID_V4_STR_BYTES: usize = 36;

#[post("/api/query")]
async fn query<'a>(
  body: web::Payload,
  data: web::Data<ServerState<'a>>
) -> Result<Vec<u8>, http::Error> {
  // Parse the UUID
  let request_bytes = get_request_bytes(
    body,
    UUID_V4_STR_BYTES + data.params.query_bytes()
  ).await?;
  let uuid_bytes = &request_bytes.as_slice()[..UUID_V4_STR_BYTES];
  let data_bytes = &request_bytes.as_slice()[UUID_V4_STR_BYTES..];
  let uuid = uuid::Uuid
    ::try_parse_ascii(uuid_bytes)
    .map_err(|_| PayloadError::EncodingCorrupted)?;

  // Look up UUID and get public parameters
  let pub_params_map = data.pub_params_map.lock().map_err(other_io_err)?;
  let pub_params = pub_params_map.1
    .get(&uuid.to_string())
    .ok_or(get_not_found_err())?;

  // Parse the query
  let query = Query::deserialize(data.params, data_bytes);

  // Process the query
  let result = process_query(
    data.params,
    pub_params,
    &query,
    data.db.as_slice()
  );

  Ok(result)
}

// #[get("/data/title_and_idx.json")]
// async fn article_indices() -> Result<NamedFile, std::io::Error> {
//   match NamedFile::open(PATH_TITLE_INDICES) {
//     Ok(file) => Ok(file),
//     Err(err) => Err(err),
//   }
// }
// 
// #[get("/data/title_and_topics.json")]
// async fn article_titles_and_topics() -> Result<NamedFile, std::io::Error> {
//   match NamedFile::open(PATH_TITLE_TOPICS) {
//     Ok(file) => Ok(file),
//     Err(err) => Err(err),
//   }
// }

#[get("/data/main_dict.json")]
async fn main_dict() -> Result<NamedFile, std::io::Error> {
  match NamedFile::open(MAIN_DICT) {
    Ok(file) => Ok(file),
    Err(err) => Err(err),
  }
}

#[get("/data/topics.json")]
async fn article_topics() -> Result<NamedFile, std::io::Error> {
  match NamedFile::open(PATH_TOPICS) {
    Ok(file) => Ok(file),
    Err(err) => Err(err),
  }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  println!("\nStarting server.");

  // Leemos los valores del argumento.

  // Ponemos `--` para indicar que los siguientes argumentos son para nuestro programa en lugar de para `cargo`.
  // Para ejecutar el programa con argumentos seria un comando similar al siguiente: `cargo run -- [primer argumento] [segundo argumento] [...] [n argumento]`

  // Argumentos validos y necesarios:
  //      1) Direccion en donde se encuentra la base de datos ya procesada.
  //      2) Puerto.

  let args: Vec<String> = env::args().collect();
  let db_preprocessed_path = &args[3];
  let port = &args[4];

  println!("\nThe database preprocessed path is `{}`", db_preprocessed_path);
  println!("The server will be listening on port {}.", port);

  // `cfg_expand` contiene los paramentros necesarios para inicializar un objeto `Params`.

  let cfg_expand = &PROJECT_PARAMETERS;
  println!("{}", cfg_expand);
  let box_params = Box::new(params_from_json(cfg_expand));
  let params: &'static Params = Box::leak(box_params);

  println!("\nLoading preprocessed database...");
  let mut file = File::open(db_preprocessed_path).unwrap();
  let db = load_preprocessed_db_from_file(params, &mut file);
  println!("Done loading.");

  // Creamos una nueva variable de tipo `ServerState<'a>` y la envolvemos en `web::Data::new(...)`.
  // Al hacerlo, estamos creando una instancia de `web::Data` que contiene la variable de tipo `ServerState<'a>` como dato compartido.
  // Esto implica que el dato en cuestion sera compartido entre los diferentes controladores y middlewares de esta misma aplicación web.

  // Para poder accede a `server_state`, deberemos pasar la instancia `web::Data<ServerState<'a>>` a los controladores o middlewares que necesiten acceder a ella.
  // Por ejemplo, una funcion definida como `async fn index(data: web::Data<ServerState<'a>>)` podra acceder a la variable `server_state`.

  let server_state = ServerState {
    fname: db_preprocessed_path.clone(),
    params: params,
    db: db,
    pub_params_map: Mutex::new((VecDeque::new(), HashMap::new())),
  };
  let state = web::Data::new(server_state);

  // `cors_fn` almacena la configuracion CORS (Cross-Origin Resource Sharing) para controlar las solicitudes de recursos que accepta esta web.

  let cors_fn = || {
    Cors::default()
      .allow_any_origin()
      .allowed_headers([
        http::header::ORIGIN,
        http::header::CONTENT_TYPE,
        http::header::ACCEPT,
      ])
      .allowed_methods(vec!["GET", "POST", "OPTIONS"])
      .max_age(3600)
  };

  // Inicializamos el servidor.

  let app_build = move ||
    App::new()
      .wrap(middleware::Compress::default())
      .wrap(cors_fn())
      .app_data(state.clone())
      .app_data(web::PayloadConfig::new(1 << 32))
      .service(setup) // POST
      .service(query) // POST
      .service(check) // GET
      // .service(article_indices) // GET
      // .service(article_titles_and_topics) // GET
      .service(main_dict)
      .service(article_topics) // GET
      .service(Files::new("/", PATH_SITE).index_file(HTML_FILENAME));

  HttpServer::new(app_build)
    .bind(("localhost", port.parse().unwrap()))
    .unwrap()
    .run().await
}
