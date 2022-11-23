let players = document.querySelector('.players');
let send = document.getElementById('submit');
let names1 = document.querySelector('.name1');
let names2 = document.querySelector('.name2');



let playersName = [];

send.addEventListener('click',sendName);

function sendName () {
    let num = +players.value;  // Összehasonlítom az inputban hogy szám e a beírt érték
    if (players.value === "" ) {
        players.placeholder = "Please enter a name"
    } else if (num === num) {
        players.placeholder = "You cannot enter a number"
    } else if (playersName.length < 5) {
        playersName.push(players.value);
        names1.innerHTML += players.value + "<br>";
    } else if (playersName.length < 10) {
        playersName.push(players.value);
        names2.innerHTML += players.value + "<br>";
    } else {
        players.placeholder = "You cannot enter more names"
    }
    players.value = "";
};
