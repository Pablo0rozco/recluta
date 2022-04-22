//------------- // * GLOBAL VARIABLES
console.log("probandooo") // PASO 0: comprobamos Conexion

// // necesitamos acceder al boton de inicio START! PASO 1
const startBtn = document.querySelector("#start-btn"); //1.1 acceder al botón START ---> DOM
const startScreen = document.querySelector("#splash-screen"); // 1.2 acceder pantalla inicial ---> DOM
const canvas = document.querySelector("#my-canvas"); // 1.4.2 accdemos al canvas DOM
const ctx = canvas.getContext("2d"); // conectado a 2.2.1 borrar canvas, primero necesitamos esto

// const restartBtn = document.querySelector("#restart-btn");

// // necesitamos acceder a la pantalla inicial splash-screen es el termino habitual para pantalla de inicio
// 
// const gameOverScreen = document.querySelector("#gameover-screen");

// // acceder al DOM canvas




// let game;

//------------ // * STATE MANAGEMENT FUNCTIONS

// 1.4 hacer funcionalidad de que al apretar START! se escondan el resto de elementos
const startGame = () => {
  console.log("iniciando juego");
  startScreen.style.display = "none"; //1.4.1 
  canvas.style.display = "block"; //1.4.3
  // gameOverScreen.style.display = "none";

  

  let game = new Game();
  game.gameLoop()
  // game.gameLoop();
};

// const keyPress = (event) => {
//   if (event.code === "Space") {
//     console.log("apretando boton space");
//     // como ejecutamos el metodo del pollo jumpPollo
//     game.pollo.jumpPollo();
//   }
// };

//----------------// * ADD EVENT LISTENERS

// //1.1 agregamos un add event listener
startBtn.addEventListener("click", startGame); // 1.3 implementamos la funcionalidad del botón START. Primero declaramos la funcion y luego más arriba la creamos.
// restartBtn.addEventListener("click", startGame);
// window.addEventListener("keydown", keyPress);
