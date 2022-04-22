
// PASO 2 crear la clase para el juego // todos los elementos que visualizaremos en el canvas
// 2.0 linkear este archivo JS al HTML
//console.log("probando desde game.js")
class Game {
  constructor() {
    // 2.1 primer elemento de mi canvas, el fondo:
    this.bg = new Image();
    this.bg.src = "./images/background.jpg"
    this.recluta = new Recluta()
  }

    // aqui dentro tendremos todos los METODOS que regulan nuestro juego
    // 2.2 METODO LOOP DEL JUEGO
  gameLoop = () => {
    console.log("juego andando")

    // 2.2.1 Borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    //2.2.2 acciones o movimientos


    //2.2.3 dibujar elementos
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.recluta.img, this.recluta.x, this.recluta.y, this.recluta.w, this.recluta.h)

    //2.2.4 control y recursividad
    requestAnimationFrame(this.gameLoop)
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
  