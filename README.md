<br/>
    
<h1 align="center">incognito dB</h1>

<br />

<p align="center">
  A private information retrival webpage powered by <a href="https://blyss.dev/">Spiral</a> that allows anonymous access to a comprehensive selection of articles, ensuring users privacy while delivering the requested content.
</p>

<br />

<p align="center">
  <a href="">Docs</a>
  &nbsp; | &nbsp;
  <a href="">Website</a>
  &nbsp; | &nbsp;
  <a href="mailto:rogerrovi2006@gmail.com">Contact</a>
</p>

<br />

<p align="center">
  <a href="https://github.com/Gasofa06/incognito-db/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/Gasofa06/incognito-db?color=blue">
  </a>
  <a href="https://twitter.com/rovi_roger">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/rovi_roger?label=@rovi_roger">
  </a>
  <a href="https://blyss.dev/">
    <img alt="Static Badge" src="https://img.shields.io/badge/build-spiral-blue?label=powered%20by&color=blue">
  </a>
</p>

<br />

<img src="res/imgs/platform_screen.png"></a>

<br />
<br />

## Introduction

Today, we spend countless hours on the Internet, extracting vast amounts of information from the various platforms we access. But just as each and every one of us obtains information from these platforms, they obtain information from each and every one of us. And increasingly, the price we have to pay for being connected and having access to this amount of information is our own privacy. But as Gary Kovacs mentioned in his [2012 TED talk](https://www.ted.com/talks/gary_kovacs_tracking_our_online_trackers):

<br/>

<p align="center">
    Privacy is not an option, and it <br/>
    shouldn't be the price we accept for <br/>
    just getting on the Internet.
</p>

<br/>
    
So as to attain the level of privacy and confidentiality that we all must have when accessing information through database queries, the [_incognito dB_]() platform employs homomorphic encryption for [private information retrieval](https://en.wikipedia.org/wiki/Private_information_retrieval). This approach ensures that no entity, including the server itself, possesses any awareness of the specific information we've both requested and received.

Just because data is **now** cryptographically protected even throughout the process.

<br/>

<img src="res/imgs/PIR.png"></a>

<br />
<br />

## Table of Contents

1. [Platform Description](#platform-description)
   * [Features and Benefits](#features-and-benefits)
   * [Limitations](#limitations)
2. [Live Demo](#live-demo)
3. [Run in Local Device](#run-in-local-device)
   * [Requirements](#requirements)
   * [Quick Start](#quick-start)
4. [Learn More](#learn-more)
5. [FAQs](#faqs)
6. [Credits](#credits)
   * [External Contributions](#external-contributions)
   * [Acknowledgments](#acknowledgments)
7. [Related Projects](#related-projects)
8. [Contact](#contact)
9. [License](#license)

<br />
<br />

## Platform Description

<br />

### Features and Benefits

<br />

### Limitations

<br />
<br />

## Live Demo

You can quickly experience the _indognito dB_ platform by visiting its own [website](). There you will be able to access articles while safeguarding the most important information — information about you. With a minimalist yet precise design, _incognito dB_ aims to ensure a user-friendly experience, prioritizing both privacy and usability.

Check out some snapshots and videos of the platform.

<br />

<img src="res/gifs/search_example.gif" width="100%"/>

<br />

<img src="res/imgs/homepage_hero_and_introduction.png" width="100%"/>

<br />
<br />

## Run in Local Device

<br />

### Requirements

<br />

### Quick Start

1. Commence by cloning the repository to your local device:
```
git clone <repository_url>
```

2. Proceed to the `components/client` directory and invoke the subsequent command to compile the WebAssembly code:
```
wasm-pack build --target web --out-dir ../../site/pkg
```

3. Within the `server/database` repository, employ the provided Python "build" script to establish the fundamental database components.

4. Transition to the `components/spiral-rs` directory. Issue the ensuing command to preprocess the database:
```
cargo run --bin preprocess_db -- ../../server/database/db/db.txt ../../server/database/db/preprocessed_db.txt
```

5. Conclude by activating the local server. Navigate to the `server/actix-server/src` directory and implement the following command:

```
cargo run build -- ../../server/database/db/preprocessed_db.txt 8080
```

Now you are runing it in your own device in localhost port 8080.

<br />
<br />

## Learn More

<br />
<br />

## FAQs

<br />
<br />

## Credits

**Project Author:** [Roger Rovira]().

Emerging from the final stages of my high school education in Barcelona, Catalonia, this project has taken shape as the _Treball de Recerca_ that Catalan students are required to present during the last year of their studies.

<br />

### External Contributions

The development of [_incognito dB_]() was enriched by the valuable contribution of the open-source library Spiral and the SpiralWiki project.

* **Spiral**: [company webpage](https://blyss.dev/).
* **SpiralWiki**: [project web](https://spiralwiki.com/).

It was thanks to these tools that I was able to successfully implement homomorphic encryption to achieve private information retrieval.

<br />

### Acknowledgments

While expressing my thanks to the contributors of Spiral and SpiralWiki, I would also like to extend my appreciation to my mentors and professors. 

Their insightful guidance assisted me throughout the development phase, helping to establish the foundations of the project, the main ideas. Allowing me to materialize, with my own hands, the underlying structure of [_incognito dB_]() through programming.

Thanks 😁.

<br />
<br />

## Related Projects

<br />
<br />

## Contact

Feel free to reach out if you have any questions, suggestions, or feedback regarding this project. You can contact me via email or connect with me on social media as well.

- **Email**: [rogerrovi2006@gmail.com](mailto:rogerrovi2006@gmail.com)
- **Twitter**: [@rovi_roger](https://twitter.com/rovi_roger)

<br />
<br />

## License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.
