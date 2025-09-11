import { particleSystem } from "./Particle";

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 650;
const PLAYER_SPEED = 7;
const BULLET_SPEED = 10;
const ENEMY_SPEED = 3;
const POWERUP_SPAWN_RATE = 0.008;
const LEVEL_SCORE_INCREMENT = 1500;
const PLAYER_INVULNERABILITY_TIME = 2000;

let canvas, ctx;
let gameRunning = false;
let gamePaused = false;
let score = 0;
let level = 1;
let playerHealth = 100;
let playerPower = 0;
let enemies = [];
let bullets = [];
let powerups = [];
let keys = {};
let frameCount = 0;
let enemySpawnRate = 60;
let activePowerups = {};
let isPlayerInvulnerable = false;
let lastHitTime = 0;
let callbacks = {};

const images = {
  player: null,
  enemies: [],
  bullet: null,
  powerups: {
    rapid: null,
    shield: null,
    speed: null,
  },
};

function loadImages() {
  return new Promise((resolve) => {
    let imagesLoaded = 0;
    const totalImages = 8;

    function checkLoaded() {
      if (++imagesLoaded === totalImages) resolve();
    }

    images.player = new Image();
    images.player.src = "/images/player.png";
    images.player.onload = checkLoaded;

    for (let i = 0; i < 3; i++) {
      images.enemies[i] = new Image();
      images.enemies[i].src = `/images/enemy${i + 1}.png`;
      images.enemies[i].onload = checkLoaded;
    }

    images.bullet = new Image();
    images.bullet.src = "/images/bullet.png";
    images.bullet.onload = checkLoaded;

    ["rapid", "shield", "speed"].forEach((type) => {
      images.powerups[type] = new Image();
      images.powerups[type].src = `/images/${type}-powerup.png`;
      images.powerups[type].onload = checkLoaded;
    });
  });
}


const player = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 100,
  width: 60,
  height: 80,
  speed: PLAYER_SPEED,
  lastShot: 0,
  shootDelay: 300,

  draw() {
    if (images.player) {
      ctx.save();
      if (isPlayerInvulnerable && Math.floor(Date.now() / 100) % 2 === 0) ctx.globalAlpha = 0.5;
      ctx.drawImage(images.player, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      ctx.restore();
    }
  },

  update() {
    let moveX = 0,
      moveY = 0;
    if (keys["ArrowLeft"] || keys["a"]) moveX -= this.speed;
    if (keys["ArrowRight"] || keys["d"]) moveX += this.speed;
    if (keys["ArrowUp"] || keys["w"]) moveY -= this.speed;
    if (keys["ArrowDown"] || keys["s"]) moveY += this.speed;

    if (moveX && moveY) {
      moveX *= 0.7071;
      moveY *= 0.7071;
    }

    this.x += moveX;
    this.y += moveY;

    this.x = Math.max(this.width / 2, Math.min(canvas.width - this.width / 2, this.x));
    this.y = Math.max(this.height / 2, Math.min(canvas.height - this.height / 2, this.y));

    if (isPlayerInvulnerable && Date.now() - lastHitTime > PLAYER_INVULNERABILITY_TIME) {
      isPlayerInvulnerable = false;
    }
  },

  shoot() {
    const now = Date.now();
    if (now - this.lastShot < this.shootDelay) return;
    bullets.push({ x: this.x, y: this.y - 30, width: 8, height: 20, speed: BULLET_SPEED });
    this.lastShot = now;
  },
};


function spawnEnemy() {
  const enemy = { width: 50, height: 50, type: Math.floor(Math.random() * 3) };
  enemies.push({
    x: Math.random() * (canvas.width - enemy.width) + enemy.width / 2,
    y: -enemy.height,
    width: enemy.width,
    height: enemy.height,
    speed: ENEMY_SPEED,
    type: enemy.type,
  });
}


function update() {
  if (!gameRunning) return;

  player.update();

  if (keys["Enter"]) player.shoot();

  frameCount++;
  if (frameCount % enemySpawnRate === 0) spawnEnemy();

  //bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.y -= b.speed;
    if (b.y < 0) bullets.splice(i, 1);
  }


  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.y += e.speed;

    if (e.y - e.height / 2 > canvas.height) {
      enemies.splice(i, 1);
      continue;
    }

    const colliding =
      !isPlayerInvulnerable &&
      e.x + e.width / 2 > player.x - player.width / 2 &&
      e.x - e.width / 2 < player.x + player.width / 2 &&
      e.y + e.height / 2 > player.y - player.height / 2 &&
      e.y - e.height / 2 < player.y + player.height / 2;

    if (colliding) {
      enemies.splice(i, 1);
      playerHealth -= 20;
      isPlayerInvulnerable = true;
      lastHitTime = Date.now();
      particleSystem.createExplosion(player.x, player.y, "#ff4444", 20);
      callbacks.updateHealth && callbacks.updateHealth(playerHealth);
    }
  }

  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    for (let ei = enemies.length - 1; ei >= 0; ei--) {
      const e = enemies[ei];
      const hit =
        Math.abs(b.x - e.x) < e.width / 2 &&
        b.y < e.y + e.height / 2 &&
        b.y + b.height > e.y - e.height / 2;
      if (hit) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score += 100;
        particleSystem.createExplosion(e.x, e.y, "#ff9933", 24);
        break;
      }
    }
  }

  particleSystem.update();

  if (score >= level * LEVEL_SCORE_INCREMENT) {
    level++;
    callbacks.updateLevel && callbacks.updateLevel(level);
  }

  if (playerHealth <= 0) {
    gameRunning = false;
    callbacks.onGameOver && callbacks.onGameOver(score);
  }


  callbacks.updateScore && callbacks.updateScore(score);
  callbacks.updatePower && callbacks.updatePower(playerPower);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleSystem.draw(ctx);

  if (gameRunning) player.draw();

  bullets.forEach((b) => {
    if (images.bullet) {
      ctx.drawImage(images.bullet, b.x - b.width / 2, b.y, b.width, b.height);
    } else {
      ctx.fillStyle = "#ffd400";
      ctx.fillRect(b.x - b.width / 2, b.y, b.width, b.height);
    }
  });

  enemies.forEach((e) => {
    const enemyImg = images.enemies[e.type];
    if (enemyImg) {
      ctx.drawImage(enemyImg, e.x - e.width / 2, e.y - e.height / 2, e.width, e.height);
    } else {
      ctx.fillStyle = "#ff4444";
      ctx.fillRect(e.x - e.width / 2, e.y - e.height / 2, e.width, e.height);
    }
  });
}

function gameLoop() {
  if (!gamePaused) update();
  draw();
  requestAnimationFrame(gameLoop);
}

export async function initGame(gameCanvas, cb) {
  canvas = gameCanvas;
  ctx = canvas.getContext("2d");
  callbacks = cb || {};
  await loadImages();
  gameRunning = false; 
  gamePaused = false;
  score = 0;
  level = 1;
  playerHealth = 100;
  requestAnimationFrame(gameLoop);

  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(e.key)) e.preventDefault();
  });
  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
}

export function startGame() {
  gameRunning = true;
  gamePaused = false;
}

export function togglePause() {
  gamePaused = !gamePaused;
  callbacks.onPause && callbacks.onPause(gamePaused);
}

export function restartGame() {
  gameRunning = true;
  gamePaused = false;
  score = 0;
  level = 1;
  playerHealth = 100;
  enemies = [];
  bullets = [];
  powerups = [];
  player.x = GAME_WIDTH / 2;
  player.y = GAME_HEIGHT - 100;
}
