import { WebSocketServer, WebSocket } from 'ws';

const webSocketServer = new WebSocketServer({ port: 3000 });

webSocketServer.on('connection', function connection(ws) {

  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    // console.log('received: %s', data);
    // console.log('Desde el cliente', data);

    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString()
    });

    // ws.send(data.toString().toUpperCase());
    // ws.send(JSON.stringify(payload));

    //* Enviar a todos los clientes broadcast
    //* A todos - incluyente
    // webSocketServer.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //* A todos excluyente
    webSocketServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });

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
