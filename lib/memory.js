/*eslint semi: ["error", "always"]*/

const os = require('os');

const subscribe = (interval, callback) => {
    return setInterval(() => {
        callback(info());
    }, interval);
};

const info = () => {
    const totalMiB = os.totalmem / 1024 / 1024;
    const freeMiB = os.freemem / 1024 / 1024;
    const usedMiB = totalMiB - freeMiB;
    const usedPercent = usedMiB * 100 / totalMiB;

    return {
        totalMiB: totalMiB.toFixed(0),
        freeMiB: freeMiB.toFixed(0),
        usedMiB: usedMiB.toFixed(0),
        usedPercent: usedPercent.toFixed(1)
    };
};

exports.subscribe = subscribe;
exports.info = info;