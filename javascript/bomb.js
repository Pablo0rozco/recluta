class Bomb {
    constructor() {
        this.x = canvas.width;
        this.y = 240;
        this.w = 15;
        this.h = 15;
        this.img = new Image();
        this.img.src = "./images/bomb.png"
        this.speed = 1;
    }

    // Dibujar la bomba
    drawBomb = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)        
    }

    // Hacer que la bomba se mueva hacia el recluta
    moveBomb = () => {
        this.x = this.x - this.speed;        
    }
}