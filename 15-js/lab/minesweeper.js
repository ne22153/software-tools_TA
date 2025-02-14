// creates a new game
function newGame(document){
    board.innerHTML = "";
    // unTouched holds all non-mine squares
    unTouched = []
    mines = []
    // playable will be true for as long as the game isn't over
    playable = true

    for (let i = 0; i < 60; i++){
        let rand = Math.random();
        if (rand <= 0.1){mines.push(i)}
        else {unTouched.push(i)}
        makeButton(document, i, board);
    }
}

// makes a button and adds it to the board
function makeButton(document, num, board){
    const newDiv = document.createElement("div");
    newDiv.addEventListener("click", function(){touchTile(num)})
    newDiv.id = `title_${num}`
    board.appendChild(newDiv);
}

// 'clicks' a tile, activating relevant consequences
function touchTile(tile){
    if (!playable){ return }

    let element = document.getElementById(`title_${tile}`)
    
    unTouched = unTouched.filter( x => x != tile);
    
    // if the tile is a bomb, the game ends
    if (mines.includes(tile)){
        console.log("found bomb")
        element.className = "bomb";
        element.textContent = "*";
        playable = false
        return
    }

    element.className = "clear";
    
    if (mineNeighbours(tile) > 0){
        element.textContent = mineNeighbours(tile)
    } 
    // if the tile has no mine neighbours, then it should reveal all nearby white space
    else {
        let neighbours = findNeighbours(tile)
        neighbours = neighbours.filter(x => unTouched.includes(x))
        
        for (let i = 0; i < neighbours.length; i++){
            touchTile(neighbours[i])
        }
    }

    if (unTouched.length === 0 && playable){
        let alert = document.createElement("div")
        alert.textContent = "You win!";
        let body = document.querySelector("#message");
        body.appendChild(alert)
        playable = false
    }
}

// returns all squares which touch the given tile
function findNeighbours(tile){
    let neighbours = [
        tile-21, tile-20, tile-19, 
        tile-1,           tile+1,
        tile+19, tile+20, tile+21
    ];
    let remove = []
    if (tile < 20){
        remove.push(tile-21, tile-20, tile-19)
    }
    if (tile % 20 === 19){
        remove.push(tile-19, tile+1, tile+21)
    }
    if (tile >= 390){
        remove.push(tile+19, tile+20, tile+21)
    }
    if (tile % 20 === 0){
        remove.push(tile-21, tile-1, tile+19)
    }
    neighbours = neighbours.filter(x => !remove.includes(x))
    
    return neighbours
}

// returns the number of neighbours which are mines
function mineNeighbours(tile){
    let neighbours = findNeighbours(tile)
    let count = 0;
    for (let i = 0; i < neighbours.length; i++){
        if (mines.includes(neighbours[i])){count++}
    }
    
    return count;
}

let button = document.querySelector("#new-game");
button.addEventListener("click", () => newGame(document));
var board = document.querySelector(".board");
let playable = true;
var unTouched = [];
var mines = []

