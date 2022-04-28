class Game {
  constructor() {
    this.isGameOn = true; // booleano para apagar encender juego
    this.bg = new Image();
    this.bg.src = "./images/background.jpg";

    this.recluta = new Recluta(); // no es un array porque solo es uno, todo el rato el mismo

    this.bombArr = [new Bomb(2)]; // array con un nuevo objeto de la clase Bomb
    this.bombJumped = 0; // contador bombas saltadas

    this.timer = 0; // todavía no lo estoy usando

    this.balaArr = [new Bala()]; // array con nuvo objeto de la clase Bala
    this.countBalas = 0; // contador balas in game
    this.maxBalas = 2; // evitar balas infinitas en ráfaga

    this.terroristaArr = [new Terrorista(canvas.width + 300)]; // array con un nuevo objeto de la clase Terrorista con parámetro X
    this.countTerrorist = 1; // terroristas in game, empieza en uno (array)
    this.maxTerrorist = 3; // max terrorist in game
    this.countDeadTerrorist = 0; // contador de terrorista muerto

    this.contadorScore = 0; // contado de dinero

    this.tanqueArr = [new Tanque(canvas.width + 400)];
    this.countTanque = 1;
    this.maxTanques = 2;
    this.countDeadTanques = 0;

    this.segundoImpacto = false;
  }

  //-----AÑADIR/QUITAR ELEMENTOS

  //BOMBAS
  addNewBombs = () => {
    //condicionar cuando aparecen las nuevas bombas
    if (this.bombArr[this.bombArr.length - 1].x < -1) {
      //aparecer
      let speedParam = Math.floor(Math.random() * 4 + 2);
      let newBomb = new Bomb(speedParam);
      this.bombArr.push(newBomb);
    }
  };

  deleteBombs = () => {
    this.bombArr.forEach((eachBomb, ib) => {
      if (eachBomb.x < 0) {
        this.bombArr.splice(ib, 1);
      }
    });
  };

  //TERRORISTAS
  addNewTerroristas = () => {
    //condicionar cuando aparecen los nuevos
    if (this.countTerrorist < this.maxTerrorist) {
      //aparecer
      let speedParam = Math.floor(Math.random() * 4 + 2);
      let newTerrorista = new Terrorista((canvas.width + 30 * this.countTerrorist), speedParam); //parametro aparicion nuevo terrorista
      this.terroristaArr.push(newTerrorista);
      this.countTerrorist++;
    }
  };

  //BALAS
  addNewBalas = (event) => {
    if (event.code === "Space" && this.countBalas < this.maxBalas) {
      this.balaArr.push(new Bala(this.recluta.x + 45, this.recluta.y + 15)); // parametro de aparicion de nueva bala punta del arma
      disparoSound.play();
      disparoSound.currentTime = 0;
      disparoSound.volume = 0.01;
      this.countBalas++;
    }
  };

  //TANQUES
  addNewTanques = () => {
    if (this.countTanque < this.maxTanques || this.tanqueArr.length === 0) {
      let newTanque = new Tanque(canvas.width + 500);
      this.tanqueArr.push(newTanque);
      this.countTanque++;
    }
  };

  //--------CONTADORES

  //BOMBA
  contadorBombaSaltada = () => {
    this.bombArr.forEach((eachBomb) => {
      if (eachBomb.x < 0) {
        this.bombJumped++;
        this.contadorScore = this.contadorScore + 5;
      }
    });
  };

  //---------COLISIONES

  // BOMBA
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

  // TERRORISTA
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
    });
  };

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
      });
    });
  };

  // TANQUE
  gameOverTanqueCollision = () => {
    this.tanqueArr.forEach((eachTanque) => {
      if (
        this.recluta.x < eachTanque.x + eachTanque.w &&
        this.recluta.x + this.recluta.w > eachTanque.x &&
        this.recluta.y < eachTanque.y + eachTanque.h &&
        this.recluta.h + this.recluta.y > eachTanque.y
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


  balaTanqueCollision = () => {
    this.balaArr.forEach((eachBala, ib) => {
      this.tanqueArr.forEach((eachTanque, it) => {
        if (this.segundoImpacto === false && 
          eachBala.x < eachTanque.x + eachTanque.w &&
          eachBala.x + eachBala.w > eachTanque.x &&
          eachBala.y < eachTanque.y + eachTanque.h &&
          eachBala.h + eachBala.y > eachTanque.y) {
            this.balaArr.splice(ib, 1); // remover la bala del array
            this.segundoImpacto = true
            this.countBalas--; // restar el contador de balas in game 
          } else if (this.segundoImpacto === true && 
            eachBala.x < eachTanque.x + eachTanque.w &&
            eachBala.x + eachBala.w > eachTanque.x &&
            eachBala.y < eachTanque.y + eachTanque.h &&
            eachBala.h + eachBala.y > eachTanque.y) {
              this.balaArr.splice(ib, 1);
              this.tanqueArr.splice(it, 1); //remover el tanque del array
              this.segundoImpacto = false;
              this.countBalas--; // restar el contador de balas in game
              this.countTanques--; // restar el contador de tanques activos in game
              this.countDeadTanques++; //contar los tanques muertos
              this.contadorScore = this.contadorScore + 100;
            }
      })
    })
  }



  //-------GAMELOOP---------------//

  gameLoop = () => {
    //Borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-----DIBUJAR LOS ELEMENTOS DEL JUEGO

    //FONDO
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);

    //RECLUTA
    this.recluta.drawRecluta();

    //BOMBA
    this.bombArr.forEach((eachBomb) => {
      eachBomb.drawBomb();
    });

    this.deleteBombs();

    //TERRORISTA
    this.terroristaArr.forEach((eachTerrorista) => {
      eachTerrorista.drawTerrorista();
    });

    //BALA
    this.balaArr.forEach((eachBala) => {
      eachBala.drawBala();
    });

    // TANQUE
    this.tanqueArr.forEach((eachTanque) => {
      eachTanque.drawTanque();
    });

    //---------MOVIMIENTOS DE LOS ELEMENTOS DEL JUEGO

    //RECLUTA
    this.recluta.gravityRecluta();

    //BOMBA
    this.bombArr.forEach((eachBomb) => {
      eachBomb.moveBomb();
    });

    this.addNewBombs();

    this.contadorBombaSaltada();

    //TERRORISTA
    this.terroristaArr.forEach((eachTerrorista) => {
      eachTerrorista.moveTerrorista();
    });
    this.addNewTerroristas();

    //BALA
    this.balaArr.forEach((eachBala) => {
      eachBala.moveBala();
    });

    //TANQUE
    this.tanqueArr.forEach((eachTanque) => {
      eachTanque.moveTanque();
    });
    this.addNewTanques();

    //DOM CONTADORES
    document.getElementById("contador-dinero-ganado").innerHTML =
      this.contadorScore + "$";
    document.getElementById("contador-terroristas-muertos").innerHTML =
      this.countDeadTerrorist;
    document.getElementById("contador-bombas-saltadas").innerHTML =
      this.bombJumped;
    document.getElementById("contador-tanques-destruidos").innerHTML = this.countDeadTanques;

    // COLISIONES
    this.gameOverBombCollision();
    this.gameOverTerroristaCollision();
    this.balaTerroristaCollision();
    this.gameOverTanqueCollision();
    this.balaTanqueCollision();

    //2.2.4 control y recursividad
    if (this.isGameOn) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
