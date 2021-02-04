const game = document.querySelector("#game");
const gameBox = game.getBoundingClientRect();
const bird = document.querySelector("#bird");
const score = game.querySelector("h1");

const birdHoriontalSpeed = 15;
const birdFallingSpeed = 5;
const birdVerticalSpeed = 30;
let currentScore = 0;

function generateObstacle() {
    let holder = document.createElement("div");
    holder.classList.add("obstacle_holder");

    for (let i = 0; i < 2; i++) {
        let obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        holder.appendChild(obstacle);
    }

    let top = Math.floor(Math.random() * 300) - 15;
    holder.style.top = `-${top}px`;

    game.appendChild(holder);
    return holder;
}

function moveObstacle() {
    let obstacles = document.querySelectorAll(".obstacle_holder");
    [...obstacles].forEach((o) => {
        let l = parseInt(o.style.left, 10);
        l = isNaN(l) ? 500 : l;

        l -= birdHoriontalSpeed;
        o.style.left = `${l}px`;

        if (l < -60) {
            game.removeChild(o);
        }
    });
    checkBirdCollision();
}

function checkBirdCollision() {
    let obstacles = document.querySelectorAll(".obstacle");
    let birdBox = bird.getBoundingClientRect();

    [...obstacles].forEach((o) => {
        let oBox = o.getBoundingClientRect();
        if (isCollide(birdBox, oBox)) {
            death();
        }
    });

    if (birdBox.bottom >= gameBox.bottom) {
        death();
    }
}

function isCollide(a, b) {
    //  https://stackoverflow.com/a/7301852
    return !(
        a.y + a.height < b.y ||
        a.y > b.y + b.height ||
        a.x + a.width < b.x ||
        a.x > b.x + b.width
    );
}

function death() {
    clearInterval(obstacleGeneratorTimer);
    clearInterval(obstacleMoveTimer);
    clearInterval(birdFallTimer);
    clearInterval(scoreTimer);

    document.body.removeEventListener("click", birdFlap);
    document.body.removeEventListener("contextmenu", birdDrop);

    score.innerText = "You lose!";
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
    let top = findBirdTop();
    top = Math.max(0, top - birdVerticalSpeed);
    bird.style.top = `${top}px`;
}

function birdDrop(event) {
    event.preventDefault();
    let top = findBirdTop();
    top = Math.max(0, top + birdVerticalSpeed / 1.5);
    bird.style.top = `${top}px`;
}

function checkScore() {
    currentScore += 1;
    score.innerText = `${currentScore} points`;
}

let obstacleGeneratorTimer = setInterval(generateObstacle, 3000);
let obstacleMoveTimer = setInterval(moveObstacle, 200);
let birdFallTimer = setInterval(birdFall, 200);
let scoreTimer = setInterval(checkScore, 200);

document.body.addEventListener("click", birdFlap);
document.body.addEventListener("contextmenu", birdDrop);

birdFall();
