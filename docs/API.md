# Lizard Monitor

__Example__
```js
const lizardUtils = require('lizard-utils');
```

## lizardUtils.cpu

### lizardUtils.cpu.subscribe(interval, callback) ⇒ <code>Timeout</code>

_Get CPU load data periodically._

| Param | Type | Description |
| --- | --- | --- |
| interval | Number | Interval in milliseconds. |
| callback | Function | Function called with the CPU load data. |

__Example__
```js
lizardUtils.cpu.subscribe(1000, (data) => {
    console.log(JSON.stringify(data));
    /* 
    {
        avgLoadPercent: 25.8,
        coreData: [
            {
                cpu: 0,
                model: "[MODEL]",
                loadPercent: 25.8
            },
            {
                cpu: 1,
                model: "[MODEL]",
                loadPercent: 25.8
            },
        ]
    }
    */
})
```

### lizardUtils.cpu.avgLoads(sampleTime) ⇒ <code>Promise</code>

_Get average CPU load from data collected during sample time._

| Param | Type | Description |
| --- | --- | --- |
| sampleTime | Number | Sample time in milliseconds. |

__Example__
```js
lizardUtils.cpu.avgLoads(1000).then((data) => {
    console.log(JSON.stringify(data));
    /* 
    {
        avgLoadPercent: 25.8,
        coreData: [
            {
                cpu: 0,
                model: "[MODEL]",
                loadPercent: 25.8
            },
            {
                cpu: 1,
                model: "[MODEL]",
                loadPercent: 25.8
            },
        ]
    }
    */
})
```

### lizardUtils.cpu.coreCount() ⇒ <code>Number</code>

_Get number of logical CPU cores._

__Example__
```js
const coreCount = lizardUtils.cpu.coreCount(); // 2
```

## lizardUtils.memory

### lizardUtils.memory.subscribe(interval, callback) ⇒ <code>Timeout</code>

_Get memory load data periodically._

| Param | Type | Description |
| --- | --- | --- |
| interval | Number | Interval in milliseconds. |
| callback | Function | Function called with the memory load data. |

__Example__
```js
lizardUtils.memory.subscribe(1000, (data) => {
    console.log(JSON.stringify(data));
    /* 
    {
        totalMiB: 1024,
        freeMiB: 640,
        usedMiB: 384,
        usedPercent: 37.5
    }
    */
})
```

### lizardUtils.memory.&#65279;info() ⇒ <code>Object</code>

_Get memory load data periodically._

__Example__
```js
const memoryInfo = lizardUtils.memory.info();
/* 
{
    totalMiB: 1024,
    freeMiB: 640,
    usedMiB: 384,
    usedPercent: 37.5
}
*/
```
