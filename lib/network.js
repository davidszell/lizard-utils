const os = require('os');

const interfaces = (internal, family) => {

    return new Promise((resolve) => {
        const returnIPv4 = family === 'IPv4' || family === 'All';
        const returnIPv6 = family === 'IPv6' || family === 'All';

        let data = [];

        for (const [name, interfaceData] of Object.entries(os.networkInterfaces())) {
            let addresses = [];
            let mac;

            for (const address of interfaceData) {
                if (address.internal == internal) {
                    if ((address.family === 'IPv4' && returnIPv4) || 
                    (address.family === 'IPv6' && returnIPv6)) {
                        mac = address.mac;

                        addresses.push({
                            address: address.address,
                            family: address.family,
                            netmask: address.netmask
                        });
                    }
                }
            }

            if (addresses.length > 0 && mac) {
                data.push({
                    name,
                    mac,
                    addresses
                });
            }
        }

        resolve(data);
    });
};

exports.interfaces = interfaces;