function bmi(weight, height){
    bmi_val = weight / (height * height)
    bmi_num = Math.round(bmi_val)
    if (bmi_num < 18.5){return "Underweight"}
    else if (bmi_num < 24.9){return "Normal"}
    else if (bmi_num < 29.9){return "Overweight"}
    else if (bmi_num < 39.9){return "Obese"}
    else {return "Severely Obese"}
}

for (let i = 0; i < 100; i++) {
	console.log(i + bmi(i, 1));
}
