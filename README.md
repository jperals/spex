# ProFi MVP

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
