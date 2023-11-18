export class Asteroid {
  constructor(game, player, maxSpeed) {
    this.game = game;
    this.player = player;
    this.maxSpeed = maxSpeed;
    const size = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    this.width = size;
    this.height = size;
    this.spawnOutsideScreen();
  }

  spawnOutsideScreen() {
    const spawnSide = Math.floor(Math.random() * 4);
    const direction = Math.random() < 0.5 ? -1 : 1;

    switch (spawnSide) {
      case 0: // Top
        this.x = Math.random() * this.game.width;
        this.y = -this.height;

        this.speedX = Math.random() * this.maxSpeed * direction; // Faster and only positive speedY
        this.speedY = ((Math.random() + 1) / 2) * this.maxSpeed; // Faster speedX
        break;
      case 1: // Right
        this.x = this.game.width;
        this.y = Math.random() * this.game.height;
        this.speedX = -((Math.random() + 1) / 2) * this.maxSpeed; // Faster and only negative speedX
        this.speedY = Math.random() * this.maxSpeed * direction;
        break;
      case 2: // Bottom
        this.x = Math.random() * this.game.width;
        this.y = this.game.height;
        this.speedX = Math.random() * this.maxSpeed * direction; // Faster speedX
        this.speedY = -((Math.random() + 1) / 2) * this.maxSpeed; // Faster and only negative speedY
        break;
      case 3: // Left
        this.x = -this.width;
        this.y = Math.random() * this.game.height;
        this.speedX = ((Math.random() + 1) / 2) * this.maxSpeed;
        this.speedY = Math.random() * this.maxSpeed * direction;
        break;
      default:
        break;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(context) {
    context.fillStyle = "gray";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
