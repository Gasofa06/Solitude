use std::env;
use std::fs::File;
use std::io::Write;
use std::slice::from_raw_parts;

use spiral_rs::util::{ params_from_json };
use spiral_rs::server::{ load_db_from_seek };
use spiral_rs::params::project_parameters::PROJECT_PARAMETERS;

fn main() {
  // Obtenemos los argumentos de la línea de comandos.
  let args: Vec<String> = env::args().collect();
  let inp_db_path: &String = &args[1]; // Ruta de entrada de la base de datos.
  let out_db_path: &String = &args[2]; // Ruta de salida de la base de datos procesada.

  // Cargamos los parámetros en formato JSON utilizando la constante PROJECT_PARAMETERS.
  let params = &params_from_json(&PROJECT_PARAMETERS);

  println!("\nPreprocessing database...\n");

  // Cargamos la base de datos a partir de la ruta de entrada y los parámetros del proyecto.
  let db = load_db_from_seek(params, inp_db_path);

  println!("\nDone preprocessing. Outputting...");

  // Creamos un archivo de salida para almacenar la base de datos procesada.
  let mut out_file = File::create(out_db_path).unwrap();

  // Creamos un `slice` de bytes sin signo a partir de un vector de datos `db`.
  // El slice resultante, 'output_as_u8_slice', apunta a los datos del vector `db`.
  let output_as_u8_slice = unsafe {
    // La función `from_raw_parts` crea un `slice` a partir de un puntero crudo y un tamaño.

    // Obtenemos un puntero crudo al inicio del vector `db` y lo convertimos a un puntero de bytes sin signo.
    let ptr = db.as_ptr() as *const u8;

    // Calculamos el tamaño del `slice` multiplicando la longitud del vector `db` por 8, ya que cada elemento del vector ocupa 8 bytes.
    let size = db.len() * 8;

    from_raw_parts(ptr, size)
  };

  // Escribimos el `slice` de bytes en el archivo de salida.
  out_file.write_all(output_as_u8_slice).unwrap();

  println!("\nDone, database preprocessed correctly.\n");
}
