// PASO 3 

class Recluta {

  constructor() {
    this.x = 80;
    this.y = 190;
    this.w = 50;
    this.h = 65;
    this.img = new Image()
    this.img.src = "./images/recluta1.png"
    this.speedRight = 0;
    this.jumpHeight = 100; 
    this.ground = 190;
    this.gravitySpeed = 1;
  }

  // MÉTODOS DEL RECLUTA

  // Dibujarlo en la posición elegida
  drawRecluta = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }

  // Hacer que se desplace a través del eje X hacia la derecha
  walkRightRecluta = () => {
    this.x = this.x + this.speedRight; 
    console.log(this.y)   
  }

  // Hacer que salte una cantidad de pixels determinada
  jumpRecluta = (event) => {
    if (event.code === "ControlLeft" && this.y === this.ground) {
      this.y = this.y - this.jumpHeight;
    }            
  } 

  // Darle gravedad para cuando salte vuelva al suelo
  gravityRecluta = () => {        
    if (this.y < this.ground)
    this.y = this.y + this.gravitySpeed;
  } 

  
}
