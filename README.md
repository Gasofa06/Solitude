<br/>

<h1 align="center">incognito dB</h1>

<p align="center">
  A private information retrival webpage powered by <a href="https://blyss.dev/">Spiral</a> that allows anonymous access to a comprehensive selection of articles.
</p>

<p align="center">
  <a href="">Docs</a>
  &nbsp; | &nbsp;
  <a href="">Website</a>
  &nbsp; | &nbsp;
  <a href="mailto:rogerrovi2006@gmail.com">Contact</a>
</p>

<h4 align="center">
  <a href="https://github.com/Gasofa06/incognito-db/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/Gasofa06/incognito-db?color=blue">
  </a>
  <a href="https://twitter.com/rovi_roger">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/rovi_roger?label=@rovi_roger">
  </a>
  <a href="https://blyss.dev/">
    <img alt="Static Badge" src="https://img.shields.io/badge/build-spiral-blue?label=powered%20by&color=blue">
  </a>
</h4>

With the sole purpose of achieving the level of privacy and confidentiality that we all wish to attain in our database queries, the [_incognito dB_]() platform utilizes homomorphic encryption for [private information retrieval](https://en.wikipedia.org/wiki/Private_information_retrieval).

This approach guarantees that no individual, even including the server itself, possesses awareness of the specific information we have both requested and received.

Data is **now** cryptographically protected even throughout the process.

## Demo

You can quickly experience the _indognito dB_ platform by visiting its own [website]().

### Video

...

### Images

...

## Quick start (local)

1. In client path: wasm-pack build --target web --out-dir ../../site/pkg
2. In spiral-rs/src: cargo run --bin preprocess_db -- ..\..\..\server\database\db\db.txt ..\..\..\server\database\db\preprocessed_db.txt
3. In server/src: cargo run build -- ../../database/db/preprocessed_db.txt 8080

## Documentation

...