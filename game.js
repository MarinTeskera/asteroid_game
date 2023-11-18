import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";

export class Game {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.player = new Player(this, 5);
    this.asteroids = [new Asteroid(this, this.player)];
    this.input = new InputHandler();
    this.asteroidSpawnInterval = 2000; // Interval in milliseconds
    this.lastSpawnTime = Date.now();
    this.startTime = Date.now(); // Added timer start time
  }

  update() {
    this.player.update(this.input.keys);
    this.asteroids.forEach((asteroid) => asteroid.update());

    // Check if it's time to spawn a new asteroid
    if (Date.now() - this.lastSpawnTime > this.asteroidSpawnInterval) {
      this.spawnNewAsteroid();
      this.lastSpawnTime = Date.now();
    }

    this.updateTimer();
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.player.draw(this.ctx);
    this.asteroids.forEach((asteroid) => asteroid.draw(this.ctx));
    this.drawTimer();
  }

  spawnNewAsteroid() {
    const newAsteroid = new Asteroid(this, this.player);
    this.asteroids.push(newAsteroid);
  }

  updateTimer() {
    this.elapsedTime = Date.now() - this.startTime;
  }

  drawTimer() {
    const minutes = Math.floor(this.elapsedTime / 60000);
    const seconds = ((this.elapsedTime % 60000) / 1000).toFixed(2);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Time: ${minutes}:${seconds}`, this.width - 200, 20);
  }
}
