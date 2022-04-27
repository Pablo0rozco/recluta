class Bala {
  constructor(paramX, paramY) {
    this.x = paramX;
    this.y = paramY;
    this.w = 10;
    this.h = 5;
    this.img = new Image();
    this.img.src = "./images/baladorada.png";
    this.speed = 1;
  }

  drawBala = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  moveBala = () => {
    this.x = this.x + 5;
  };
}
