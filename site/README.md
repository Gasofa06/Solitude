# Website User Files
Este documento ofrece una visión general de los archivos que componen la interfaz de usuario de _incognito dB_, abarcando además aquellos archivos que tienen interacción directa con el servidor. 

Con el propósito de adquirir el artículo deseado de manera confidencial, estos archivos desempeñan funciones adicionales más allá de su labor en la presentación y estructuración del proyecto. En efecto, también llevan a cabo los procesos necesarios antes y después de solicitar el artículo específico que tenemos en mente.

## Files Structure
```
 site
  ├── css
  │    └── index.css
  │
  ├── javascript
  │    ├── articleCodeBook.js
  │    ├── bz2.js
  │    ├── detectTheme.js
  │    └── main.js
  │
  ├── pkg
  │    └── ...
  │
  ├── public
  │    └── logo.png
  │
  └── index.html
```

## Description

### CSS folder

La carpeta de CSS alberga el archivo `main.css``, el cual se encarga de dar estilo a la presentación visual de _incognito dB_. En este archivo, se pueden identificar diversas secciones que se encuentran delimitadas por diferentes comentarios:

- Con el propósito de marcar divisiones más amplias, se utiliza el siguiente formato:

```
/* ================================================== */
/* ================================================== */
/* ================================================== */
/*                                                    */
/*                                                    */
/*                  SOMETHING INSIDE                  */
/*                                                    */
/*                                                    */
/* ================================================== */
/* ================================================== */
/* ================================================== */
```

- Para establecer separaciones entre las subcategorías dentro de estas secciones, se emplea la siguiente estructura:

```
/* ================================================== */
/*                  SOMETHING INSIDE                  */
/* ================================================== */
```

- Asimismo, para diferenciar las sub-subcategorías en estas secciones, se sigue la siguiente pauta:

```
/* ---------------- SOMETHING INSIDE ---------------- */
```

### JavaScript folder

TODO

### PKG folder

La carpeta `pkg/` es creada mediante la siguiente instrucción (ejecutada en `../components/client/`):

```
wasm-pack build --target web --out-dir ../../site/dist/pkg
```

Dentro de esta carpeta se encuentran los resultados de la compilación del código en Rust proveniente de `../components/client/`, transformado en WebAssembly y optimizado para su desempeño en entornos web. Esta carpeta juega un papel fundamental en varios procesos relacionados con el cifrado y descifrado de mensajes.

> [!NOTE]
> Esta carpeta no se encuentra en el repositorio de GitHub, ya que ha sido excluida mediante la configuración del archivo `.gitignore`. Para generarla, es necesario ejecutar el comando mencionado previamente en la dirección especificada.

### Public folder

La carpeta `public/` contiene únicamente el logotipo distintivo de la página.

### Index HTML file

El archivo `index.html` contiene la página de inicio de _incognito dB_. El archivo `index.html` contiene la página de inicio de _incognito dB_. La estructura en HTML del artículo se genera en el archivo articleCodeBook.js ubicado en la carpeta de JavaScript.