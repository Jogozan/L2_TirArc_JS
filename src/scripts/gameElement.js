export default class GameElement {

    #x;
    #y;
    #deltaX;
    #deltaY;
    #img;

    /** Constructor of the class
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} deltaX 
     * @param {*} deltaY 
     * @param {*} cheminImg 
     */
    constructor(x, y, deltaX = 0, deltaY = 0, cheminImg) {
        this.#x = x;
        this.#y = y;
        this.#deltaX = deltaX;
        this.#deltaY = deltaY;
        this.#img = this._createImage(cheminImg);
    }

    /** check if the object id in collision with an object
     * 
     * @param {*} obj 
     * @returns 
     */
    collisionWith(obj) {
        if (this.X < obj.X + obj.Width &&
            this.X + this.Width > obj.X &&
            this.Y < obj.Y + obj.Height &&
            this.Height + this.Y > obj.Y) {
            return true;
        } else {
            return false;
        }
    }

    /** draw the object in the canvas
     * 
     * @param {*} context 
     */
    draw(context) {
        context.drawImage(this.Img, this.X, this.Y);
    }

    /** create the image with the road of the file
     * 
     * @param {*} imageSource 
     * @returns 
     */
    _createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    /** move the object
     * 
     * @param {*} canvas 
     */
    move(canvas) {
        let newX = this.X + this.DeltaX;
        let newY = this.Y + this.DeltaY;
        if ((newX < 0) || (newX > canvas.width - this.Width)) {
            this.DeltaX = -this.DeltaX;
        }
        if ((newY < 0) || (newY > canvas.height - this.Height)) {
            this.DeltaY = -this.DeltaY;
        }
        this.X += this.DeltaX;
        this.Y += this.DeltaY;
    }

    //getters
    get X() {
        return this.#x;
    }

    get Y() {
        return this.#y;
    }

    get DeltaX() {
        return this.#deltaX;
    }

    get DeltaY() {
        return this.#deltaY;
    }

    get Img() {
        return this.#img;
    }

    get Width() {
        return this.#img.width;
    }
    get Height() {
        return this.#img.height;
    }

    // Setters
    set X(value) {
        this.#x = value;
    }

    set Y(value) {
        this.#y = value;
    }

    set DeltaX(value) {
        this.#deltaX = value;
    }

    set DeltaY(value) {
        this.#deltaY = value;
    }

    set Img(value) {
        this.#img = value;
    }
}