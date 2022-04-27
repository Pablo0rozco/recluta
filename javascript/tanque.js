class Tanque {
    constructor(xParam) {
      this.x = xParam;
      this.y = 175;
      this.w = 120;
      this.h = 130;
      this.img = new Image();
      this.img.src = "./images/tanque.png";
      this.speed = 1;
    }
   
    drawTanque = () => {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
  
    moveTanque = () => {
      this.x = this.x - this.speed;
    };
  }