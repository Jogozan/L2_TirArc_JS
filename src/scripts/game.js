import KeyManager from "../../../tp2/src/scripts/keyManager";
import Arc from "./arc";
import Carquois from "./carquois";
import Cible from "./cible";
import Oiseau from "./oiseau";

export default class Game {

   #canvas;
   #arc;
   #context;
   #cible;
   #animation;
   #keyManager;
   #currentPoint;
   #carquois;
   #isPlaying;
   #oiseaux;


   /** Constructor of the class
    * 
    * @param {*} canvas 
    */
   constructor(canvas) {
      this.#canvas = canvas;
      // creation des objets
      this.#arc = new Arc(210, this.#canvas.height);
      this.#cible = new Cible(Math.floor(Math.random() * (this.#canvas.width - 64)));
      this.#carquois = new Carquois(Math.floor(Math.random() * 470), Math.floor(Math.random() * 400) + 100);
      this.#oiseaux = [];

      let alea1 = Math.floor(Math.random() * 300) + 100;
      let alea2 = Math.floor(Math.random() * 300) + 100;
      let alea3 = Math.floor(Math.random() * 300) + 100;
      this.#oiseaux.push(new Oiseau(-100, alea1, 4, false));
      this.#oiseaux.push(new Oiseau(500, alea2, 4, true));
      this.#oiseaux.push(new Oiseau(500, alea3, 4, true));

      //Attribut pour la gestion du jeu
      this.#currentPoint = 0;
      this.#context = canvas.getContext('2d');
      this.#animation = null;
      this.#keyManager = new KeyManager();
      this.#isPlaying = true;

   }

   /* create the animation, move the ball then make the drawing of the ball in the canvas */
   animate() {
      if (this.#arc.nbVie != 0) {
         this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
         this.#arc.handleMoveKeys(this.#keyManager);
         this.#arc.move(this.#canvas);

         //gestion des oiseaux
         this.#oiseaux.forEach(elem => {

            if (elem.collisionWith(this.#carquois)) {
               this.#carquois.newPos();
            }
            if (elem.collisionWith(this.#arc)) {
               this.#arc.nbVie--;
               elem.newPos();
               this.#currentPoint += Oiseau.NB_POINTS;
               document.getElementById("score").innerHTML = this.#currentPoint;
               const life = document.querySelector("#lifes img:first-child");
               life.remove();

            }
            this.#arc.fleches.forEach(oue => {
               if (oue.Throw) {
                  if (elem.collisionWith(oue)) {
                     this.#arc.fleches.splice(this.#arc.fleches.length - 1, this.#arc.fleches.length);
                     elem.newPos();
                     this.#currentPoint += Oiseau.NB_POINTS;
                     document.getElementById("score").innerHTML = this.#currentPoint;
                  }
               }
            });
            elem.move();
            elem.draw(this.#context);
         });

         //gestion du carquoi donc nombre de point et collision 

         if (this.#arc.collisionWith(this.#carquois)) {
            this.#carquois.newPos();
            this.#arc.refill();
         }


         this.#arc.draw(this.#context);
         this.#carquois.draw(this.#context);


         //gestion des flèches
         this.#arc.fleches.forEach(elem => {
            if (elem.Throw) {
               if (elem.collisionWith(this.#cible)) {
                  this.#cible.newPos(this.#canvas);
                  this.#currentPoint += Cible.NB_POINTS;
                  this.#arc.fleches.splice(this.#arc.fleches.length - 1, this.#arc.fleches.length);
                  document.getElementById("score").innerHTML = this.#currentPoint;
               }
               else if (elem.Y < 0) {
                  this.#arc.fleches.splice(this.#arc.fleches.length - 1, this.#arc.fleches.length);
               }
               else {
                  elem.move(this.#canvas);
                  elem.draw(this.#context);
               }

            }
         });

         this.#cible.draw(this.#context);
         this.#animation = window.requestAnimationFrame(this.animate.bind(this));
      }

      else {
         this.#isPlaying = true;
         alert("Perdu !");
      }

   }



   /** if the button start is pressed launch the game in not pause the game
    * 
    */
   startAndStop() {
      const button = document.getElementById("stopAndStartGame");
      if (this.#isPlaying) {
         cancelAnimationFrame(this.#animation);
         this.#animation = null;
         this.#isPlaying = false;
         button.textContent = "Start";
      } else {
         this.animate();
         this.#isPlaying = true;
         button.textContent = "Stop";
      }
   }

   /** event if a key is pressed down
    * 
    * @param {*} event 
    * @returns 
    */
   keyDownActionHandler(event) {
      switch (event.key) {
         case "ArrowLeft":
         case "Left":
            this.#keyManager.leftPressed();
            break;
         case "ArrowRight":
         case "Right":
            this.#keyManager.rightPressed();
            break;
         case "ArrowUp":
         case "Up":
            this.#keyManager.upPressed();
            break;
         case "ArrowDown":
         case "Down":
            this.#keyManager.downPressed();
            break;

         default: return;
      }
      event.preventDefault();
   }


   /** even if a key is released
    * 
    * @param {*} event 
    * @returns 
    */
   keyUpActionHandler(event) {
      switch (event.key) {
         case "ArrowLeft":
         case "Left":
            this.#keyManager.leftReleased();
            break;
         case "ArrowRight":
         case "Right":
            this.#keyManager.rightReleased();
            break;
         case "ArrowUp":
         case "Up":
            this.#keyManager.upReleased();
            break;
         case "ArrowDown":
         case "Down":
            this.#keyManager.downReleased();
            break;
         case " ":
            if (this.#animation) {
               this.#arc.throwArr();
            }

         default: return;
      }
      event.preventDefault();
   }


   /** donne accès au canvas correspondant à la zone de jeu */
   get canvas() {
      return this.#canvas;
   }
}



