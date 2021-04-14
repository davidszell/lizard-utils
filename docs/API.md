# Lizard Utils

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
});
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
});
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
});
```

### lizardUtils.memory.&#65279;info() ⇒ <code>Object</code>

_Get memory load data._

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

## lizardUtils.system

### lizardUtils.system.&#65279;info() ⇒ <code>Promise</code>

_Get general system information._

__Example__
```js
lizardUtils.system.info().then((data) => {
    console.log(JSON.stringify(data));
    /* 
    {
        arch: "x64",
        hostname: "linux-pc",
        platform: "linux",
        release: "2.6.35-22-generic",
        uptime: 651618
    }
    */
});
```

### lizardUtils.system.subscribe(interval, callback) ⇒ <code>Timeout</code>

_Get general system information periodically._

| Param | Type | Description |
| --- | --- | --- |
| interval | Number | Interval in milliseconds. |
| callback | Function | Function called with the system information. |

__Example__
```js
lizardUtils.system.subscribe(1000, (data) => {
    console.log(JSON.stringify(data));
    /* 
    {
        arch: "x64",
        hostname: "linux-pc",
        platform: "linux",
        release: "2.6.35-22-generic",
        uptime: 651618
    }
    */
});
```

## lizardUtils.network

### lizardUtils.network.&#65279;interfaces(internal, family) ⇒ <code>Promise</code>

_Get network interfaces._

| Param | Type | Description |
| --- | --- | --- |
| internal | Boolean | Return internal or external interfaces |
| family | String | Specify what address types to return. (<code>IPv4</code>, <code>IPv6</code> or <code>All</code>) |

__Example__
```js
lizardUtils.network.interfaces(true, 'IPv4').then((data) => {
    console.log(JSON.stringify(data));
    /* 
    [
        {
            name: "lo0",
            mac: "00:00:00:00:00:00",
            addresses: [
                {
                    address: "127.0.0.1",
                    family: "IPv4",
                    netmask: "255.0.0.0"
                }
            ]
        }
    ]
    */
});
```

### lizardUtils.network.&#65279;subscribe(internal, callback\[, options\]) ⇒ <code>Timeout</code>

_Get network interfaces periodically._

| Param | Type | Description |
| --- | --- | --- |
| interval | Number | Interval in milliseconds. |
| callback | Function | Function called with the system information. |

__Options__
| Param | Type | Description | Default |
| --- | --- | --- | --- |
| internal | Boolean | Return internal or external interfaces | false |
| family | String | Specify what address types to return. (<code>IPv4</code>, <code>IPv6</code> or <code>All</code>) | <code>All</code> |

__Example__
```js
lizardUtils.network.subscribe(1000, (data) => {
    console.log(JSON.stringify(data));
    /* 
    [
        {
            name: "lo0",
            mac: "00:00:00:00:00:00",
            addresses: [
                {
                    address: "127.0.0.1",
                    family: "IPv4",
                    netmask: "255.0.0.0"
                }
            ]
        }
    ]
    */
}, {internal: true, family: 'IPv4'});
```
