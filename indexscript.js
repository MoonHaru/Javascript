"use strict"
alert("Bienvenido a toque y fama\n El juego es simple, cuatro numeros distintos, del 1 al 9\n cada toque significa que hay un numero acertado, pero que no esta en el lugar correcto y cada fama es un numero acertado en el lugar correcto\n se gana con 4 famas.\n Tiene 5 intentos")
function check(numbers){
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(numbers[i]==numbers[j] && i !=j){
                return false;
            }
        }
    }
    return true;
}

function checkW(answ,numbers){
    let tCount = 0;
    let fCount = 0;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(answ[i]==numbers[j] && i !=j){
                tCount++;
            }
            else if(answ[i]==numbers[j] && i == j){
                fCount++;
            }
        }
    }
    if(fCount == 4){
        alert("Felicidades, ganaste")
        return true
    }
    alert(`Tiene ${tCount} toques y ${fCount} Famas\n Respuesta: ${answ}`);
    return false
}


let checkv= false;
let numbers = [];
do {
    for(let i=0; i<4; i++){
        numbers[i]= Math.floor(Math.random() * 9)+1
    }
    checkv = check(numbers);
    console.log(numbers);
}
while(!checkv);
let answ = [];
let tries  = 5;
let win = 0;
while(tries>0 && win == 0){
    let useAnsw = prompt("Ingrese los 4 numeros sin espacios");
    answ = String(useAnsw).split("").map(Number);
    if(checkW(answ,numbers)){
        win=1;
        break
    }
    tries--;
    if(tries == 0 ){
        alert("Te quedaste sin oportunidades!")
    }
}