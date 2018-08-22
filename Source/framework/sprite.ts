class Sprite
{
    alpha:number = 1;
    image:HTMLImageElement = null;
    name:string = "undefined image";

    constructor(sprite_name:string)
    {
        let body = document.body;
        body.insertAdjacentHTML('beforeend', '<img id="image" src="img\\' + sprite_name + '" style="display:none;"></img>');
        
        this.image = document.getElementById('image') as HTMLImageElement;
        this.image.id = "loadedImage";

        this.name = sprite_name;
    }

    draw(x:number ,y:number ,rotation:number)
    {
        let context = Game.canvas.canvasContext;
        /*context.save(); 
        let oldAlpha = context.globalAlpha;
        //context.globalAlpha = this.alpha;

        //context.translate(x, y);
        context.rotate(rotation * (Math.PI/180));*/

        context.drawImage(this.image, x - this.image.width / 2, y - this.image.height / 2);
/*
        context.restore(); 
        context.globalAlpha = oldAlpha;*/
    }
}