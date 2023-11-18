// klasa igraca
export class Player {
  constructor(game, speed) {
    this.game = game;
    this.width = 30;
    this.height = 30;
    this.x = game.width / 2 - this.width / 2;
    this.y = game.height / 2 - this.height / 2;
    this.speed = speed;
  }

  // funkcija za micanje igraca (moguce kretanje strelicama ili WASD tipkama)
  update(keys) {
    if ((keys.ArrowUp || keys.w) && this.y > 0) {
      this.y -= this.speed;
    }
    if ((keys.ArrowDown || keys.s) && this.y < this.game.height - this.height) {
      this.y += this.speed;
    }
    if ((keys.ArrowLeft || keys.a) && this.x > 0) {
      this.x -= this.speed;
    }
    if ((keys.ArrowRight || keys.d) && this.x < this.game.width - this.width) {
      this.x += this.speed;
    }
  }

  // funkcija za crtanje igraca
  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  // funkcija za resetiranje igraca
  reset() {
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;
  }
}
