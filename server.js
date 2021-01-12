const express = require('express')
const app = express()
const http = require('http')
const { connect } = require('http2')
const server = http.createServer(app)
const socketio = require('socket.io')
const seaBattle = require('./sea-battle')
const io = socketio(server)
const port = 8000
const seabattle = require('./sea-battle')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', (socket) => {
    socket.on('chatMessage', msg => {
        console.log(socket.id + ': ' + msg)
        io.emit('chatMessage', {'userid': socket.id, 'message': msg})
    })

    io.emit('initGameBoard', {'humanGameBoard': seaBattle.human})
    //console.log('user connected ' + socket.id)
    //socket.on('disconnect', () => {
    //    console.log('user ' + socket.id + ' disconnected');
    //});
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use('/js', express.static('./public/js/'))
