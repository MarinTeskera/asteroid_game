import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this, 5);
      this.asteroids = [new Asteroid(this, this.player)];
      this.input = new InputHandler();
    }

    update() {
      this.player.update(this.input.keys);
      this.asteroids.forEach((asteroid) => asteroid.update());
    }

    draw() {
      this.player.draw(ctx);
      this.asteroids.forEach((asteroid) => asteroid.draw(ctx));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
