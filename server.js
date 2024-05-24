const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 8081;

// add static file(s)
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

function Game(id) {
    this.active = false;
    this.id = id;
    this.players = []
}

let games = [];

// handle users
io.on("connection", (socket) => {
    io.to(socket.id).emit("connected", socket.id);

    socket.on("disconnect", () => {
        let a = 5;
    });
});

// start server
server.listen(port, () => {
  console.log("server started on port", port);
});