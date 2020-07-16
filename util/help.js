export function getIP(req) {
    var ipAddress = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.headers["X-Client-IP"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.info.remoteAddress
    if (ipAddress.substr(0, 7) === "::ffff:") {
        ipAddress = ipAddress.substr(7)
    }
    return ipAddress;
}


export function getClientIp() {
    var
        // Local ip address that we're trying to calculate
        address
        // Provides a few basic operating-system related utility functions (built-in)
        , os = require('os')
        // Network interfaces
        , ifaces = os.networkInterfaces();


    // Iterate over interfaces ...
    for (var dev in ifaces) {

        // ... and find the one that matches the criteria
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });

        if (iface.length > 0) address = iface[0].address;
    }
    return address
}

export async function findAndMoveElementToLastArray(elementData, arrayData) {
    let posMangaId = arrayData.indexOf(elementData);
    arrayData.splice(posMangaId, 1);
    arrayData.push(elementData);
    return arrayData;
}