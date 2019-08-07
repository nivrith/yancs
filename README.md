# yancs

[![CircleCI](https://circleci.com/gh/nivrith/yancs/tree/master.svg?style=svg)](https://circleci.com/gh/nivrith/yancs/tree/master)
[![NPM Downloads](https://img.shields.io/npm/dw/yancs.svg)](https://www.npmjs.com/package/yancs)
[![node](https://img.shields.io/node/v/yancs.svg)](https://www.npmjs.com/package/yancs)
[![License MIT](https://img.shields.io/github/license/nivrith/yancs.svg)](https://github.com/nivrith/yancs/blob/master/LICENSE)

Elegant Async generator flow control

## Highlights

- Written in Typescript

## Installation

npm:

```shell
$ npm install yancs
```

yarn:

```shell
$ yarn add yancs
```

## Usage

> Elegant Async generator flow control

```js

  const { yancs } = require('yancs');

  // yield promises in async/await fashion
  yancs(function *() {
    let response = yield fetch(`https://api.github.com/users/nivrith`);
    let data = yield response.json();
    console.log(data)
  });

  // Flow control with thunks

   yancs(function *() {
    let response = yield fetch(`https://api.github.com/users/nivrith`);
    let data = yield () => response.json();
    console.log(data)
  });

  // yield arrays
  yancs(function *() {
    console.log(yield [1,2,3].map(x=>x*2)) //[2,4,6]
  });


```

## License

MIT © [Nivrith](https://github.com/nivrith)
