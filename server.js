const express = require('express')
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
const app = express()
const http = require('http')
const { connect } = require('http2')
const server = http.createServer(app)
const socketio = require('socket.io')
const seaBattle = require('./sea-battle')
const io = socketio(server)
const port = 8000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    sess = req.session;
    if (sess.username && sess.password) {
        sess = req.session;
        if (sess.username) {
            res.sendFile(`<h1>Welcome ${sess.username} </h1><br>`)
           // res.write(
           //     `<h3>This is the Home page</h3>`
           // );
           // res.end('<a href=' + '/logout' + '>Click here to log out</a >')
        }
    } else {
        res.sendFile(__dirname + "/login.html")
    }
});

app.post("/login", (req, res) => {
    sess = req.session;
    sess.username = req.body.username
    sess.password = req.body.password
    // add username and password validation logic here if you want. If user is authenticated send the response as success
    res.end("success")
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/")
    });
});

const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 // session max age in miliseconds
    }
}))

io.on('connection', (socket) => {
    socket.on('chatMessage', msg => {           
        console.log(socket.id + ': ' + msg)
        io.emit('chatMessage', {'userid': socket.id, 'message': msg})
    })

    io.emit('initGameBoard', {'humanGameBoard': seaBattle.gameBoard.human})
    //console.log('user connected ' + socket.id)
    //socket.on('disconnect', () => {
    //    console.log('user ' + socket.id + ' disconnected');
    //});
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use('/', express.static('./public/'))
