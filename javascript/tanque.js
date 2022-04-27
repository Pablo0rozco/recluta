class Tanque {
    constructor(xParam) {
      this.x = xParam;
      this.y = 160;
      this.w = 150;
      this.h = 110;
      this.img = new Image();
      this.img.src = "./images/tanque.png";
      this.speed = 2;
    }
   
    drawTanque = () => {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
  
    moveTanque = () => {
      this.x = this.x - this.speed;
    };
  }