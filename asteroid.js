// klasa asteroida
export class Asteroid {
  constructor(game, player, maxSpeed) {
    this.game = game;
    this.player = player;
    this.maxSpeed = maxSpeed;
    const size = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    this.width = size;
    this.height = size;
    this.spawnOutsideScreen();
    this.color = this.getRandomGrayColor();
  }

  // funkcija odabir mjesta za spawn asteroida
  spawnOutsideScreen() {
    const spawnSide = Math.floor(Math.random() * 4);
    const direction = Math.random() < 0.5 ? -1 : 1;

    switch (spawnSide) {
      case 0: // vrh
        this.x = Math.random() * this.game.width;
        this.y = -this.height;

        this.speedX = Math.random() * this.maxSpeed * direction; // Faster and only positive speedY
        this.speedY = ((Math.random() + 1) / 2) * this.maxSpeed; // Faster speedX
        break;
      case 1: // desno
        this.x = this.game.width;
        this.y = Math.random() * this.game.height;
        this.speedX = -((Math.random() + 1) / 2) * this.maxSpeed; // Faster and only negative speedX
        this.speedY = Math.random() * this.maxSpeed * direction;
        break;
      case 2: // dolje
        this.x = Math.random() * this.game.width;
        this.y = this.game.height;
        this.speedX = Math.random() * this.maxSpeed * direction; // Faster speedX
        this.speedY = -((Math.random() + 1) / 2) * this.maxSpeed; // Faster and only negative speedY
        break;
      case 3: // lijevo
        this.x = -this.width;
        this.y = Math.random() * this.game.height;
        this.speedX = ((Math.random() + 1) / 2) * this.maxSpeed;
        this.speedY = Math.random() * this.maxSpeed * direction;
        break;
      default:
        break;
    }
  }

  // funkcija za odabir boje asteroida
  getRandomGrayColor() {
    const randomShade = Math.floor(Math.random() * 128) + 70;
    return `rgb(${randomShade}, ${randomShade}, ${randomShade})`;
  }

  // funkcija za micanje asteroida
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // funkcija za crtanje asteroida
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
