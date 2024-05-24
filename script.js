const socket = io();

let createButton = document.querySelector("#createGame");

createButton.addEventListener("click", function() {
    socket.emit("create game");
    loadGame();
});

let container = document.querySelector(".game");
let message = document.querySelector(".gameMessage");

// px
const tilesWide = 5;
// px
const tileSize = 50;
// em
const tileSpacing = 0.5;
container.style.marginLeft = tileSpacing + "em";

function loadGame() {
    for(let row = 0; row < tilesWide; row++) {
        let currentRow = document.createElement("div");
        currentRow.className = "row";

        for(let col = 0; col < tilesWide; col++) {
            let tile = document.createElement("div");
            tile.style.width = tileSize + "px";
            tile.style.height = tileSize + "px";
            tile.style.marginRight = tileSpacing + "em";
            tile.style.marginBottom = tileSpacing + "em";
            tile.style.backgroundColor = "rgb(200, 200, 200)";

            currentRow.appendChild(tile);
        }

        container.appendChild(currentRow);
    }
    
    document.querySelector(".landing").style.marginTop = "-100vh";
    
    window.setTimeout(function() {
        document.querySelector(".landing").style.display = "none";
        document.querySelector(".game").style.opacity = "1";
        document.querySelector(".game").style.scale = "1";

        window.setTimeout(function() {
            message.style.marginLeft = (0 - (tileSpacing * 0.25)) + "em";
            waitingInterval = window.setInterval(updateWaitMessage, 750);
        }, 200);
    }, 200);
}

let waitingInterval = null;
let dots = 0;

function updateWaitMessage() {
    ++dots;
    if(dots == 4) {
        dots = 0;
    }

    message.innerHTML = "Waiting for someone else to join" + (".").repeat(dots);

    if(dots > 0) {
        message.style.transition = "none";
        message.style.marginTop = "2em";
    }
}