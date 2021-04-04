const os = require('os');

const init = (interval, callback) => {
    setInterval(() => {
        const totalMiB = os.totalmem / 1024 / 1024;
        const freeMiB = os.freemem / 1024 / 1024;
        const usedMiB = totalMiB - freeMiB;
        const usedPercent = usedMiB * 100 / totalMiB;

        callback({
            totalMiB: totalMiB.toFixed(0),
            freeMiB: freeMiB.toFixed(0),
            usedMiB: usedMiB.toFixed(0),
            usedPercent: usedPercent.toFixed(1)
        });
    }, interval);
}

exports.init = init;