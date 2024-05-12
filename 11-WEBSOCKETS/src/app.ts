import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {

                if (client == ws) {
                    client.send(`You: ${data}`, { binary: false });
                    return;
                }

                client.send(`User: ${data}`, { binary: false });
            }
        });
    });


    ws.send('Servidor: Bienvenido al chat');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


console.log('Server running on ws://localhost:3000');