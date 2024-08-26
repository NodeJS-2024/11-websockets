import { WebSocketServer } from 'ws';

const webSocketServer = new WebSocketServer({ port: 3000 });

webSocketServer.on('connection', function connection(ws) {

  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    // console.log('received: %s', data);
    console.log('Desde el cliente', data);

    const payload = {
      type: 'custom-message',
      payload: data.toString()
    }

    // ws.send(data.toString().toUpperCase());
    ws.send(JSON.stringify(payload));
  });

  //ws.send('Hola desde el servidor!');

  // setInterval(() => {
  //   ws.send('Hola de nuevo');
  // }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });

});

console.log('Server running on port http://localhost:3000');
