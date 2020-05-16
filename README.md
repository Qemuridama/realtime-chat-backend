# exemplo docker + typescript + express

## Iniciar servidor

- npm ``npm run dev:server``
- yarn: ``yarn dev:server``
- docker: ``docker-compose up``

> Com npm e yarn o acesso é em `localhost:3333`, usando o docker é em `http://192.168.99.100:3333`

## Uso da api

O uso do backend consiste em:
- se conectar
- emitir evento `new_message` para enviar uma nova mensagem
- escutar evento `new_message` para receber uma nova mensagem

```js
//const api = 'http://192.168.99.100:3333/' // docker-compose
const api = 'http://localhost:3333/' // npm/yarn

// conexão
let socket = io(api)

// emissão da mensagem
let message = {
    author: author,
    content: content
}        
socket.emit('new_message', message)

// listener do evento `new_message`
socket.on('new_message', function(message){
    /* ... */
});
```
> Veja o exemplo de implementação em `/frontend`