use std::convert::TryInto;

use rand::SeedableRng;
use rand_chacha::ChaCha20Rng;
use wasm_bindgen::prelude::*;

use spiral_rs::{ util::*, params::*, client::*, discrete_gaussian::* };

const UUID_V4_LEN: usize = 36;

// console_log! macro
#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}
#[allow(unused_macros)]
macro_rules! console_log {
  ($($t:tt)*) => (log(&format_args!($($t)*).to_string()));
}

// Container class for a static lifetime Client
// Avoids a lifetime in the return signature of bound Rust functions
#[wasm_bindgen]
pub struct WrappedClient {
  client: &'static mut Client<'static>,
}

// Very simply test to ensure random generation is not obviously biased.
fn _dg_seems_okay() {
  let params = get_test_params();
  let mut rng = ChaCha20Rng::from_entropy();
  let dg = DiscreteGaussian::init(&params);
  let mut v = Vec::new();
  let trials = 10000;
  let mut sum = 0;
  for _ in 0..trials {
    let val = dg.sample(&mut rng);
    v.push(val);
    sum += val;
  }
  let mean = (sum as f64) / (trials as f64);
  let std_dev = params.noise_width / f64::sqrt(2f64 * std::f64::consts::PI);
  let std_dev_of_mean = std_dev / f64::sqrt(trials as f64);
  assert!(f64::abs(mean) < std_dev_of_mean * 5f64);
}

// Atributo #[wasm_bindgen] utilizado para exportar la función al entorno de ejecución de WebAssembly.
#[wasm_bindgen]
/// Inicializa un objeto WrappedClient utilizando los parámetros proporcionados.
///
/// # Argumentos
///
/// * `json_params` => Parámetros opcionales en formato JSON.
///
/// # Devoluciones
///
/// * Un objeto WrappedClient inicializado.
pub fn initialize(json_params: Option<String>) -> WrappedClient {
  // `project_parameters` es una referencia a la constante `PROJECT_PARAMETERS`,
  // la cual hace referencia a los parámetros utilizados en el proyecto.
  let project_parameters = &project_parameters::PROJECT_PARAMETERS;

  // Creamos una copia de `project_parameters` pero con todas las comillas simples
  // reemplazadas por comillas dobles, ya que el formato esperado para los parámetros
  // es JSON y se están realizando ajustes para asegurar que los delimitadores sean válidos.
  let mut parameters_json = project_parameters.replace("'", "\"");

  // Verifica si `json_params` tiene un valor `Some`. Si es así, reemplaza el contenido
  // de `parameters_json` con el valor desempaquetado de `json_params`.
  if json_params.is_some() {
    parameters_json = json_params.unwrap();
  }

  // Convierte los parámetros en formato JSON a una estructura de datos adecuada utilizando
  // la función `params_from_json`.
  let p = params_from_json(&parameters_json);
  let parameters = Box::leak(Box::new(p));

  // Inicializa un objeto `Client` utilizando los parámetros obtenidos.
  let c = Client::init(parameters);
  let client = Box::leak(Box::new(c));

  // Devuelve un objeto `WrappedClient` que contiene el objeto `Client` inicializado.
  WrappedClient { client }
}

#[wasm_bindgen]
pub fn generate_keys(
  c: &mut WrappedClient,
  seed: Box<[u8]>,
  generate_pub_params: bool
) -> Option<Box<[u8]>> {
  if generate_pub_params {
    Some(
      c.client
        .generate_keys_from_seed((*seed).try_into().unwrap())
        .serialize()
        .into_boxed_slice()
    )
  } else {
    c.client.generate_secret_keys_from_seed((*seed).try_into().unwrap());
    None
  }
}

#[wasm_bindgen]
pub fn generate_query(
  c: &mut WrappedClient,
  id: &str,
  idx_target: usize
) -> Box<[u8]> {
  assert_eq!(id.len(), UUID_V4_LEN);
  let query = c.client.generate_query(idx_target);
  let mut query_buf = query.serialize();
  let mut full_query_buf = id.as_bytes().to_vec();
  full_query_buf.append(&mut query_buf);
  full_query_buf.into_boxed_slice()
}

#[wasm_bindgen]
pub fn decode_response(c: &mut WrappedClient, data: Box<[u8]>) -> Box<[u8]> {
  c.client.decode_response(&*data).into_boxed_slice()
}
