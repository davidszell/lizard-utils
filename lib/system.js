const os = require('os');

const arch = process.arch;
const hostname = os.hostname();
const platform = process.platform;
const release = os.release();

const info = () => {
    return new Promise((resolve) => {
        resolve({
            arch,
            hostname,
            platform,
            release,
            uptime: os.uptime
        });
    });
};

const subscribe = (interval) => {
    return setInterval(info, interval);
};

exports.info = info;
exports.subscribe = subscribe;