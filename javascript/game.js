class Game {
  constructor() {
    this.bg = new Image();
    this.bg.src = "./images/background.jpg";
    this.recluta = new Recluta(); // no es un array porque solo es uno, todo el rato el mismo
    this.bombArr = [new Bomb()]; // array con un nuevo objeto de la clase Bomb
    this.terroristaArr = [new Terrorista(canvas.width + 300)]; // array con un nuevo objeto de la clase Terrorista con parámetro X        
    this.balaArr = [new Bala()]; // array con nuvo objeto de la clase Bala
    this.timer = 0; // todavía no lo estoy usando
    this.isGameOn = true; // booleano para apagar encender juego
    this.bombJumped = 0; // contador bombas saltadas
    this.countTerrorist = 1; // terroristas in game, empieza en uno (array)
    this.maxTerrorist = 2; // max terrorist in game
    this.countBalas = 0; // contador balas in game
    this.maxBalas = 3; // evitar balas infinitas en ráfaga
    this.countDeadTerrorist = 0; // contador de terrorista muerto
    this.contadorScore = 0; // contado de dinero
    
  }

  // FUNCIONES AÑADIR/QUITAR ELEMENTOS

    //--------BALAS

    addNewBalas = (event) => {
      if (event.code === "Space" && this.countBalas < this.maxBalas) {
        this.balaArr.push(new Bala(this.recluta.x + 45, this.recluta.y + 15)); // parametro de aparicion de nueva bala punta del arma
        disparoSound.play();
        disparoSound.currentTime = 0;
        disparoSound.volume = 0.01;
        this.countBalas++;
      }
    };

    // las balas desaparecen dentro de la función de colisión

    //--------BOMBAS

    addNewBombs = () => {
      //condicionar cuando aparecen las nuevas bombas
      if (this.bombArr[this.bombArr.length - 1].x < -1) {
        //aparecer
        let newBomb = new Bomb();
        this.bombArr.push(newBomb);
      }
    };

    deleteBombs = () => {
      this.bombArr.forEach((eachBomb, ib) => {
        if (eachBomb.x < 0) {
          this.bombArr.splice(ib, 1)
        }
      })
    }

    //-------TERRORISTAS

    addNewTerroristas = () => {
      //condicionar cuando aparecen los nuevos
      if (this.countTerrorist < this.maxTerrorist) {
        //aparecer
        let newTerrorista = new Terrorista(canvas.width + 30 * this.countTerrorist); //parametro aparicion nuevo terrorista
        this.terroristaArr.push(newTerrorista);
        this.countTerrorist++;
      }
    };

  //--------CONTADORES
    
   

    contadorBombaSaltada = () => {
      this.bombArr.forEach((eachBomb) => {
        if (eachBomb.x < 0) {
          this.bombJumped++;  
          this.contadorScore = this.contadorScore + 5;      
        }
      });
    };

  //---------COLISIONES 

    gameOverBombCollision = () => {
      this.bombArr.forEach((eachBomb) => {
        if (
          this.recluta.x < eachBomb.x + eachBomb.w &&
          this.recluta.x + this.recluta.w > eachBomb.x &&
          this.recluta.y < eachBomb.y + eachBomb.h &&
          this.recluta.h + this.recluta.y > eachBomb.y
        ) {
          // collision detected!
          reclutaDead.play();
          reclutaDead.volume = 0.3;
          this.isGameOn = false;
          canvas.style.display = "none";
          mainMusic.pause();
          mainMusic.currentTime = 0;
          gameOverScreen.style.display = "flex";
        }
      });
    };

    gameOverTerroristaCollision = () => {
      this.terroristaArr.forEach((eachTerrorista) => {
        if (
          this.recluta.x < eachTerrorista.x + eachTerrorista.w &&
          this.recluta.x + this.recluta.w > eachTerrorista.x &&
          this.recluta.y < eachTerrorista.y + eachTerrorista.h &&
          this.recluta.h + this.recluta.y > eachTerrorista.y
        ) {
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

    balaTerroristaCollision = () => {
      this.balaArr.forEach((eachBala, ib) => {
        this.terroristaArr.forEach((eachTerrorista, it) => {
          if (
            eachBala.x < eachTerrorista.x + eachTerrorista.w &&
            eachBala.x + eachBala.w > eachTerrorista.x &&
            eachBala.y < eachTerrorista.y + eachTerrorista.h &&
            eachBala.h + eachBala.y > eachTerrorista.y
          ) {
            // bala y terrorista desaparezcan
            this.balaArr.splice(ib, 1); // remover la bala del array
            this.terroristaArr.splice(it, 1); //remover el terrorista del array
            this.countTerrorist--; // restar el contador de terroristas activos in game
            this.countBalas--; // restar el contador de balas in game
            this.countDeadTerrorist++; //contar los terroristas muertos
            this.contadorScore = this.contadorScore + 20;
          }
        })
      })
    }




 //-------_GAMELOOP---------------//

  gameLoop = () => {
    

    // 2.2.1 Borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //DIBUJAR LOS ELEMENTOS DEL JUEGO

    //Fondo de la partida
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);

    //RECLUTA
    this.recluta.drawRecluta();

    //TERRORISTA 1
    this.terroristaArr.forEach((eachTerrorista) => {
      eachTerrorista.drawTerrorista();
    });

    //BOMBA
    this.bombArr.forEach((eachBomb) => {
      eachBomb.drawBomb();
    });

    this.deleteBombs();
   

    //BALA

    this.balaArr.forEach((eachBala) => {
      eachBala.drawBala();
    });

    //MOVIMIENTOS DE LOS ELEMENTOS DEL JUEGO

    //RECLUTA
    this.recluta.walkRightRecluta();
    this.recluta.gravityRecluta();

    //TERRORISTA1
    this.terroristaArr.forEach((eachTerrorista) => {
      eachTerrorista.moveTerrorista();
    });

    this.addNewTerroristas();    
    document.getElementById("contador-terroristas-muertos").innerHTML =  this.countDeadTerrorist;

    document.getElementById("contador-dinero-ganado").innerHTML = this.contadorScore + "$";

    //BOMBA
    this.bombArr.forEach((eachBomb) => {
      eachBomb.moveBomb();
    });

    this.addNewBombs();
    this.contadorBombaSaltada();
    document.getElementById("contador-bombas-saltadas").innerHTML =  this.bombJumped;

    //BALA
    this.balaArr.forEach((eachBala) => {
      eachBala.moveBala();
    });

    // COLISIONES
    this.gameOverBombCollision();
    this.gameOverTerroristaCollision();
    this.balaTerroristaCollision();

    //2.2.4 control y recursividad
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
