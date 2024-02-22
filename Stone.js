export default class Stone{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 2;
    }
    draw(ctx){
        let image = new Image();
        image.src = "enemy.png";
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
        this.update();
    }
    update(){
        this.y += this.speed;
    }
}