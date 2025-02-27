let story;
let pageNum = 0;
let totalPages;
let page;
let infoPane;
let info;

// sets up the key elements and variables
function initialise(newStory){
    story = newStory
    document.querySelector("h1").innerHTML = story.title

    page = document.querySelector(".page")
    page.innerHTML = "<p>" + story.pages[0] + "</p>"

    totalPages = story.pages.length
    pageNum = 1;

    infoPane = document.querySelector(".infopane")
    info = document.createElement("p")
    info.innerHTML = "<p> Author: " + story.author + ", Translated by: " + story.translator + ", Current Page: "+ pageNum +"</p>"
    infoPane.appendChild(info)

    // form is defined separately to avoid being overwritten later
    let form = document.createElement("form")
    form.innerHTML = "<form><label for='jump'>Jump To:</label><br>" +
        "<input type='number' id='jump' name='jump'><br>" +
        "</form>"
    infoPane.appendChild(form)
}

// moves back a page
function prevPage(){
    if (pageNum === 1){
        return;
    }

    pageNum--
    page.innerHTML = "<p>" + story.pages[pageNum - 1] + "</p>"
    info.innerHTML = "<p> Author: " + story.author + ", Translated by: " + story.translator + ", Current Page: "+ pageNum +"</p>"
}

// moves forward a page
function nextPage(){
    if (pageNum === totalPages){
        return;
    }

    pageNum++
    page.innerHTML = "<p>" + story.pages[pageNum - 1] + "</p>"
    info.innerHTML = "<p> Author: " + story.author + ", Translated by: " + story.translator + ", Current Page: "+ pageNum +"</p>"
}

function jumpPage(jumpTo){
    if (jumpTo > totalPages || jumpTo <= 0){return;}

    pageNum = jumpTo

    page.innerHTML = "<p>" + story.pages[jumpTo - 1] + "</p>"
    info.innerHTML = "<p> Author: " + story.author + ", Translated by: " + story.translator + ", Current Page: "+ pageNum +"</p>"

}

document.addEventListener("DOMContentLoaded", async function () {
    await fetch("anabasis.json").then(story => story.json()).then(story => initialise(story))

    let prev = document.querySelector("#prev")
    prev.addEventListener("click", () => prevPage())

    let next = document.querySelector("#next")
    next.addEventListener("click", () => nextPage())

    let jump = infoPane.querySelector("form")
    jump.addEventListener("keydown", function (event){
        if (event.key === "Enter") {
            jumpPage(infoPane.querySelector("input").value)
            event.preventDefault()
        }
    })

    // unfinished python caller, issues due to browser side running restrictions
    /*let dictform = document.querySelector("#dictform")
    dictform.addEventListener("keydown", function (event){
        if (event.key === "Enter"){
            event.preventDefault()
            fetch('http://localhost:8000/lab/cgi-bin/whatmeans').then(response => response.text()).then(data => console.log(data))
        }
    })*/
})

