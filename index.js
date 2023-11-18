import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Game } from "./game.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  const game = new Game(canvas.width, canvas.height, ctx);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
