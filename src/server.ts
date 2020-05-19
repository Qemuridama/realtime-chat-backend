import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

// cors
io.origins('*:*');

const messages: MessageInterface[] = [];
const authors: AuthorInterface[] = [];

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

app.put('/authors/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body
  
  const index = authors.findIndex(author => author.id === id)
  authors[index].name = name
  res.status(200)
});

enum EventMessage {
  NEW_MESSAGE = 'new_message',
  INIT_MESSAGES = 'initial_messages',
}

interface AuthorInterface {
  id: string
  name: string
}

interface MessageInterface {
  author: AuthorInterface
  date: Date
  content: string
}

io.on('connection', (socket) => {
  const authorName = socket.handshake.query.author
  authors.push({
    id: socket.id,
    name: authorName,
  });

  console.log(`a user (${authorName}) connected`);

  io.emit(EventMessage.INIT_MESSAGES, messages);

  socket.on(EventMessage.NEW_MESSAGE, (message: MessageInterface) => {
    message.date = new Date()
    const index = authors.findIndex(author => author.id === socket.id)
    message.author = authors[index]

    console.log(
      `${message.author.name} says: ${message.content} at ${message.date}`
    );
    messages.push(message);
    io.emit(EventMessage.NEW_MESSAGE, message);
  });
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});
