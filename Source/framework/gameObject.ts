/// <reference path="vector.ts"/>

class GameObject
{

    scene:Scene;
    ignoreCollisions:boolean = false;
    destroyed:boolean = false;

    position:Vector = new Vector(0,0);
    sprite:Sprite = null;

    constructor(pos_x:number, pos_y:number, sprite:Sprite) 
    {
        
        this.position.x = pos_x;
        this.position.y = pos_y;

        this.sprite = sprite;

        Game.instance.activeScene.AddObject(this);

    }
    
    update()
    {
        if(!this.destroyed)
        {
            if (InputManager.mousePressed(InputManager.mouse_buttons.Left))
            {
                this.checkClick(true);
            }

            //check for clicks
            if (InputManager.mouseHeld(InputManager.mouse_buttons.Left))
            {
                this.checkClick(false);
            }
        }

        if(!this.ignoreCollisions && !this.destroyed)
        {
            for(let i = 0; i < Game.instance.activeScene.all_objects.length; i++)
            {
                if(Game.instance.activeScene.all_objects[i] != this && !Game.instance.activeScene.all_objects[i].ignoreCollisions)
                {
                    let hit = false;
                    let o2 = Game.instance.activeScene.all_objects[i];
                    
                    //hw = halfWidth, hh = halfHeight
                    let hw = (this.sprite.image.width) / 2;
                    let hh = (this.sprite.image.height) / 2;
                    
                    let ohw = (o2.sprite.image.width) / 2;
                    let ohh = (o2.sprite.image.height) / 2;
                    
                    //CHECK FROM OBJ PERSPECTIVE
                    let p = 
                    [
                        [this.position.x - hw, this.position.y - hh],
                        [this.position.x + hw, this.position.y - hh],
                        [this.position.x - hw, this.position.y + hh],
                        [this.position.x + hw, this.position.y + hh]
                    ];
                    
                    for(let pi = 0; pi < p.length; pi++)
                    {
                        if(p[pi][0] > o2.position.x - ohw && p[pi][0] < o2.position.x + ohw)
                        {
                            if(p[pi][1] > o2.position.y - ohh && p[pi][1] < o2.position.y + ohh)
                            {
                                hit = true;
                            }
                        }
                    }
                    
                    //CHECK FROM OTHER PERSPECTIVE
                    p = 
                    [
                        [o2.position.x - ohw, o2.position.y - ohh],
                        [o2.position.x + ohw, o2.position.y - ohh],
                        [o2.position.x - ohw, o2.position.y + ohh],
                        [o2.position.x + ohw, o2.position.y + ohh]
                    ];
                    
                    for(let pi = 0; pi < p.length; pi++)
                    {
                        if(p[pi][0] > this.position.x - hw && p[pi][0] < this.position.x + hw)
                        {
                            if(p[pi][1] > this.position.y - hh && p[pi][1] < this.position.y + hh)
                            {
                                hit = true;
                            }
                        }
                    }
                    
                    //<DOC> <function> object.onCollision(other)<br><br>Called on object collision. Parameter 'other' is a reference to the object you're colliding with! Override this on your own object templates!
                    if(hit)
                        if (!this.destroyed) { this.onCollision(o2); }
                }
            }
        }
    }

    checkClick(thisFrame)
    {
        let hit:boolean = false;
        let clickPos:Vector = InputManager.mouse_position;
        
        //hw = halfWidth, hh = halfHeight
        let hw:number = this.sprite.image.width / 2;
        let hh:number = this.sprite.image.height / 2;
        
        if(clickPos.x > this.position.x - hw && clickPos.x < this.position.x + hw)
        {
            if(clickPos.y > this.position.y - hh && clickPos.y < this.position.y + hh)
            {
                hit = true;
            }
        }

        if (hit)
        {
            if (thisFrame)
            {
                this.onClick();
            }
            else
            {
                this.onMouseHeld();
            }
        }
    }

    onClick(){}

    onMouseHeld(){}

    onCollision(other_object:GameObject)
    {
        
    }

    destroy()
    {
        Game.instance.activeScene.all_objects.splice(Game.instance.activeScene.all_objects.indexOf(this), 1);
    }

    draw()
    {
        if(this.sprite === null)
            return;

        this.sprite.draw(this.position.x, this.position.y, 0);
    }
}