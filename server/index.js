const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const routes = require('./src/routes/Routes');

const httpServer = require('http').createServer(app);
const { Server } = require("socket.io");

const mongoose = require('mongoose');
const notifyController = require("./src/controllers/notifyController");
const tradeResultController = require("./src/controllers/tradeResultController");

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
        if(users.some(user => user.id === id)) {
            removeUser(id);
        }
        addNewUser(id, socket.id);
    });

    socket.on('sendNotification', ({ senderId, receiverId, senderName, receiverProductName, senderProductId, receiverProductId }) => {
        const receiver = getUser(receiverId);
        if(receiver !== undefined){
            io.to(receiver.socketId).emit('getNotification', {
                senderId,
                receiverId,
                senderName,
                receiverProductName,
                senderProductId,
                receiverProductId
            });
        }
        notifyController.addNewNotify(senderId, receiverId, senderName, receiverProductName, senderProductId, receiverProductId);
    });

    socket.on('resOffer', ({ receiverId, result, productName,senderEmail }) => {
        const receiver = getUser(receiverId);
        if(receiver !== undefined){
            io.to(receiver.socketId).emit('response', {
                result,
                productName,
                senderEmail
            });
        }
        else{
            tradeResultController.addNewResultNotification(receiverId, productName, senderEmail, result);
        }

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





