export default class Bullet{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 6;
    }
    draw(ctx){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.update();
    }
    update(){
        this.y -= 15;
    }
}