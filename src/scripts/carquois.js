import GameElement from "./gameElement";
import img from "./assets/images/fleches.png";

export default class Carquois extends GameElement {


    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} deltaY 
     */
    constructor(x, y, deltaX = 0, deltaY = 0) {
        super(x, y, deltaX, deltaY, img);

        this.randomAppearance();
    }

    /** set up the random appearance of the keyver
     * 
     */
    randomAppearance() {
        const setRandomAppearance = () => { // chance de 0,5 d'apparition
            if (Math.random() < 0.5) {
                this.newPos();
            }
            setTimeout(setRandomAppearance, 1500);
        };
        setTimeout(setRandomAppearance, 1500);
    }

    /** set up the new position of the keyver
     * 
     */
    newPos() {
        this.X = Math.floor(Math.random() * 470);
        this.Y = Math.floor(Math.random() * 300) + 100;
    }
}