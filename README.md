[website]: https://incognitodb.com
[blyss]: https://github.com/blyssprivacy

<p align="right">
    <a href="https://github.com/Gasofa06/incognito-db/blob/main/docs/README.es.md">Espanyol</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/Gasofa06/incognito-db/blob/main/README.md">Anglès</a>
</p>

# Solitude Search

<div alt style="text-align: center;">
    <picture>
        <a href="https://incognitodb.com">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-dark.png">
            <img alt="Device with the platform" src="https://raw.githubusercontent.com/twitter/communitynotes/main/documentation/images/help-rate-this-note-expanded.png" />
        </a>
    </picture>
</div>

<br />

> Incognito dB és un motor de cerca de bases de dades dissenyat amb l’objectiu de protegir la privadesa dels usuaris. Mitjançant Homomorphic Encryption i Private Information Retrival, la plataforma dissenyada permet l’accés confidencial a una gran selecció d’articles.

<br />

## :wave: Benvingut/da

Benvingut/da al monorepositori de codi obert per a [incognito dB][website], dedicat a garantir la privacitat de l'usuari. S'utilitza el codi obert proporcionat per l'empresa [Blyss][blyss] amb l'objectiu de proporcionar accés totalment confidencial a una varietat d'articles. Ningú, ni tan sols el servidor en si mateix, serà capaç de conèixer el que estàs cercant; tot gràcies als principis de l'Homomorphic Encryption.

<br />

<div alt style="text-align: center;">
    <picture>
        <a href="https://incognitodb.com">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-dark.png">
            <img alt="Device with the platform" src="https://github.com/Gasofa06/Treball-de-Recerca/blob/main/mockup/booklet_Mockup.jpg" />
        </a>
    </picture>
</div>

<br />

> Un article sobre el projecte també està disponible [aquí](https://github.com/Gasofa06/Treball-de-Recerca).

<br />

## :dart: Introducció

### Economia de vigilància

És difícil mantenir secrets en l’era digital. Malgrat la criptografia i les diverses legislacions implementades, el problema de la privacitat continua assetjant als usuaris en Internet. Amb cada missatge, cada cerca i cada interacció; les empreses aprenen _quelcom_ més d’informació sobre nosaltres, fent que el preu que hem de pagar per estar connectats sigui la nostra privacitat.

Si bé s’espera que siguem els propietaris de les nostres dades personals, per poder participar mínimament en la vida moderna, ens veiem obligats a renunciar a aquest dret fonamental. Degut, en part, a la proliferació de grans i petites empreses tecnològiques que assumeixen el control de les nostres dades, amb l’únic objectiu d’obtenir-ne benefici (el que se li anomena _economia de vigilància_).

> Tanmateix, la implementació d’un sistema que no posa en control als usuaris serà, immediatament o amb el temps, rebutjat per tants d’ells que no pugui esdevenir i continuar essent una tecnologia unificadora.
>
> Cameron, K. (2005, maig 11). _The Laws of Identity_. [PDF link](https://www.identityblog.com/stories/2005/05/13/TheLawsOfIentity.pdf).

---

### Historial de navegació

En el context de l'economia de vigilància, l'historial de cerca esdevé una eina magnífica per a les empreses per conèixer els elements definitoris de la nostra personalitat i els nostres gustos. És més:

> L'any 2020, Mozilla va publicar una investigació en què afirmava que els historials de cerca són un 99% únics a l'usuari, tot després d'haver analitzat 48,103 historials diferents.
>
> Mozilla Research. [PDF link](https://www.usenix.org/system/files/soups2020-bird.pdf).

Això demostra la singularitat dels historials de cerca i com aquests són prou únics com per a identificar i comprendre als usuaris. Emfatitzant la necessitat d'adoptar pràctiques més transparents i respectuoses davant la gestió de dades personals, o la necessitat de dirigir-nos cap a un entorn on les proves criptogràfiques utilitzades siguin una justificació suficient per garantir que l'empresa no utilitzarà ni compartirà el contingut de les nostres cerques.

---

### Ignota Search com a eina confidencial

Amb la finalitat contrarestar la falta de privacitat en Internet, Incognito dB es recolza en els principis de l’Homomorphic Encryption per garantir la Recuperació d’Informació Privada (Private Information Retrieval, PIR). És a dir, implementa algoritmes homomòrfics que asseguren que els usuaris aconsegueixin la informació que cerquen sense revelar cap detall personal o específic de la seva consulta, gràcies al suport del codi obert proporcionat per l’empresa [Blyss][blyss].

Aquest fet impedeix que les empreses puguin analitzar, utilitzar, vendre o compartir les nostres dades de cerca. Les quals, recordem, són un 99% personals i molt definidores de la nostra identitat. Això es deu al fet que el servidor no té coneixement de la informació que l'usuari ha cercat, tot i haver-li proporcionat el contingut desitjat.

<br />

<div alt style="text-align: center;">
    <picture>
        <a href="https://incognitodb.com">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-dark.png">
            <img alt="Device with the platform" src="https://raw.githubusercontent.com/twitter/communitynotes/main/documentation/images/help-rate-this-note-expanded.png" />
        </a>
    </picture>
</div>

<br />

> Pots accedir al lloc web fent clic [aquí][website].

<br />

## :bulb: Característiques i Avantatges

* Built-in LSP ([Language Server Protocol](https://microsoft.github.io/language-server-protocol/)) support to give you intelligent code features such as: completion, diagnostics and code actions
* Modal editing support as first class citizen (Vim-like, and toggleable)
* Built-in remote development support inspired by [VSCode Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Enjoy the benefits of a "local" experience, and seamlessly gain the full power of a remote system.
* Plugins can be written in programming languages that can compile to the [WASI](https://wasi.dev/) format (C, Rust, [AssemblyScript](https://www.assemblyscript.org/))
* Built-in terminal, so you can execute commands in your workspace, without leaving Lapce.

<br />

## :hammer: Workflow

<br />

<div alt style="text-align: center;">
    <picture>
        <a href="https://incognitodb.com">
            <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/twentyhq/twenty/main/docs/static/img/preview-dark.png">
            <img alt="Device with the platform" src="https://raw.githubusercontent.com/twitter/communitynotes/main/documentation/images/help-rate-this-note-expanded.png" />
        </a>
    </picture>
</div>

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

## :open_file_folder: Folder Structure

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

## :mailbox_closed: _Feedback_ i Contacte

No dubtis en posar-te en contacte si tens alguna pregunta, suggeriment o comentari sobre aquest projecte. Pots contactar-me per correu electrònic o connectar amb mi a través de les xarxes socials.

Email: [rogerrovi2006@gmail.com](mailto:rogerrovi2006@gmail.com)

Twitter: [@rovi_roger](https://twitter.com/rovi_roger)

<br />

## :triangular_flag_on_post: Exempció de Responsabilitat

Aquest projecte, Ignota Search, és una aplicació experimental i es proporciona "tal com és", sense cap garantia, expressa o implícita. En utilitzar aquest programari, accepteu assumir tots els riscos associats amb la seva utilització, incloent-hi, però sense limitar-se, la pèrdua de dades, fallida del sistema o qualsevol altre problema que pugui sorgir.

<br />

## :page_with_curl: License

Ignota Search es publica sota la Llicència MIT, que és una llicència de codi obert. Podeu contribuir a aquest projecte o utilitzar el codi com vulgueu, sempre que es compleixin les seves condicions. Podeu trobar una còpia del text de la llicència aquí: [`LICENSE`](LICENSE).

**Nota**: Aquest programa no està afiliat amb [Blyss][blyss].
