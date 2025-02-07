function fizzbuzz(num){
    return_string = "";
    if (num % 3 == 0){return_string = return_string.concat('', "fizz")}
    if (num % 5 == 0){return_string = return_string.concat('', 'buzz')}
    if (return_string == ""){return num}
    return return_string;
}

for (let i = 1; i < 16; i++) {
	console.log(fizzbuzz(i));
}