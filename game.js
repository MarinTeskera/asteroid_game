import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";

// klasa igre
export class Game {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = new Player(this, 5, ctx);
    this.asteroids = [];
    this.input = new InputHandler();
    this.startTime = Date.now();
    this.highScore = localStorage.getItem("highScore") || 0;
  }

  // funkcija za update igre
  update() {
    if (!this.gameOver) {
      this.player.update(this.input.keys);
      this.asteroids.forEach((asteroid) => asteroid.update());

      this.checkCollision();

      // Podesavanje brzine spawnanja asteroida
      const elapsedTimeInSeconds = (Date.now() - this.startTime) / 1000;
      const spawnRate = Math.max(2000 - elapsedTimeInSeconds * 20, 500);

      // provjera je li vrijeme za spawnati novi asteroid
      if (Math.random() < 20 / spawnRate) {
        this.spawnNewAsteroid();
      }

      this.updateTimer();
    }
  }

  // funkcija za crtanje igre
  draw() {
    this.ctx.strokeStyle = "green";
    this.ctx.lineWidth = 5;
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.player.draw(this.ctx);
    this.asteroids.forEach((asteroid) => asteroid.draw(this.ctx));
    this.drawTimer();
    this.drawHighScore();
  }

  // funkcija za spawn asteroida
  spawnNewAsteroid() {
    var speed = 2;

    if (this.elapsedTime > 180000) {
      speed = 5;
    } else if (this.elapsedTime > 120000) {
      speed = 4;
    } else if (this.elapsedTime > 60000) {
      speed = 3;
    }

    const newAsteroid = new Asteroid(this, this.player, speed);
    this.asteroids.push(newAsteroid);
  }

  // funkcija za postavljanje vremena
  updateTimer() {
    this.elapsedTime = Date.now() - this.startTime;
  }

  // funkcija za prikaz vremena
  drawTimer() {
    const minutes = Math.floor(this.elapsedTime / 60000);
    const seconds = ((this.elapsedTime % 60000) / 1000).toFixed(3);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Time: ${minutes}:${seconds}`, 10, 30);
  }

  // funkcija za prikaz high score-a
  drawHighScore() {
    const toShow =
      this.highScore > this.elapsedTime ? this.highScore : this.elapsedTime;
    const highScoreMinutes = Math.floor(toShow / 60000);
    const highScoreSeconds = ((toShow % 60000) / 1000).toFixed(3);

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      `High Score: ${highScoreMinutes}:${highScoreSeconds}`,
      10,
      60
    );
  }

  // funkcija za provjeru kolizije
  checkCollision() {
    this.asteroids.forEach((asteroid) => {
      if (
        this.player.x < asteroid.x + asteroid.width &&
        this.player.x + this.player.width > asteroid.x &&
        this.player.y < asteroid.y + asteroid.height &&
        this.player.y + this.player.height > asteroid.y
      ) {
        this.gameOver = true;

        // promijeniti high score ako je potrebno
        if (this.elapsedTime > this.highScore) {
          this.highScore = this.elapsedTime;
          localStorage.setItem("highScore", this.highScore);
        }

        // resetirati igru nakon 2 sekunde
        setTimeout(() => {
          this.resetGame();
        }, 2000);
      }
    });
  }

  // funkcija za resetiranje igre
  resetGame() {
    this.player.reset();
    this.asteroids = [];
    this.startTime = Date.now();
    this.gameOver = false;
  }
}
