let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
let canvas1 = document.querySelector('.canvas1');
let ctx1 = canvas1.getContext('2d');

let players = document.querySelector('.players');
let send = document.getElementById('submit');
let start = document.querySelector('.start');
let pushPlayers = document.querySelector('.name');

let leftPlayerScore = 0;
let rightPlayerScore = 0;
let playersName = [];
let winners = [];

// Options the ball
let ballxPosition = 0;
let ballyPosition = 0;
let ballxSpeed = 0;
let ballySpeed = 0;

// acceleration
let acceleration = 1.5;
let racketAcceleration = 1.5;

// Option left racket
let leftRacketxPosition = 20;
let leftRacketyPosition = 260;
let leftRacketUp = false;
let leftRacketDown = false;

// Option right racket
let rightRacketxPosition = 1275;
let rightRacketyPosition = 260;
let rightRacketUp = false;
let rightRacketDown = false;

let input = 0;
let leftPlayers = false;
let rightPlayers = false;

// Adding and loading players
function sendName () {
    let num = +players.value;  // Összehasonlítom az inputban hogy szám e a beírt érték
    if (players.value === "" ) {
        players.placeholder = "Please enter a name";
    } else if (num === num) {
        players.placeholder = "You cannot enter a number";
    } else if (playersName.length < 8) {
        pushPlayers.innerHTML += `<li>${players.value}</li>`
        playersName.push(players.value);
    } else {
        players.placeholder = "You cannot enter more names";
    };
    players.value = "";
};

// drawing the ball
function drawingBall (x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
};

// drawing contestants
function contestants (text,x,y) {
    ctx1.beginPath();
    ctx1.fillStyle= "white";
    ctx1.font= "50px sans-serif";
    ctx1.fillText(text,x,y);

};

// drawing player scores
function drawingPlayersScore (text,x,y) {
    ctx.beginPath();
    ctx.fillStyle= "white";
    ctx.font= "50px sans-serif";
    ctx.fillText(text,x,y);
};

// drawing racket
function drawingRacket (x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = "red";
    ctx.fill();
};

// drawing middle of the track
function middleOfTheTrack () {
    ctx.beginPath();
    ctx.setLineDash([40]);
    ctx.moveTo(650, 0);
    ctx.lineTo(650, 650);
    ctx.strokeStyle = "white";
    ctx.stroke();
};

// random direction
function randomDirection () {
    ballxPosition = 650;
    ballyPosition = 300;
    ballxSpeed = (Math.trunc(Math.random())* 20+19) * (Math.round(Math.random())* 2-1);
    ballySpeed = (Math.trunc(Math.random())* 20+19) * (Math.round(Math.random())* 2-1);
};

// ball launch
function ballLaunch () {
    ballxPosition += ballxSpeed; 
    ballyPosition += ballySpeed;
    if (ballyPosition >= 595 || ballyPosition <= 5) {
       new Audio("../song/wall.mp3").play();
        ballySpeed = -ballySpeed;
    };
    if (ballxPosition > 1340) {
        new Audio("../song/gameover.mp3").play();
        leftPlayerScore +=1;
        randomDirection ();
        racketAcceleration = 1.5
    };
    if (ballxPosition < -20) {
        new Audio("../song/gameover.mp3").play();
        rightPlayerScore +=1;
        randomDirection ();
        racketAcceleration = 1.5
    };
    if (ballxPosition <= 30 &&  ballyPosition > leftRacketyPosition-10 && ballyPosition < leftRacketyPosition + 90) {
        new Audio("../song/racket.mp3").play();
        ballxSpeed = -ballxSpeed;
        ballxSpeed *= acceleration;
        racketAcceleration *= 1.2;
    };
    if (ballxPosition >= 1270 &&  ballyPosition > rightRacketyPosition-10 && ballyPosition < rightRacketyPosition + 90) {
        new Audio("../song/racket.mp3").play();
        ballxSpeed = -ballxSpeed;
        ballxSpeed *= acceleration;
        racketAcceleration *= 1.2;
    }
};

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 87) {leftRacketUp = true;}
    if (event.keyCode === 83) {leftRacketDown = true;}
    if (event.keyCode === 38) {rightRacketUp = true;}
    if (event.keyCode === 40) {rightRacketDown = true;}
});

