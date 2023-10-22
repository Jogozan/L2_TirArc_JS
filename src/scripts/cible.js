// importations des classes
import GameElement from "./gameElement";
import cible from "./assets/images/cible.png";

export default class Cible extends GameElement {

    static NB_POINTS = 1000;

    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} deltaY 
     */
    constructor(x, y = 0, deltaX = 0, deltaY = 0) {
        super(x, y, deltaX, deltaY, cible);
    }


    /** set up the new position of the target
     * 
     * @param {*} canvas 
     */
    newPos(canvas) {
        this.X = Math.floor(Math.random() * (canvas.width - 64));
    }

}