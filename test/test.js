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

                for (const item of data.coreData) {
                    assert.ok(item.cpu >= 0);
                    assert.ok(item.model);
                    assert.ok(item.loadPercent >= 0);
                }

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
                
                for (const item of data.coreData) {
                    assert.ok(item.cpu >= 0);
                    assert.ok(item.model);
                    assert.ok(item.loadPercent >= 0);
                }

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

describe('System', () => {
    describe('info', () => {
        it('returns system info', (done) => {
            lizardMonitor.system.info().then((data) => {
                assert.ok(data.arch);
                assert.ok(data.hostname);
                assert.ok(data.platform);
                assert.ok(data.release);
                assert.ok(data.uptime > 0);
                done();
            });
        });
    });

    describe('subscribe', () => {
        it('returns system info', (done) => {
            const timer = lizardMonitor.system.subscribe(100, (data) => {
                assert.ok(data.arch);
                assert.ok(data.hostname);
                assert.ok(data.platform);
                assert.ok(data.release);
                assert.ok(data.uptime > 0);
                
                clearInterval(timer);
                done();
            });
        });
    });
});

describe('Network', () => {
    describe('interfaces', () => {
        it('returns network info', (done) => {
            const internal = true;
            const family = 'IPv4';

            lizardMonitor.network.interfaces(internal, family).then((data) => {
                for (const interface of data) {
                    assert.ok(interface.name);
                    assert.ok(interface.mac);

                    for (const address of interface.addresses) {
                        assert.ok(address.address);
                        assert.ok(address.netmask);
                        assert.strictEqual(address.family, family);
                    }
                }
                done();
            });
        });

        it('returns only IPv4 addresses', (done) => {
            const internal = false;
            const family = 'IPv4';

            lizardMonitor.network.interfaces(internal, family).then((data) => {
                for (const interface of data) {
                    for (const address of interface.addresses) {
                        assert.ok(address.family === 'IPv4');
                    }
                }
                done();
            });
        });

        it('returns only IPv6 addresses', (done) => {
            const internal = false;
            const family = 'IPv6';

            lizardMonitor.network.interfaces(internal, family).then((data) => {
                for (const interface of data) {
                    for (const address of interface.addresses) {
                        assert.ok(address.family === 'IPv6');
                    }
                }
                done();
            });
        });

        it('returns all address families', (done) => {
            const internal = false;
            const family = 'All';

            lizardMonitor.network.interfaces(internal, family).then((data) => {
                for (const interface of data) {
                    for (const address of interface.addresses) {
                        assert.ok(address.family === 'IPv4' || address.family === 'IPv6');
                    }
                }
                done();
            });
        });
    });

    describe('subscribe', () => {
        it('returns network info', (done) => {
            const internal = true;
            const family = 'IPv4';

            const timer = lizardMonitor.network.subscribe(100, (data) => {
                for (const interface of data) {
                    assert.ok(interface.name);
                    assert.ok(interface.mac);

                    for (const address of interface.addresses) {
                        assert.ok(address.address);
                        assert.ok(address.netmask);
                        assert.strictEqual(address.family, family);
                    }
                }
                
                clearInterval(timer);
                done();
            }, {internal, family});
        });

        it('returns network info without optional parameter', (done) => {
            const timer = lizardMonitor.network.subscribe(100, (data) => {
                for (const interface of data) {
                    assert.ok(interface.name);
                    assert.ok(interface.mac);

                    for (const address of interface.addresses) {
                        assert.ok(address.address);
                        assert.ok(address.netmask);
                        assert.ok(address.family === 'IPv4');
                    }
                }
                
                clearInterval(timer);
                done();
            });
        });
    });
});