window.addEventListener("keyup", function(event) {
    if (event.keyCode === 87) {leftRacketUp = false;}
    if (event.keyCode === 83) {leftRacketDown = false;}
    if (event.keyCode === 38) {rightRacketUp = false;}
    if (event.keyCode === 40) {rightRacketDown = false;}
});

// Moving rackets
function movingRacket () {
    if (leftRacketUp) {leftRacketyPosition-=racketAcceleration}
    if (leftRacketDown) {leftRacketyPosition+=racketAcceleration}
    if (rightRacketUp) {rightRacketyPosition-=racketAcceleration}
    if (rightRacketDown) {rightRacketyPosition+=racketAcceleration}
};

// edge of the field
function edgeOfTheField () {
    if (leftRacketyPosition <=10) {leftRacketUp = false;}
    if (leftRacketyPosition >=510) {leftRacketDown = false;}
    if (rightRacketyPosition <=10) {rightRacketUp = false;}
    if (rightRacketyPosition >=510) {rightRacketDown = false;}
};

// Makes it true
function makeItTrue () {
    if (leftPlayerScore > 1) {
        leftPlayers = true;
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        leftRacketyPosition = 260;
        rightRacketyPosition = 260;
    };
    if (rightPlayerScore > 1) {
        rightPlayers = true;
        rightPlayerScore = 0;
        leftPlayerScore = 0;
        leftRacketyPosition = 260;
        rightRacketyPosition = 260;
    };
};

// The game is true until there is a winner.
function eliminationGame () {
    if (leftPlayers) {
        winners.push(playersName[0]);
        alert(`${playersName[playersName.length -1]} you are out of the game!`);
        leftPlayers = false;
        playersName.pop();
        playersName.shift();
        if (playersName.length >1) {
            alert(`${playersName[0]} ${playersName[playersName.length -1]} you will play after pressing "ok".`)
        };
    };
    if (rightPlayers) {
        winners.push(playersName[playersName.length -1]);
        alert(`${playersName[0]} you are out of the game!`);
        rightPlayers = false;
        playersName.pop();
        playersName.shift();
        if (playersName.length >1) {
            alert(`${playersName[0]} ${playersName[playersName.length -1]} you will play after pressing "ok".`)
        };
    };
    if (playersName.length === 0) {
        playersName = winners
        winners = [];
        console.log(playersName)
        if (playersName.length >1) {
            alert(`${playersName[0]} ${playersName[playersName.length -1]} you will play after pressing "ok".`)
        };
    };
    if (playersName.length === 1) {
        alert(`${playersName[0]} you won the game!`)
        playersName = [];
        winners = [];
        pushPlayers.innerHTML = ""
        input = 0;
        console.log(playersName)
        ctx1.clearRect(0,0,canvas.width,canvas.height);
        contestants ("",50,50);
        contestants ("",650,50);
    };
};


// loop
function game () {
    if (playersName.length > 1) {
        window.requestAnimationFrame(game);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx1.clearRect(0,0,canvas.width,canvas.height);
        contestants (playersName[0],50,50);
        contestants (playersName[playersName.length-1],650,50);
        middleOfTheTrack ();
        drawingPlayersScore(leftPlayerScore,50,80);
        drawingPlayersScore(rightPlayerScore,1210,80);
        drawingBall (ballxPosition,ballyPosition,10);
        drawingRacket (leftRacketxPosition,leftRacketyPosition,5,80);
        drawingRacket (rightRacketxPosition,rightRacketyPosition,5,80);
        edgeOfTheField ();
        movingRacket ();
        ballLaunch();
        makeItTrue ()
        eliminationGame ()
    };
};

function startGame () {
    if (playersName.length %2 === 1 || playersName.length === 0) {
        players.placeholder = "You have to be in pairs";
    } 
    if (input === 0 && playersName.length >1) {
        console.log(input)
        alert(`${playersName[0]} ${playersName[playersName.length -1]} you will play after pressing "ok".`)
        game();
        input = 1;
        console.log(input)
    };
};

start.addEventListener('click',startGame);
send.addEventListener('click',sendName);
randomDirection ();