const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const routes = require('./src/routes/Routes');

const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");

const mongoose = require('mongoose');
const User = mongoose.model('User');

const PORT = process.env.PORT;

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

let users = [];
const addNewUser = (id, socketId) => {
    !users.some(user => user.id === id) && users.push({ id, socketId });
}

const removeUser = (id) => {
    users = users.filter(user => user.id !== id);
}

const removeUserSocket = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

io.on('connection', (socket) => {

    socket.on('newUser', (id) => {
        console.log('new user connected: ' + id)
        if(users.some(user => user.id === id)) {
            removeUser(id);
        }
        addNewUser(id, socket.id);
    });

    socket.on('sendNotification', ({ senderId, receiverId, senderName, productNameDest, idProductOffered, idProductRequested }) => {
        console.log('send notification: ' + senderId + ' ' + receiverId + ' ' + senderName + ' ' + productNameDest + ' ' + idProductOffered + ' ' + idProductRequested)
        const receiver = getUser(receiverId);
        if(receiver !== undefined){
            io.to(receiver.socketId).emit('getNotification', {
                senderId,
                receiverId,
                senderName,
                productNameDest,
                idProductOffered,
                idProductRequested
            });
        }
        //Todo: save notification in database
    });

    socket.on('disconnect', () => {
        removeUserSocket(socket.id);
        socket.disconnect();

    });
});

app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

routes(app);

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err.message);
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





