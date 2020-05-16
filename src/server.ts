import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = socket(server);

// cors
io.origins("*:*")

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

enum EventMessage {
  NEW_MESSAGE = "new_message"
}

interface MessageInterface {
  author: string
  date: Date
  content: string
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on(EventMessage['NEW_MESSAGE'], (message: MessageInterface) => {
    message.date = new Date()
    console.log(`${message.author} says: ${message.content} at ${message.date}`);
    io.emit(EventMessage['NEW_MESSAGE'], message);
  });
});

server.listen(3333, () => {
  console.log('listening on *:3333');
});


/*
import express from 'express'
import server from 'http'
import socket from 'socket.io'
import cors from 'cors';

const app = express()

app.use(cors({origin: '*'}));

const io = socket(server.createServer(app))

app.get('/', (request, response) => {
    return response.json({ message: 'Hello world' })
})

interface MessageInterface {
    author: string
    date: Date
    text: string
}

let messages: MessageInterface[];

io.on('connection', socket => {
    console.log('Socket ID: ' + socket.id)

    io.on('sendMessage', (message: MessageInterface) => {
        messages.push(message);
        socket.broadcast.emit('receivedMessage', message);
    });
})

app.listen(3333, () => console.log('Server started on port 3333'))
*/