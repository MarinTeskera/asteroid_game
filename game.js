import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";

export class Game {
  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = new Player(this, 5, ctx);
    this.asteroids = [];
    this.input = new InputHandler();
    this.startTime = Date.now(); // Added timer start time
    this.highScore = localStorage.getItem("highScore") || 0;
  }

  update() {
    if (!this.gameOver) {
      this.player.update(this.input.keys);
      this.asteroids.forEach((asteroid) => asteroid.update());

      // Check for collision
      this.checkCollision();

      // Adjust spawn rate based on elapsed time
      const elapsedTimeInSeconds = (Date.now() - this.startTime) / 1000;
      const spawnRate = Math.max(2000 - elapsedTimeInSeconds * 20, 500);

      // Check if it's time to spawn a new asteroid
      if (Math.random() < 20 / spawnRate) {
        this.spawnNewAsteroid();
      }

      this.updateTimer();
    }
  }

  reset() {
    this.player.reset();
    this.asteroids = [];
    this.startTime = Date.now();
    this.gameOver = false;
  }

  draw() {
    // this.ctx.fillStyle = "black"; // Set canvas background color to black
    // this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "green";
    this.ctx.lineWidth = 5;
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.player.draw(this.ctx);
    this.asteroids.forEach((asteroid) => asteroid.draw(this.ctx));
    this.drawTimer();
    this.drawHighScore();
  }

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

  updateTimer() {
    this.elapsedTime = Date.now() - this.startTime;
  }

  drawTimer() {
    const minutes = Math.floor(this.elapsedTime / 60000);
    const seconds = ((this.elapsedTime % 60000) / 1000).toFixed(3);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Time: ${minutes}:${seconds}`, 10, 30);
  }

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

  checkCollision() {
    this.asteroids.forEach((asteroid) => {
      if (
        this.player.x < asteroid.x + asteroid.width &&
        this.player.x + this.player.width > asteroid.x &&
        this.player.y < asteroid.y + asteroid.height &&
        this.player.y + this.player.height > asteroid.y
      ) {
        // Collision detected
        this.gameOver = true;

        // Check and save high score
        if (this.elapsedTime > this.highScore) {
          this.highScore = this.elapsedTime;
          localStorage.setItem("highScore", this.highScore);
        }

        // Reset the game after a delay
        setTimeout(() => {
          this.resetGame();
        }, 2000);
      }
    });
  }

  resetGame() {
    this.player.reset();
    this.asteroids = [];
    this.startTime = Date.now();
    this.gameOver = false;
  }
}
