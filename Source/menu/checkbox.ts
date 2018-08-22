class Checkbox extends GameObject
{
    private _checked:boolean = false;
    private text:string = "";

    get checked():boolean 
    {
        return this._checked;
    }
    set checked(newStatus:boolean) 
    {
        this._checked = newStatus;

        this.sprite = this._checked? SpriteLoader.check_on : SpriteLoader.check_off;
    }

    constructor(position:Vector, text:string)
    {
        super(position.x, position.y, SpriteLoader.check_off);

        this.text = text;
    }

    onClick()
    {
        this.checked = !this.checked;
    }

    draw()
    {
        super.draw();

        Game.drawText(this.position.add(new Vector(20, 5)), "rgb(0,0,0)", "13px Arial", "not even used", this.text);
    }
}