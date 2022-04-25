class Terrorista {
    constructor() {
        this.x = canvas.width;
        this.y = 205;
        this.w = 75;
        this.h = 75;
        this.img = new Image();
        this.img.src = "./images/terrorista1.png"
        this.speed = 0.8;
    }

    // Dibujar al terrorista
    drawTerrorista = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)        
    }

    //Hacer que el terrorista se mueva hacia el recluta
    moveTerrorista = () => {
        this.x = this.x - this.speed;        
    }
}
  