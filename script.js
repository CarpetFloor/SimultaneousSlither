const socket = io();
let myid = null;

socket.on("connected", (id) => {
    myid = id;
});