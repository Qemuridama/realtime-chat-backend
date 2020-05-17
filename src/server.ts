import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

// cors
io.origins('*:*');

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

enum EventMessage {
  NEW_MESSAGE = 'new_message',
  INIT_MESSAGES = 'initial_messages',
}

interface MessageInterface {
  author: string;
  date: Date;
  content: string;
}

const messages: MessageInterface[] = [];

io.on('connection', (socket: any) => {
  console.log('a user connected');

  io.emit(EventMessage['INIT_MESSAGES'], messages);

  socket.on(EventMessage['NEW_MESSAGE'], (message: MessageInterface) => {
    message.date = new Date();
    console.log(
      `${message.author} says: ${message.content} at ${message.date}`
    );
    messages.push(message);
    io.emit(EventMessage['NEW_MESSAGE'], message);
  });
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});
