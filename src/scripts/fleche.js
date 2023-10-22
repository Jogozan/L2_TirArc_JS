import GameElement from "./gameElement";
import fleche from "./assets/images/fleche.png";
import Cible from "./cible";

export default class Fleche extends GameElement {

    #throw;

    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} deltaY 
     */
    constructor(x, y, deltaX = 0, deltaY = -8) {
        super(x, y, deltaX, deltaY, fleche);
        this.#throw = false;

    }


    /**
     * Move the arrow in ordered 
     */
    move() {
        this.Y += this.DeltaY;
    }

    get Throw() {
        return this.#throw;
    }

    setThrow(val) {
        this.#throw = val;
    }


}