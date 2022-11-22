//alert("Left players :\nUp: W\nDown: S");
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let leftPlayerScore = 0;
let rightPlayerScore = 0;

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

// drawing the ball
function drawingBall (x,y,r) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
};

// drawing player scores
function drawingPlayers (text,x,y) {
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
    ballxPosition = 645;
    ballyPosition = 295;
    ballxSpeed = (Math.trunc(Math.random())* 2+1) * (Math.round(Math.random())* 2-1);
    ballySpeed = (Math.trunc(Math.random())* 2+1) * (Math.round(Math.random())* 2-1);
};

// ball launch
function ballLaunch () {
    ballxPosition += ballxSpeed; 
    ballyPosition += ballySpeed;
    if (ballyPosition >= 595 || ballyPosition <= 5) {
        new Audio("../song/wall.mp3").play();
        ballySpeed = -ballySpeed;
    };
    if (ballxPosition > 1310) {
        new Audio("../song/gameover.mp3").play();
        leftPlayerScore +=1;
        randomDirection ();
        racketAcceleration = 1.5
    };
    if (ballxPosition < -10) {
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
});

window.addEventListener("keyup", function(event) {
    if (event.keyCode === 87) {leftRacketUp = false;}
    if (event.keyCode === 83) {leftRacketDown = false;}
});

// Moving rackets
function movingRacket () {
    if (leftRacketUp) {leftRacketyPosition-=racketAcceleration}
    if (leftRacketDown) {leftRacketyPosition+=racketAcceleration}
    if (rightRacketUp) {rightRacketyPosition-=racketAcceleration}
    if (rightRacketDown) {rightRacketyPosition+=racketAcceleration}
};

// Computer player
function automaPlayer () {
    rightRacketUp = ballyPosition < rightRacketyPosition+5
    rightRacketDown = ballyPosition > rightRacketyPosition
}

// edge of the field
function edgeOfTheField () {
    if (leftRacketyPosition <=10) {leftRacketUp = false;}
    if (leftRacketyPosition >=510) {leftRacketDown = false;}
    if (rightRacketyPosition <=10) {rightRacketUp = false;}
    if (rightRacketyPosition >=510) {rightRacketDown = false;}
};

// winning
function winning () {
    if (leftPlayerScore === 10) {
        alert("Left player, you have won the game!")
        leftPlayerScore = 0;
    };
    if (rightPlayerScore === 10) {
        alert("Right player, you have won the game!");
        rightPlayerScore = 0;
    };
}

// loop
function game () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    automaPlayer ()
    middleOfTheTrack ();
    drawingPlayers(leftPlayerScore,50,80);
    drawingPlayers(rightPlayerScore,1210,80);
    drawingBall (ballxPosition,ballyPosition,10);
    drawingRacket (leftRacketxPosition,leftRacketyPosition,5,80);
    drawingRacket (rightRacketxPosition,rightRacketyPosition,5,80);
    ballLaunch ();
    edgeOfTheField ()
    movingRacket ()
    winning ()
    window.requestAnimationFrame(game);
};

randomDirection ();
game ();