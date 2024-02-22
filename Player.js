export default class Player{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx){
        let image = new Image();
        image.src = "player.png";
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
}