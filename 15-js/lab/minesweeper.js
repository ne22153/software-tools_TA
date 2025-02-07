function newGame(document){
    board.innerHTML = "";
    unTouched = []
    mines = []
    playable = true

    for (let i = 0; i < 60; i++){
        let rand = Math.random();
        if (rand <= 0.1){mines.push(i)}
        else {unTouched.push(i)}
        makeButton(document, i, board);
    }
    console.log(mines)
    console.log(unTouched)
}

function makeButton(document, num, board){
    const newDiv = document.createElement("div");
    newDiv.addEventListener("click", function(){touchTile(num)})
    newDiv.id = `title_${num}`
    board.appendChild(newDiv);
}

function touchTile(tile){
    if (!playable){ return }


    let element = document.getElementById(`title_${tile}`)
    // unTouched.splice(unTouched.indexOf(tile), 1);
    unTouched = unTouched.filter( x => x != tile);
    // console.log("found, "+tile)
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
    else {
        let neighbours = findNeighbours(tile)
        neighbours = neighbours.filter(x => unTouched.includes(x))
        console.log("UnTouched neighbours: "+neighbours)
        for (let i = 0; i < neighbours.length; i++){
                // setTimeout(() => touchTile(neighbours[i]), 0)
            touchTile(neighbours[i])
        }
    }

    if (unTouched.length == 0 && playable){
        let alert = document.createElement("div")
        alert.textContent = "You win!";
        let body = document.querySelector("#message");
        body.appendChild(alert)
        playable = false
    }
}

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
    if (tile % 20 == 19){
        remove.push(tile-19, tile+1, tile+21)
    }
    if (tile >= 390){
        remove.push(tile+19, tile+20, tile+21)
    }
    if (tile % 20 == 0){
        remove.push(tile-21, tile-1, tile+19)
    }
    neighbours = neighbours.filter(x => !remove.includes(x))
    //console.log("Neighbours of "+tile+" are "+neighbours)
    return neighbours
}

function mineNeighbours(tile){
    let neighbours = findNeighbours(tile)
    let count = 0;
    for (let i = 0; i < neighbours.length; i++){
        if (mines.includes(neighbours[i])){count++}
    }
    console.log(count)
    return count;
}

let button = document.querySelector("#new-game");
button.addEventListener("click", () => newGame(document));
var board = document.querySelector(".board");
let playable = true;
var unTouched = [];
var mines = []

