# _incognito dB_

## Before Running It

In client path: wasm-pack build --target web --out-dir ../../site/pkg

In spiral-rs/src: cargo run --bin preprocess_db -- ..\..\..\server\database\db\db.txt ..\..\..\server\database\db\preprocessed_db.txt

In server/src: cargo run build -- ../../database/db/preprocessed_db.txt 8080