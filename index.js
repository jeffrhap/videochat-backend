const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
const { v4: uuidV4 } = require('uuid')
const PORT = process.env.PORT || 5000;

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-dicconected', userId)
    })
  })
})

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))