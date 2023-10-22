import GameElement from "./gameElement"
import arc from "./assets/images/arc.png"
import Fleche from "./fleche";

export default class Arc extends GameElement {
    static ARR_MAX = 5;

    #nbArrows;
    #fleches;
    #nbVie;

    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} deltaY 
     */
    constructor(x, y, deltaX = 0, deltaY = 0) {
        super(x, y, deltaX, deltaY, arc);
        this.#nbArrows = Arc.ARR_MAX - 1;
        this.#fleches = [];
        this.refill();
        this.#nbVie = 3;
    }

    /** add 5 arrows on the bow 
     * 
     */
    refill() {
        document.getElementById("nbArrows").innerHTML = 5;
        this.#nbArrows = 4;
        for (let i = 0; i < Arc.ARR_MAX; i++) {
            this.#fleches.push(new Fleche(0, 0));
        }
    }

    /** move the bow 
     * 
     * @param {*} canvas 
     */
    move(canvas) {
        this.X = Math.max(0, Math.min(canvas.width - this.Width, this.X + this.DeltaX));
        this.Y = Math.max(0, Math.min(canvas.height - this.Height, this.Y + this.DeltaY));
    }

    /** move the bow in left direction 
     * 
     */
    moveLeft() {
        this.DeltaX = this.DeltaX - 10;   // le déplacement se fera vers la gauche, par pas de 10px
    }
    /** move the bow in right direction 
     * 
     */
    moveRight() {
        this.DeltaX = this.DeltaX + 10;   // le déplacement se fera vers la droite, par pas de 10px
    }
    /** move the bow in up direction 
     * 
     */
    moveUp() {
        if (this.Y > 110) {
            this.DeltaY = this.DeltaX - 10;
        }
    }
    /** move the bow in down direction 
     * 
     */
    moveDown() {
        this.DeltaY = this.DeltaX + 10;
    }
    /** when you dont move
     * 
     */
    stopMoving() {
        this.DeltaX = 0;
        this.DeltaY = 0;
    }

    /** throw an arrow
     * 
     */
    throwArr() {
        if (this.#nbArrows >= 0) {
            let currentArrow = this.#fleches[this.#fleches.length - 1]
            currentArrow.X = this.X + 40;
            currentArrow.Y = this.Y - this.Height;
            currentArrow.setThrow(true);
            document.getElementById("nbArrows").innerHTML = this.#nbArrows--;
        }
        else {
            this.#fleches = [];
            document.getElementById("nbArrows").innerHTML = 0;
        }

    }

    /** action when you press a key
     * 
     * @param {*} keyManager 
     */
    handleMoveKeys(keyManager) {
        this.stopMoving();    // on réinitialise les déplacements
        if (keyManager.left)  // touche flèche gauche pressée ?
            this.moveLeft();
        if (keyManager.right) // touche flèche droite pressée ?
            this.moveRight();
        if (keyManager.up)
            this.moveUp();
        if (keyManager.down)
            this.moveDown();
        if (keyManager.space)
            this.throwArr();
    }

    get NbArrows() {
        return this.#nbArrows;
    }

    setNbArrows(nb) {
        this.#nbArrows = nb;
    }
    get fleches() {
        return this.#fleches;
    }
    setFleches(val) {
        this.#fleches = val;
    }

    get nbVie() {
        return this.#nbVie;
    }
    set nbVie(val) {
        this.#nbVie = val;
    }
}