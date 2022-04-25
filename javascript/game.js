
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
      console.log("colisionando")   
      this.isGameOn = false;
      canvas.style.display = "none";
      mainMusic.pause();
      mainMusic.currentTime = 0;
      gameOverScreen.style.display = "block";
      
    } 
  })
      

  }



  

  // 2.2 METODO LOOP DEL JUEGO (dentro todos los métodos que regulan el juego)
  gameLoop = () => {

    //console.log("juego andando")

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







// class Game {
//     constructor() {
//       // todas nuestras propiedades del juego
//       // empezamos con el fondo del canvas
//       this.bg = new Image();
//       this.bg.src = "./images/bg.png"; // quiza lo modifiquemos
//       this.pollo = new Pollo();
//       this.pipeArr = [new Pipe(0, "./images/obstacle_top.png")];
//       this.isGameOn = true;
//     }
  
//     gameOverCollision = () => {
//       // de cada pipe, checkear si colisiona con el pollo
  
//       this.pipeArr.forEach((eachPipe) => {
//         if (
//           this.pollo.x < eachPipe.x + eachPipe.w &&
//           this.pollo.x + this.pollo.w > eachPipe.x &&
//           this.pollo.y < eachPipe.y + eachPipe.h &&
//           this.pollo.h + this.pollo.y > eachPipe.y
//         ) {
//             console.log("PRUEBA POLLITO")
//           // collision detected!
//           // finalizar el juego
//           //1. el juego se detiene
//           this.isGameOn = false;
//           //2. el canvas desparece
//           canvas.style.display = "none";
//           // 3. la pantalla final aparece
//           gameOverScreen.style.display = "flex";
//           this.color("green");
//         } 
//       });
//     };
  
//     addNewPipes = () => {
//       // condicionar cuando aparecen los nuevos pipes
//       // let newPipe = new Pipe()
//       // this.pipeArr.push(newPipe)
//       // console.log(this.pipeArr[0])
//       if (this.pipeArr[this.pipeArr.length - 1].x < 400) {
//         // aparecer
  
//         let randomPositionChange = Math.random() * -90;
  
//         // este es el pipe de arriba
//         let newPipe = new Pipe(randomPositionChange, "./images/obstacle_top.png");
//         this.pipeArr.push(newPipe);
  
//         // este es el pipe de abajo
//         let newPipeDown = new Pipe(
//           randomPositionChange + 375,
//           "./images/obstacle_bottom.png"
//         );
//         this.pipeArr.push(newPipeDown);
//       }
  
//       // IMPORTANTE, NO OLVIDARNOS DE REMOVER LOS PIPES
//     };
  
//     // todos los metodos que regulan este juego
  
//     gameLoop = () => {
//       console.log("Juego andando");
  
//       // 1. borrar el canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//       // 2. acciones o movimiento de los elementos
//       this.pollo.gravityPollo();
//       this.pipeArr.forEach((eachPipe) => {
//         eachPipe.movePipe();
//       });
  
//       this.gameOverCollision();
//       this.addNewPipes();
  
//       // 3. dibujar los elementos
//       ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
//       this.pollo.drawPollo();
  
//       this.pipeArr.forEach((eachPipe) => {
//         eachPipe.drawPipe();
//       });
  
//       // 4. control y recursividad
//       if (this.isGameOn) {
//         requestAnimationFrame(this.gameLoop);
//       }
//     };
//   }
  