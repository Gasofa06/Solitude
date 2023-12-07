[website]: https://incognitodb.com
[blyss]: https://github.com/blyssprivacy

# incognito dB

Benvingut/da al monorepositori de codi obert per a [incognito dB][website], dedicat a garantir la privacitat de l'usuari. S'utilitza el codi obert proporcionat per l'empresa [Blyss][blyss] amb l'objectiu de proporcionar accés totalment confidencial a una varietat d'articles. Ningú, ni tan sols el servidor en si mateix, serà capaç de conèixer el que estàs cercant; tot gràcies als principis de l'Homomorphic Encryption.

> L'arxiu README està disponible tant en [espanyol](https://github.com/Gasofa06/incognito-db/blob/main/README.es.md) com en [anglès](https://github.com/Gasofa06/incognito-db/blob/main/README.md).

> Un article sobre el projecte també està disponible [aquí](https://github.com/Gasofa06/Treball-de-Recerca).

<br />

## :dart: Introducció

### Economia de vigilància

És difícil mantenir secrets en l’era digital. Malgrat la criptografia i les diverses legislacions implementades, el problema de la privacitat continua assetjant als usuaris en Internet. Amb cada missatge, cada cerca i cada interacció; les empreses aprenen _quelcom_ més d’informació sobre nosaltres, fent que el preu que hem de pagar per estar connectats sigui la nostra privacitat.

Si bé s’espera que siguem els propietaris de les nostres dades personals, per poder participar mínimament en la vida moderna, ens veiem obligats a renunciar a aquest dret fonamental. Degut, en part, a la proliferació de grans i petites empreses tecnològiques que assumeixen el control de les nostres dades, amb l’únic objectiu d’obtenir-ne benefici (el que se li anomena _economia de vigilància_).

> Tanmateix, la implementació d’un sistema que no posa en control als usuaris serà, immediatament o amb el temps, rebutjat per tants d’ells que no pugui esdevenir i continuar essent una tecnologia unificadora.
>
> Cameron, K. (2005, maig 11). _The Laws of Identity_. [PDF link](https://www.identityblog.com/stories/2005/05/13/TheLawsOfIentity.pdf).

<br />

### Confidencialitat de les cerques

En el context de l'economia de vigilància, l'historial de cerca esdevé una eina magnífica per a les empreses per conèixer els elements definitoris de la nostra personalitat i els nostres gustos. És més:

> L'any 2020, Mozilla va publicar una investigació en què afirmava que els historials de cerca són un 99% únics a l'usuari, tot després d'haver analitzat 48,103 historials diferents.
>
> Mozilla Research. [PDF link](https://www.usenix.org/system/files/soups2020-bird.pdf).

Aixo demostrar la unicitat i com els Browsing histories are unique enough to reliably identify users. Tot enfatitzant la necessitat d'un canvi cap a pràctiques més transparents i respectuoses davant la gestió de dades personals, o cap a un entorn on les proves criptografiques utilitzades siguin suficient justificacio com per asegura que l'empresa sigui incapaç de saber el que busquem.

<br />

### What's for?

> Incognito dB és un motor de cerca de bases de dades dissenyat amb l’objectiu de protegir la privadesa dels usuaris. 

Mitjançant aquesta eina, qualsevol persona pot accedir a una àmplia varietat d’articles de manera confidencial. Totes les sol·licituds d’accés a informació es xifren de manera que ni el servidor, ni cap altra entitat externa, té accés a les cerques dels consumidors.

Amb la finalitat contrarestar la falta de privacitat en Internet, Incognito dB es recolza en els principis de l’Homomorphic Encryption per garantir la Recuperació d’Informació Privada (Private Information Retrieval, PIR). És a dir, implementa algoritmes homomòrfics que asseguren que els usuaris aconsegueixin la informació que cerquen sense revelar cap detall personal o específic de la seva consulta, gràcies al suport del codi obert proporcionat per l’empresa [Blyss](https://github.com/blyssprivacy).

Així doncs, per tal de preservar la sostenibilitat en Internet, és imperatiu que el poder retrocedeixi de l’empresa a l’individu i que aquest últim assoleixin la privacitat que li pertoca. Incognito dB es nomes una demo per intentar preservar la privacitat dels usuaris mentre és una eina util.

Pots accedir al lloc web fent clic [aquí][website].

<br />

## :bulb: Features and Benefits

* Built-in LSP ([Language Server Protocol](https://microsoft.github.io/language-server-protocol/)) support to give you intelligent code features such as: completion, diagnostics and code actions
* Modal editing support as first class citizen (Vim-like, and toggleable)
* Built-in remote development support inspired by [VSCode Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Enjoy the benefits of a "local" experience, and seamlessly gain the full power of a remote system.
* Plugins can be written in programming languages that can compile to the [WASI](https://wasi.dev/) format (C, Rust, [AssemblyScript](https://www.assemblyscript.org/))
* Built-in terminal, so you can execute commands in your workspace, without leaving Lapce.

<br />

## :camera: Screenshots

<div alt style="text-align: center;">
    <picture>
        <a href="https://www.twenty.com">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-dark.png">
            <img alt="User view" src="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-light.png" />
        </a>
    </picture>
</div>

<br />

## :construction: Limitations
Although we strive to enhance enterprise-level software development efficiency and reduce barriers with the help of large-scale language models, there are still some limitations in the current version:

- The generation of requirement and interface documentation may not be precise enough and might not meet developer intent in complex scenarios.
- In the current version, automating the understanding of existing project code is not possible. We are exploring a new solution that has shown promising results during validation and will be introduced in a future version.

<br />

## :open_file_folder: About this repository

### Top-level layout

This repository's contents is divided across four primary sections:

- `/apps` contains the source for our applications
- `/packages` contains the source for our public packages
- `/scripts` contains scripts used for building and publishing
- `/assets` contains icons and translations relied on by the app
- `/docs` contains the content for our docs site at [tldraw.dev](https://tldraw.dev)

### Applications

- `examples`: our local development / examples project
- `vscode`: our [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=tldraw-org.tldraw-vscode)

### Packages

- `assets`: a library for working with tldraw's fonts and translations
- `editor`: the tldraw editor
- `state`: a signals library, also known as signia
- `store`: an in-memory reactive database
- `tldraw`: the main tldraw package containing both the editor and the UI
- `tlschema`: shape definitions and migrations
- `utils`: low-level data utilities shared by other libraries
- `validate`: a validation library used for run-time validation

<br />

## :mailbox_closed: Feedback & Contact

Feel free to reach out if you have any questions, suggestions, or feedback regarding this project. You can contact me via email or connect with me on social media as well.

Email: [rogerrovi2006@gmail.com](mailto:rogerrovi2006@gmail.com)

Twitter: [@rovi_roger](https://twitter.com/rovi_roger)

<br />

## :warning: Disclaimer

This project, DevOpsGPT, is an experimental application and is provided "as-is" without any warranty, express or implied. By using this software, you agree to assume all risks associated with its use, including but not limited to data loss, system failure, or any other issues that may arise.

<br />

## :page_with_curl: License

Lapce is released under the Apache License Version 2, which is an open source license. You may contribute to this project, or use the code as you please as long as you adhere to its conditions. You can find a copy of the license text here: [`LICENSE`](LICENSE).

**Note**: This software is not affiliated with OpenAI.

> Having access to a junior programmer working at the speed of your fingertips ... can make new workflows effortless and efficient, as well as open the benefits of programming to new audiences.
>
> — _OpenAI's Code Interpreter Release_
