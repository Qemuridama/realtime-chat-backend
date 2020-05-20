# realtime-chat-backend

## Iniciar servidor

- npm ``npm run dev:server``
- yarn: ``yarn dev:server``
- docker: ``docker-compose up``

> Com npm e yarn o acesso é em `localhost:3333`, usando o docker é em `http://192.168.99.100:3333`

## API Reference

> Veja o exemplo de implementação em `/frontend`

### Socket events

Para ter acesso aos eventos é necessário se conectar ao backend

```js
//const api = 'http://192.168.99.100:3333/' // docker-compose
const api = 'http://localhost:3333/' // npm/yarn

let socket = io(api, { query:`author=${authorName}` })
// const id = socket.id // id do usuário
```

---

|Event           |
|:---------------|
|initial_messages|

Escutar evento de mensagens iniciais
```js
socket.on('initial_messages', function(messages){
    /* ... */
});

/* messages: Message[]

interface Message {
  author: {
    id: string,
    name: string
  },
  date: Date,
  content: string
}
*/
```

---
|Event      |
|:----------|
|new_message|

Emitir evento nova mensagem
```js
let message = {
    content: content
}
socket.emit('new_message', message)

/* message: Message

interface Message {
  content: string
}
*/
```

Escutar evento de nova mensagem
```js
socket.on('new_message', function(message){
    /* ... */
});

/* message: Message

interface Message {
  author: {
    id: string,
    name: string
  },
  date: Date,
  content: string
}
*/
```

### HTTP routes

|Endpoint    |Method|
|:-----------|:-----|
|/authors/:id|PUT   |

Sample Request
```json
{
    "name": "Matutu"
}
```