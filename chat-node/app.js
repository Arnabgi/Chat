const express = require('express');
const route = require('./router');
const cors= require('cors');
const { Socket } = require('socket.io');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
    app.use('/chat',route);
    
    const server = app.listen(port,() => {
        console.log(`Server is running port ${port}`);
    });

    const io = require('socket.io')(server,{
        cors: {origin: '*'}
    });

    io.on('connection', (socket)=> {
    console.log("Connected with a socket");
    socket.on('join',(data) => {
        //console.log("join........",data);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user connected');
    })

    socket.on('message',(data) => {
        //console.log("data........",data);
        io.in(data.room).emit('new message', {message:data.message})
    })
    // io.emit("server","message is coming from server......");
    // socket.on('client',(data) => {
    //     console.log(data);
    // })
})