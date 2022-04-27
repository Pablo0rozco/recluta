class Bomb {
  constructor() {
    this.x = canvas.width;
    this.y = 240;
    this.w = 15;
    this.h = 15;
    this.img = new Image();
    this.img.src = "./images/bomb.png";
    this.speed = 3;
  }

  drawBomb = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  moveBomb = () => {
    this.x = this.x - this.speed;
  };
}
