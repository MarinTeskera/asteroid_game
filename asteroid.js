export class Asteroid {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    const size = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    this.width = size;
    this.height = size;
    this.spawnOutsideScreen();
  }

  spawnOutsideScreen() {
    const spawnSide = Math.floor(Math.random() * 4);

    switch (spawnSide) {
      case 0: // Top
        this.x = Math.random() * this.game.width;
        this.y = -this.height;
        this.speedX = Math.random() * 4 - 2; // Faster speedX
        this.speedY = Math.random() * 2 + 1; // Faster and only positive speedY
        break;
      case 1: // Right
        this.x = this.game.width;
        this.y = Math.random() * this.game.height;
        this.speedX = -Math.random() * 2 - 1; // Faster and only negative speedX
        this.speedY = Math.random() * 4 - 2; // Faster speedY
        break;
      case 2: // Bottom
        this.x = Math.random() * this.game.width;
        this.y = this.game.height;
        this.speedX = Math.random() * 4 - 2; // Faster speedX
        this.speedY = -Math.random() * 2 - 1; // Faster and only negative speedY
        break;
      case 3: // Left
        this.x = -this.width;
        this.y = Math.random() * this.game.height;
        this.speedX = Math.random() * 2 + 1; // Faster and only positive speedX
        this.speedY = Math.random() * 4 - 2; // Faster speedY
        break;
      default:
        break;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Check for collision with player
    if (
      this.x < this.player.x + this.player.width &&
      this.x + this.width > this.player.x &&
      this.y < this.player.y + this.player.height &&
      this.y + this.height > this.player.y
    ) {
      console.log("Collision with player!");
    }
  }

  draw(context) {
    context.fillStyle = "gray";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
