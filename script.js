const game = document.querySelector("#game");
const gameBox = game.getBoundingClientRect();
const bird = document.querySelector("#bird");
const score = game.querySelector("h1");

const birdHoriontalSpeed = 15;
const birdFallingSpeed = 5;
const birdVerticalSpeed = 30;

let currentScore = 0;
let obstacleGeneratorTimer;
let obstacleMoveTimer;
let birdFallTimer;
let scoreTimer;

function createObstaclePart(parentElement, className) {
    let obstacle = document.createElement("div");
    obstacle.classList.add(className);
    parentElement.appendChild(obstacle);
    return obstacle;
}

function generateObstacle() {
    let holder = createObstaclePart(game, "obstacle_holder");

    let top = Math.floor(Math.random() * 300) - 15;
    holder.style.top = `-${top}px`;

    //  ADD 2 OBSTACLES HERE

    return holder;
}

function moveObstacle() {
    let obstacles = document.querySelectorAll(".obstacle_holder");

    //  LOOP THROUGH OBSTACLES
    //  MOVE OBSTACLES
    //  REMOVE OBSTACLE IF LEFT OFFSET < -60

    checkBirdCollision();
}

function checkBirdCollision() {
    let obstacles = document.querySelectorAll(".obstacle");
    let birdBox = bird.getBoundingClientRect();

    [...obstacles].forEach((o) => {
        let oBox = o.getBoundingClientRect();
        if (
            isCollide(
                birdBox.x,
                birdBox.y,
                birdBox.width,
                birdBox.height,
                oBox.x,
                oBox.y,
                oBox.width,
                oBox.height
            )
        ) {
            death();
        }
    });

    if (birdBox.bottom >= gameBox.bottom) {
        death();
    }
}

function isCollide(
    birdX,
    birdY,
    birdWidth,
    birdHeight,
    obstacleX,
    obstacleY,
    obstacleWidth,
    obstacleHeight
) {
    //  IMPLEMENT
}

function buildRestartButton() {
    let btn = document.createElement("button");
    btn.innerText = "Restart";

    document.body.appendChild(btn);

    btn.addEventListener("click", start);
}

function death() {
    clearInterval(obstacleGeneratorTimer);
    clearInterval(obstacleMoveTimer);
    clearInterval(birdFallTimer);
    clearInterval(scoreTimer);

    document.body.removeEventListener("click", birdFlap);
    document.body.removeEventListener("contextmenu", birdDrop);

    score.innerText = "You lose!";

    buildRestartButton();
}

function findBirdTop() {
    let birdBox = bird.getBoundingClientRect();
    let top = parseInt(bird.style.top, 10);

    return isNaN(top) ? 0 : top;
}

function birdFall() {
    let top = findBirdTop();
    top += birdFallingSpeed;

    bird.style.top = `${top}px`;

    let birdBox = bird.getBoundingClientRect();
    if (birdBox.bottom >= gameBox.bottom) {
        death();
    }
}

function birdFlap(event) {
    event.preventDefault();
    //  MOVE bird UP BY birdVerticalSpeed
}

function birdDrop(event) {
    event.preventDefault();
    //  MOVE bird DOWN BY birdVerticalSpeed
}

function checkScore() {
    currentScore += 1;
    score.innerText = `${currentScore} points`;
}

function start() {
    [...document.querySelectorAll(".obstacle_holder")].forEach((e) =>
        e.parentElement.removeChild(e)
    );

    obstacleGeneratorTimer = setInterval(generateObstacle, 3000);
    obstacleMoveTimer = setInterval(moveObstacle, 200);
    birdFallTimer = setInterval(birdFall, 200);
    scoreTimer = setInterval(checkScore, 200);

    document.body.addEventListener("click", birdFlap);
    document.body.addEventListener("contextmenu", birdDrop);

    currentScore = 0;
    bird.style.top = "0px";

    birdFall();
}

start();
