const os = require('os');

const calculateLoads = (cpu) => {
    const total = cpu.times.user + cpu.times.idle + cpu.times.sys + cpu.times.irq;
    const idle = cpu.times.idle;
    const load = total - idle;

    return {total, idle, load};
};

const subscribe = (interval, callback) => {
    let previousLoads = os.cpus().map(cpu => calculateLoads(cpu));

    return setInterval(() => {
        const cpuDataList = os.cpus();

        const coreData = cpuDataList.map((cpu, i) => {
            const loads = calculateLoads(cpu);

            const diffTotal = loads.total - previousLoads[parseInt(i)].total;
            const diffLoad = loads.load - previousLoads[parseInt(i)].load;

            const loadPercent = (diffLoad / diffTotal * 100).toFixed(1);

            previousLoads[parseInt(i)] = loads;

            return {
                cpu: i,
                model: cpu.model,
                loadPercent: loadPercent
            };
        });

        const coreCount = coreData.length;
        const avgLoadPercent = coreData.reduce((accumulator, data) => accumulator + parseFloat(data.loadPercent), 0) / coreCount;

        callback({avgLoadPercent: avgLoadPercent.toFixed(1), coreData});
    }, interval);
};

const avgLoads = (sampleTime) => {
    return new Promise((resolve) => {
        const timer = subscribe(sampleTime, data => {
            clearInterval(timer);
            resolve(data);
        });
    });
};

const coreCount = () => {
    return os.cpus().length;
};

exports.subscribe = subscribe;
exports.avgLoads = avgLoads;
exports.coreCount = coreCount;