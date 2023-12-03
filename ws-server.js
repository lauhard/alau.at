const express = require('express');

const server = require('http').createServer(express);

const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

//server resopnd on request of app
server.on('request', app);

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

/**Start websockets **/
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ server: server });

wss.on('connection', (ws) => {
    const numClients = wss.clients.size;
    console.log("Clients connected", numClients);

    wss.broadcast(`Current visitors: ${numClients}`);

    if(ws.readyState === ws.OPEN) open(ws);

    ws.on('close', () => {
        wss.broadcast(`Current visitors: ${numClients}`);
        console.log('A client disconnected');
    })

});

const open = (ws) =>  {
    ws.send("Welcome to my server.");
}

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        client.send(data);
    });
}