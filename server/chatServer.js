const express = require("express");

const SocketServer = require('socket.io').Server;
const http = require('http');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express()
//Creamos el servidor con el módulo http de node
const server = http.createServer(app)
//Utilizamos como servidor el proporcionado por socket.io. Configuramos cors indicando que cualquier servidor se puede conectar
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())

//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
//Este analizador acepta solo la codificación UTF-8 contenida en el body
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json());

//Escuchamos la conexión de los clientes. Podemos imprimir el id del cliente conectado
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    
    socket.on('disconnect', () =>
    console.log(`Disconnected: ${socket.id}`));
    
    socket.on('first_conn', (user_data) => {
        console.log(socket.id)
        console.log(user_data)
        socket.broadcast.emit('first_conn', user_data)
    });

    socket.on('join', (room) => {
        console.log(`$Socket ${socket.id} joining --${room}--`);
        socket.join(room);
        console.log("rooms", socket.rooms)
     });

     socket.on('display', (state) => {
        console.log(state);
        socket.to(state.room).emit('display', state.state);
    })


    socket.on('guestReply', (reply) => {
        console.log(reply)
        socket.to(reply.room).emit('guestReply', reply);
    })

    socket.on('answers', (answer) => {
        console.log(answer)
        socket.to(answer.room).emit('answers', answer.answers);
        //socket.broadcast.emit('answers', answer)
    })

  
})

server.listen(process.env.PORT2, () => console.log(`Game server in ports ${process.env.PORT2}`));
