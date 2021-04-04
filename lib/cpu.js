const os = require('os');

let loads = [];

const init = (interval, callback) => {
    let cpuDataList = os.cpus();

    cpuDataList.map((cpuData) => {
        const total = cpuData.times.user + cpuData.times.idle + cpuData.times.sys + cpuData.times.irq;
        const load = total - cpuData.times.idle;
        loads.push({total, load})
    });

    setInterval(() => {
        cpuDataList = os.cpus();
        let coreData = [];
        let totalLoadPercent = 0;

        cpuDataList.map((cpu, i) => {
            const total = cpu.times.user + cpu.times.idle + cpu.times.sys + cpu.times.irq;
            const load = total - cpu.times.idle;

            const diffTotal = total - loads[parseInt(i)].total;
            const diffLoad = load - loads[parseInt(i)].load;

            const loadPercent = (diffLoad / diffTotal * 100);
            totalLoadPercent += loadPercent;

            loads[parseInt(i)] = {total, load};

            coreData.push({cpu: i, model: cpu.model, loadPercent: loadPercent.toFixed(1)});
        });

        const avgLoad = (coreData.length > 0 ? totalLoadPercent / coreData.length : 0).toFixed(1); 

        callback({avgLoad, coreData});
    }, interval);
}

exports.init = init;