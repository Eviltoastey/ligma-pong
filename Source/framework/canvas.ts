class Canvas 
{
    elementID:string = "GameBuilder_Window";
    windowElement = null;
    canvas = null;
    canvasContext = null;

    x:number = 0
    y:number = 0

    width:number = 0;
    height:number = 0;

    constructor(x:number, y:number, width:number, height:number)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
   
        let body = document.body;

		body.insertAdjacentHTML('beforeend', '<canvas id="' + this.elementID + '" style="position: absolute; left: ' + this.x + 'px; top: ' + this.y + 'px; border: 1px solid black;" width="' + this.width + '" height="' + this.height + '"></canvas>');
		
		//$("body").append('<div id="' + GameWindow.elementID + '" style="position: absolute; left: ' + x + 'px; top: ' + y + 'px; width: ' + GameWindow.width + 'px; height: ' + GameWindow.height + 'px; overflow: hidden; border: 1px solid black;"></div>');
		this.windowElement = document.getElementById(this.elementID);
		
		//<DOC> <parameter> GameWindow.canvas <br><br> The game's canvas element
		this.canvas = document.getElementById(this.elementID);
		
		//<DOC> <parameter> GameWindow.canvasContext <br><br>The game's canvasContext. Use this for drawing.
		this.canvasContext = this.canvas.getContext('2d');
    }
}