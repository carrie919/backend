const net = require('net');
const server = net.createServer(function (socket) {
    let data = now();
    socket.write(data);
    socket.end("\n");
});

function zeroFill(i) {
    return (i < 10 ? '0' : '') + i
}


function now() {
    var d = new Date()
    return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
}


server.listen(process.argv[2]);