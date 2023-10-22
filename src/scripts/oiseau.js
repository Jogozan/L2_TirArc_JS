import GameElement from "./gameElement";
import img from "./assets/images/oiseau-voleur-droite-gauche.png";
import chemImg2 from "./assets/images/oiseau-voleur-gauche-droite.png";

export default class Oiseau extends GameElement {

    static NB_POINTS = -500;
    #img2;
    #droiteGauche;

    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} dg 
     */
    constructor(x, y, deltaX = 4, dg) {
        super(x, y, deltaX, 0, img);
        this.#img2 = this._createImage(chemImg2);
        this.#droiteGauche = dg;
        this.randomAppearance();

    }

    /**  set up the random appearance of the bird
     * 
     */
    randomAppearance() {
        const setRandomAppearance = () => {
            let newX = this.X + this.DeltaX;

            if ((newX < 0) || (newX > 580 - this.Width)) {
                if (Math.random() < 0.75) {

                    this.newPos();
                }
            }

            setTimeout(setRandomAppearance, 1000);
        };
        setTimeout(setRandomAppearance, 1000);
    }

    /** set up the new position of the target
     * 
     */
    newPos() {
        if (this.#droiteGauche) {
            this.X = 500;
        }
        else {
            this.X = -100;
        }
        this.Y = Math.floor(Math.random() * 300) + 100;
    }

    /** if the bird go from the right to the left set up the deltaX = -4
     * 
     */
    initDelta() {
        if (this.#droiteGauche) {
            this.DeltaX = -4;
        }
    }
    /** move the bird
     * 
     * @param {*} canvas 
     */
    move(canvas) {
        this.initDelta();
        this.X += this.DeltaX;
    }

    /** draw the bird in the canvas 
     * 
     * @param {*} context 
     */
    draw(context) {
        if (this.#droiteGauche) {
            context.drawImage(this.Img, this.X, this.Y);
        }
        else {
            context.drawImage(this.Img2, this.X, this.Y);
        }
    }

    get Img2() {
        return this.#img2;
    }
}