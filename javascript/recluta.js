// PASO 3

class Recluta {
  constructor() {
    this.x = 80;
    this.y = 190;
    this.w = 50;
    this.h = 65;
    this.img = new Image();
    this.img.src = "./images/recluta1.png";
    this.speedRight = 0;
    this.jumpHeight = 70;
    this.ground = 190;
    this.gravitySpeed = 1;
    this.displacementSpeed = 5;
  }

 
  drawRecluta = () => {
    
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };


  walkRightRecluta = () => {
    this.x = this.x + this.speedRight;
    console.log(this.y);
  };

 
  jumpRecluta = (event) => {
    if (event.code === "ControlLeft" && this.y === this.ground) {
      this.y = this.y - this.jumpHeight;
    }
  };

  moveRight = (event) => {
    if (event.code === "ArrowRight") {
      this.x = this.x + this.displacementSpeed;
    }
  };

  moveLeft = (event) => {
    if (event.code === "ArrowLeft") {
      this.x = this.x - this.displacementSpeed;
    }
  };



  
  gravityRecluta = () => {
    if (this.y < this.ground) this.y = this.y + this.gravitySpeed;
  };
}
