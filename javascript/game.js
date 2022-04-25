
// PASO 2 crear la clase para el juego // todos los elementos que visualizaremos en el canvas
  // 2.0 linkear este archivo JS al HTML
  //console.log("probando desde game.js")


class Game {

  constructor() {
    // 2.1 primer elemento de mi canvas, el fondo:
    this.bg = new Image();
    this.bg.src = "./images/background.jpg"
    this.recluta = new Recluta()    
    this.terrorista = new Terrorista()
    this.bombArr = [ new Bomb() ];
    this.terroristaArr = [];
    this.isGameOn = true;
    this.balaArr = []
    this.timer = 0;
  }

 
  addNewBalas = (event) => {   
    if (event.code === "Space")
    {this.balaArr.push( new Bala(this.recluta.x + 45, this.recluta.y + 15))}    
  }

  addNewBombs = () => {
    //condicionar cuando aparecen las nuevas bombas
    if (this.bombArr[this.bombArr.length - 1].x < 30) {
      //aparecer
      let newBomb = new Bomb()
      this.bombArr.push(newBomb)
    }
  }  

  gameOverBombCollision = () => {  
  this.bombArr.forEach((eachBomb) => {
    if (this.recluta.x < eachBomb.x + eachBomb.w &&
      this.recluta.x + this.recluta.w > eachBomb.x &&
      this.recluta.y < eachBomb.y + eachBomb.h &&
      this.recluta.h + this.recluta.y > eachBomb.y) {
      // collision detected!
      reclutaDead.play();
      reclutaDead.volume = 0.3;
      this.isGameOn = false;
      canvas.style.display = "none";
      mainMusic.pause();
      mainMusic.currentTime = 0;
      gameOverScreen.style.display = "flex";
      
    } 
  })
      

  }



  

  // 2.2 METODO LOOP DEL JUEGO (dentro todos los métodos que regulan el juego)
  gameLoop = () => {

    //console.log("juego andando")
    this.timer = this.timer 

    // 2.2.1 Borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

     //DIBUJAR LOS ELEMENTOS DEL JUEGO

      //Fondo de la partida -ciudad guerra-
      ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height)

      //RECLUTA
      this.recluta.drawRecluta(); 

      //TERRORISTA 1    
      this.terrorista.drawTerrorista();

      //BOMBA
      this.bombArr.forEach((eachBomb) => {
        eachBomb.drawBomb()
      })

      //BALA
      
      this.balaArr.forEach((eachBala) => {        
        eachBala.drawBala()
      })

      this.balaArr.forEach((eachBala) => {
        eachBala.moveBala()
      })

      

    //MOVIMIENTOS DE LOS ELEMENTOS DEL JUEGO

      //RECLUTA 
      this.recluta.walkRightRecluta()
      this.recluta.gravityRecluta();

      //TERRORISTA1
      //this.terrorista.moveTerrorista();

      //BOMBA
      this.bombArr.forEach((eachBomb) => {
        eachBomb.moveBomb()
      })   

      this.addNewBombs()

      // COLISIONES

      this.gameOverBombCollision()

   

    //2.2.4 control y recursividad
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop)
    }
    
  }
}




