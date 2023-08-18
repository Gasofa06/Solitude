In client path: wasm-pack build --target web --out-dir ../../site/dist/pkg

In spiral-rs/src: cargo run --bin preprocess_db --
..\..\..\server\database\db.json ..\..\..\server\database\preprocessed_db.json

In server/src: cargo run build -- ../../database/preprocessed_db.json 8000
