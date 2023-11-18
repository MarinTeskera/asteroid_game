export class Asteroid {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    const size = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    this.width = size;
    this.height = size;
    this.x = 0;
    this.y = 0;
  }

  update() {
    this.x += 1;
    this.y += 1;
  }

  draw(context) {
    context.fillStyle = "gray";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
