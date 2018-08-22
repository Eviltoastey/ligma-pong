/// <reference path="bat.ts"/>

class Enemy extends Bat
{
    prediction_frames:number = 150;
    player_two:boolean = false;

    constructor()
    {
        super(Game.canvas.width - 50, Game.canvas.height / 2);

        if(MainGame.mutator.getSettings().hard_mode)
            this.prediction_frames = 50000;
    }

    update()
    {
        let ball:Ball = null;
        let dist:number = 0;

        for(let i = 0; i < Game.instance.activeScene.all_objects.length; i++)
        {
            let obj:GameObject = Game.instance.activeScene.all_objects[i];

            if(obj instanceof Ball)
            {
                let cball = obj as Ball;

                if(cball.velocity.x > 0)
                {
                    if(cball.position.x > dist)
                    {
                        dist = cball.position.x;
                        ball = cball;
                    }
                }
            }
        }

        if(ball == null)
        {
            dist = 1000;

            for(let i = 0; i < Game.instance.activeScene.all_objects.length; i++)
            {
                let obj:GameObject = Game.instance.activeScene.all_objects[i];
    
                if(obj instanceof Ball)
                {
                    let cball = obj as Ball;
    
                    if(cball.velocity.x < 0)
                    {
                        if(cball.position.x < dist)
                        {
                            dist = cball.position.x;
                            ball = cball;
                        }
                    }
                }
            }
        }

        if(InputManager.isPressed(32))
        {
            this.player_two = true;
            console.log('player 2 has joined!');
        }

        if(this.player_two == true)
        {
            if(InputManager.isHeld(38))
            {
                this.moveUp();
            }
    
            if(InputManager.isHeld(40))
            {
                this.moveDown();
            }
        }
        else
        {
            Game.drawText(new Vector(Game.canvas.width /2 - 200, Game.canvas.height - 10 ), "rgb(0,0,0)", "20px Arial", "50", "Press spacebar to activate 2 player mode")   

            let sBall = {position: ball.position.getCopy(), velocity: ball.velocity.getCopy()};
        
            for(let i = 0; i < this.prediction_frames; i++)
            {
                sBall.position = sBall.position.add(sBall.velocity);
    
                if(sBall.position.x >= Game.canvas.width)
                {
                    sBall.velocity.x *= -1
                }
    
                if(sBall.position.x <= 0)
                {
                    sBall.velocity.x *= -1
                }
    
                if(sBall.position.y >= Game.canvas.height)
                {
                    sBall.velocity.y *= -1
                }
    
                if(sBall.position.y <= 0)
                {
                    sBall.velocity.y *= -1
                }
                
                if(MainGame.mutator.getSettings().see_enemy)
                    Game.drawText(sBall.position, "rgb(0,0,0)", "10px Arial", "1", ".")

                if(sBall.position.x >= this.position.x)
                    break;
            }
    
            if(sBall.position.y >= this.position.y + (this.sprite.image.height / 2))
            {
                this.moveDown();
            }
    
            if(sBall.position.y <= this.position.y - (this.sprite.image.height / 2))
            {
                this.moveUp();
            }
        }


        super.update();
    }
}