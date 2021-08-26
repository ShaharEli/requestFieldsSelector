[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/ShaharEli/requestFieldsSelector">
    <img src="https://github.com/ShaharEli/requestFieldsSelector/blob/master/images/logo.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Request fields selector</h3>

  <p align="center">
    Determine the data you want to get from your client just like GraphQL with easy to plug middleware!
    <br />
    <br />
    <a href="https://github.com/ShaharEli/requestFieldsSelector/blob/master/__tests__/middleware.test.ts">View Examples</a>
    ·
    <a href="https://github.com/ShaharEli/requestFieldsSelector/issues">Report Bug</a>
    ·
    <a href="https://github.com/ShaharEli/requestFieldsSelector/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
      <li>
      <a href="#motivation">Motivation</a>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

The requestFieldsSelectorMiddleware provide an easy way to pick the fields of the response you send from the api in your client! just like GraphQl and even with the same syntax. The middleware improve your api by reducing over-fetching and less data transportation. Designed to use in any express api.

## Motivation

I was getting sick of making many if else statements to reduce the data transportation from my api to my client and GraphQl doesn't always fit in the project type so I wanted to make an easy way to improve all my servers with the advantages of GraphQl.

### Installation

```sh
npm install request-fields-selector
```

## Usage

_For more examples, please refer to the [Project`s tests](https://github.com/ShaharEli/requestFieldsSelector/blob/master/__tests__/middleware.test.ts) and [Example server](https://github.com/ShaharEli/requestFieldsSelector/blob/master/example)_

- First add the request-fields-selector middleware to your server above all the crud routes:

```js
import requestFieldsSelectorMiddleware from 'request-fields-selector'

const app = express()

app.use(express.json())
app.use(requestFieldsSelectorMiddleware)
// You can add config object
 app.use((...args) => requestFieldsSelectorMiddleware(...args,
 {
    silent: true //no error logs
  dataNestedField: "data" // e.g your response look like this {data:"your data",status:"ok",...} the value that will be transformed will be data
  fieldSelectorName: "customFieldsName" // the default fields will be taken from your req.query or req.body and called "fields"
   }
 ))
```

- Then in your client:

```js
const API_URL = "http://happy";
const data = await fetch(`${API_URL}?fields=
{
  book {
    author
  }
}`);

//or as one liner
const data = await fetch(`${API_URL}?fields={book{author}}`);
//in the post method:
const fields = `
{
 book{
   id
   author{
     firstName
   }
 }
`;
const data = await fetch({
  method: "POST",
  body: JSON.stringify({ ...body, fields }),
});
```

- Then in your api routes:

```js
app.get("/", (req: Request, res: Response) => {
  const { transform } = req; // the middleware will provide transform function that will match the client fields to the data you about to send - if error happen it will send the whole data
  res.json(transform(data));
});
```

## Roadmap

See the [open issues](https://github.com/ShaharEli/requestFieldsSelector/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Follow the commits and linting guides (conventional commits and eslint)
6. Open a Pull Request
7. Make sure that the pull request passed all the workflows

## License

Distributed under the MIT License. See [LICENSE](https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt) for more information.

<!-- CONTACT -->

## Contact

Shahar Eliyahu - [mail](shahar.e3@gmail.com)

Project Link: [https://github.com/ShaharEli/requestFieldsSelector](https://github.com/ShaharEli/requestFieldsSelector)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)

[contributors-shield]: https://img.shields.io/github/contributors/ShaharEli/requestFieldsSelector.svg?style=for-the-badge
[contributors-url]: https://github.com/ShaharEli/requestFieldsSelector/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ShaharEli/requestFieldsSelector.svg?style=for-the-badge
[forks-url]: https://github.com/ShaharEli/requestFieldsSelector/network/members
[stars-shield]: https://img.shields.io/github/stars/ShaharEli/requestFieldsSelector.svg?style=for-the-badge
[stars-url]: https://github.com/ShaharEli/requestFieldsSelector/stargazers
[issues-shield]: https://img.shields.io/github/issues/ShaharEli/requestFieldsSelector.svg?style=for-the-badge
[issues-url]: https://github.com/ShaharEli/requestFieldsSelector/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
