const lizardMonitor = require('../');
const assert = require('assert');

describe('CPU', () => {
    describe('coreCount', () => {
        it('returns core count', (done) => {
            const coreCount = lizardMonitor.cpu.coreCount();
            assert.ok(coreCount > 0);
            done();
        });
    });
    
    describe('avgLoads', () => {
        it('returns average load and core data', (done) => {
            lizardMonitor.cpu.avgLoads(100).then((data) => {
                assert.ok(data.avgLoadPercent);
                assert.ok(data.coreData);
                assert.ok(data.coreData.length > 0);
                done();
            });
        });
    });
    
    describe('subscribe', () => {
        it('returns average load and core data', (done) => {
            const timer = lizardMonitor.cpu.subscribe(100, (data) => {
                assert.ok(data.avgLoadPercent);
                assert.ok(data.coreData);
                assert.ok(data.coreData.length > 0);
                
                clearInterval(timer);
                done();
            });
        });
    });
});

describe('Memory', () => {
    describe('info', () => {
        it('returns memory info', (done) => {
            const data = lizardMonitor.memory.info();
            
            assert.ok(data.totalMiB >= 0);
            assert.ok(data.freeMiB >= 0);
            assert.ok(data.usedMiB >= 0);
            assert.ok(data.usedPercent >= 0);
            done();
        });
    });
    
    describe('subscribe', () => {
        it('returns memory info', (done) => {
            const timer = lizardMonitor.memory.subscribe(100, (data) => {
                assert.ok(data.totalMiB >= 0);
                assert.ok(data.freeMiB >= 0);
                assert.ok(data.usedMiB >= 0);
                assert.ok(data.usedPercent >= 0);
                
                clearInterval(timer);
                done();
            });
        });
    });
});