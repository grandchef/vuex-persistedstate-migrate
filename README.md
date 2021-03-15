[![TypeScript version][ts-badge]][typescript-42]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][LICENSE]

# ESC/POS Printer Library

Library to migrate vuex state using [vuex-persistedstate][vuex-persistedstate].

## Install

Run command bellow on your project folder

```sh
yarn add vuex-persistedstate-migrate
```
or
```sh
npm install vuex-persistedstate-migrate
```

## Example
```js
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMigrate from 'vuex-persistedstate-migrate'

const migrations = [
  {
    version: 1,
    up: state => {
      return {
        ...state,
        myModule: {
          ...state.myModule,
          myProperty: 'migrated value',
        }
      }
    }
  }
]

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    getState: createMigrate(migrations, 'migration.version'),
  })],
  modules
})

export default store
```

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `style:fix` - fix prettier style problems,
+ `style:check` - check for prettier style,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `test:debug` - run tests debugging

## License
Licensed under the MIT. See the [LICENSE](https://github.com/grandchef/vuex-persistedstate-migrate/blob/master/LICENSE) file for details.

[vuex-persistedstate]: https://github.com/robinvdvleuten/vuex-persistedstate#readme
[ts-badge]: https://img.shields.io/badge/TypeScript-4.2-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2010-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v10.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-42]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/grandchef/vuex-persistedstate-migrate/blob/master/LICENSE