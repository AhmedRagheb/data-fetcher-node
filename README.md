# Data Fetcher

RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

## Architecture and Technical notes

I followed the onion architecture in my application, splited the application to separate layers.

![onion](https://user-images.githubusercontent.com/12202990/149899861-8f00f456-9f7a-4b5d-86f7-4ad15b720393.jpeg)

- I used Inversify for dependancy injection.
- MongoDB for storing the data with a generice interface which can be extended to implement more data sources in the future (memory, redis ... etc).
- Jest for unit and integration tests.
- Logging central class for log, which can be easily replaced by another library.
- generice middleware to return diffirent type of http codes errors (500, 404, 400).

## Installation

To run this project you'll need:

- Node.js (version 10+)
- `npm` available on your path in your CLI

Install dependencies with NPM:

```bash
npm install
```

## NPM commands

You can run the following with `npm run ...`:

- `build`: builds the project using TypeScript, output will be in the `dist` folder;
- `start`: starts the server in development mode, automatically reloading when code changes;
- `test`: runs tests in watch mode using Jest;
- `format`: formats all code using [Prettier](https://github.com/prettier/prettier)

## Formatting

We use [Prettier](https://github.com/prettier/prettier) to format TypeScript source code. You can see the
settings in `.prettierc`.

Additionally, [EditorConfig](https://editorconfig.org/) is used to keep in sync indentation and some other minor editor settings.

## Tests

```bash
npm run test
```

## TODO

- User name and password shouldn't be in the code, they should be saved in secret manager or vault or ..
- Schema validation.
- Open api or Swagger.
- Logging should be saved somewhere else.
- .env file and config per environment.
