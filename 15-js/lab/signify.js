function signify(text, prob){
    text_list = text.split(" ");
    for (let i = 0; i < text_list.length; i++){
        random = Math.random()
        if (random <= prob){
            text_list[i] = text_list[i].charAt(0).toUpperCase() + text_list[i].slice(1)
        }
    }
    return text_list.join(" ");
}

console.log(signify("hello world i'm testing this code", 0.3));