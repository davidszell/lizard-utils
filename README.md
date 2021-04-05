# Lizard Utils

[![Version](https://img.shields.io/github/package-json/v/davidszell/lizard-utils)](https://github.com/davidszell/lizard-monitor/releases/latest)
[![License](https://img.shields.io/github/license/davidszell/lizard-utils)](https://github.com/davidszell/lizard-monitor/blob/main/LICENSE)

Lightweight web dashboard to monitor system resources.

## Installation
```sh
npm install lizard-utils --save
```

## Example

```js
const lizardUtils = require('lizardUtils');

const coreCount = lizardUtils.cpu.coreCount(); // 12

lizardUtils.cpu.avgLoads(1000).then((data) => {
    console.log(data.avgLoadPercent); // 25.8
});

lizardUtils.cpu.subscribe(1000, (data) => {
    console.log(data.avgLoadPercent); // 25.8
});
```

## See also
  * [API documentation](docs/API.md)