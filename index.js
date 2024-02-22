import Player from "./Player.js";
import Bullet from "./Bullet.js";
import Stone from "./Stone.js";


const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.querySelector('#scoreEl')

canvas.width = 800; //innerWidth;
canvas.height = 600; //innerHeight;
let playerX = canvas.width / 2 - 25;
let playerY = canvas.height - 150;
let playerSpeed = 5;
let leftPressed = false;
let rightPressed = false;
let shootPressed = false;
let score = 0;

let bullets = [];
let stones = [];

let player = new Player(playerX, playerY, 50, 100);

let animationId;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    player.draw(ctx);

    //вылет снаряда за холст
    bullets.forEach((bullet, index) => {
        bullet.draw(ctx);

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
        //попадание снаряда в камень
        stones.forEach((stone, stoneIndex) => {
            if (isCollision (bullet, stone)){
                bullets.splice(index, 1);
                stones.splice(stoneIndex, 1);
                score += 1;
                scoreEl.innerHTML = score;
            }
        })


    });
    //вылет камня за холст
    stones.forEach((stone, index) => {
        stone.draw(ctx);

        if (stone.y > canvas.height) {
            stones.splice(index, 1);
        }
        //попадание камня в игрока
        if (isCollision (stone, player)){
            cancelAnimationFrame(animationId);
        }
    })
    
    console.log(bullets.length)
    console.log(stones.length)
}

function isCollision (rect1, rect2) {
    if(rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            return true;
        }
    };

animate();
setInterval(function() {
    stones.push(new Stone(Math.round(Math.random()*canvas.width) , 0))
  }, 1000,)
  
//управление игроком:
function move(){
    if (leftPressed && player.x > 0) {
        player.x -= playerSpeed;
    }
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += playerSpeed;
    }
    if (shootPressed) {
        bullets.push(new Bullet(player.x + 23, player.y))
    }
}

let keydown = (e) => {
    if (e.code === "ArrowLeft") {
        leftPressed = true;
    }
    if (e.code === "ArrowRight") {
        rightPressed = true;
    }
    if (e.code === "Space") {
        shootPressed = true;
    }
};
let keyup = (e) => {
    if (e.code === "ArrowLeft") {
        leftPressed = false;
    }
    if (e.code === "ArrowRight") {
        rightPressed = false;
    }
    if (e.code === "Space") {
        shootPressed = false;
    }
};
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);