# Spex MVP

This project uses [Vue.js](https://vuejs.org) with [Vuex](https://vuex.vuejs.org) for state management and [Vue Styleguidist](https://vue-styleguidist.github.io/) to generate a living style guide.

## Development setup

Set up a Firebase project in your local environment, e.g by copying `.env.example` as `.env.local` and filling in the data accordingly.

Install the dependencies:

```sh
yarn
```

Initialize a development server:

```sh
yarn serve
```

Start the living styleguide:

```sh
yarn styleguide
```

## State management

Firebase is our source of truth for data.
Please follow this data flow:

> Views and components -> Dispatch actions -> Call Firebase -> Commit mutations -> Let views and components update

## Production build

```sh
yarn build
```

## License

This source code is provided under the MIT License. See [LICENSE](LICENSE).

["Cloud Off" icon](src/assets/icons/cloud-off.svg) made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>.
