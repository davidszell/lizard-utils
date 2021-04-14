# Lizard Utils

[![Version](https://img.shields.io/github/package-json/v/davidszell/lizard-utils)](https://github.com/davidszell/lizard-utils/releases/latest)
[![License](https://img.shields.io/github/license/davidszell/lizard-utils)](https://github.com/davidszell/lizard-utils/blob/main/LICENSE)
[![Codacy Badge](https://img.shields.io/codacy/grade/299659df6a4c451a9160b02aa484d00f)](https://www.codacy.com/gh/davidszell/lizard-utils/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=davidszell/lizard-utils&amp;utm_campaign=Badge_Grade)
[![Codacy Coverage](https://img.shields.io/codacy/coverage/299659df6a4c451a9160b02aa484d00f)](https://www.codacy.com/gh/davidszell/lizard-utils/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=davidszell/lizard-utils&amp;utm_campaign=Badge_Grade)
[![Build Status](https://img.shields.io/travis/com/davidszell/lizard-utils)](https://travis-ci.com/github/davidszell/lizard-utils)

Utilities to monitor operating system related data.

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
*   [API documentation](docs/API.md)
