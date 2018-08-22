/// <reference path="spriteLoader.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="inputManager.ts"/>
/// <reference path="scene.ts"/>

class Game
{
    static canvas:Canvas = null;
    static spriteLoader:SpriteLoader = new SpriteLoader();
    
    activeScene:Scene = new Scene();
    private position:Vector = new Vector(0, 0);
    private scale:Vector = new Vector(0, 0);

    static instance:Game; //TODO: MAke proper singleton

    background_color = {
        r: 255,
        g: 255,
        b: 0
    }

    constructor(x:number, y:number, width:number, height:number)
    {
        Game.instance = this;

        this.position = new Vector(x,y);
        this.scale = new Vector(width, height);

        Game.canvas = new Canvas(x,y,width,height);

        InputManager.init();

        var gameContext = this;

        this.gameStart();

        window.setInterval(function()
        {
            gameContext.draw();
            gameContext.update();
        }, 1000 / 60);
    }

    gameStart()
    {

    }
    
    update() 
    {
        InputManager.updateKeys();

        this.activeScene.update();
    }

    draw() 
    {
        Game.canvas.canvasContext.fillStyle = "rgb(" + this.background_color.r + "," + this.background_color.g + "," + this.background_color.b + ")";
        Game.canvas.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);

        this.activeScene.draw();
    }

    static drawText(position:Vector, rgb:string, font:string, width:string = '100', text:string)
    {
        Game.canvas.canvasContext.fillStyle = rgb;
        Game.canvas.canvasContext.font = font;
        let w = Game.canvas.canvasContext.measureText(text).width;

        Game.canvas.canvasContext.fillText(text, position.x, position.y);
    }
}