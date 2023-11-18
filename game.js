import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";

export class Game {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.player = new Player(this, 5);
    this.asteroids = [];
    this.input = new InputHandler();
    this.asteroidSpawnInterval = 2000; // Interval in milliseconds
    this.lastSpawnTime = Date.now();
  }

  update() {
    this.player.update(this.input.keys);
    this.asteroids.forEach((asteroid) => asteroid.update());

    // Check if it's time to spawn a new asteroid
    if (Date.now() - this.lastSpawnTime > this.asteroidSpawnInterval) {
      this.spawnNewAsteroid();
      this.lastSpawnTime = Date.now();
    }
  }

  draw() {
    this.player.draw(this.ctx);
    this.asteroids.forEach((asteroid) => asteroid.draw(this.ctx));
  }

  spawnNewAsteroid() {
    const newAsteroid = new Asteroid(this, this.player);
    this.asteroids.push(newAsteroid);
  }
}
