//------------- // * GLOBAL VARIABLES
const cajaInput = document.querySelector("#cajainput");
const buton = document.querySelector("#boton-alistarse");
const spanRecluta = document.querySelector("#reclutaPalabra")
const startBtn = document.querySelector("#start-btn"); // acceder botón START--->DOM
const restartBtn = document.querySelector("#restart-btn");
const startScreen = document.querySelector("#splash-screen");
const gameOverScreen = document.querySelector("#gameover-screen");
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
let game;
let mainMusic = new Audio("./sounds/musicajuego3.mp3");
let reclutaDead = new Audio("./sounds/reclutamuerte.mp3");
let readyMusic = new Audio("./sounds/allteamready.wav");
let disparoSound = new Audio("./sounds/disparo.mp3");
let terroristaMuerto = new Audio("./sounds/terroristamuriendo.mp3");

//------------ // * STATE MANAGEMENT FUNCTIONS

const startGame = () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  mainMusic.preload = "auto";
  reclutaDead.preload = "auto";
  mainMusic.play();
  mainMusic.volume = 0.1;
  readyMusic.preload = "auto";
  readyMusic.play();
  readyMusic.volume = 0.1;
  gameOverScreen.style.display = "none";
  game = new Game();
  game.gameLoop();
};

//----------------// * ADD EVENT LISTENERS

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

window.addEventListener("keydown", (event) => {
  game.recluta.jumpRecluta(event);
});

window.addEventListener("keydown", (event) => {
  game.addNewBalas(event);
});

window.addEventListener("keydown", (event) => {
  game.recluta.moveRight(event);
});

window.addEventListener("keydown", (event) => {
  game.recluta.moveLeft(event);
});




buton.addEventListener("click", () => {
  let nombreIntroducido = cajaInput.value
  spanRecluta.innerText = nombreIntroducido  
});





