/// <reference path="batBehaviours/quickBehaviour.ts"/>
/// <reference path="batBehaviours/normalBehaviour.ts"/>
/// <reference path="batBehaviours/slowBehaviour.ts"/>
/// <reference path="batBehaviours/batBehaviour.ts"/>

class Bat extends GameObject
{
    behaviour:BatBehaviour = new NormalBehaviour();

    constructor(x:number,y:number)
    {
        super(x,y, MainGame.mutator.getSettings().bat_sprite);

        if(MainGame.mutator.getSettings().quickBats)
        {
            this.behaviour = new QuickBehaviour();
        }
        else if(MainGame.mutator.getSettings().slowBats)
        {
            this.behaviour = new SlowBehaviour();
        }
    }

    moveUp()
    {
        this.behaviour.moveUp(this);
    }

    moveDown()
    {
        this.behaviour.moveDown(this);
    }

    onClick()
    {
        
    }

    onCollision(other_object:GameObject)
    {

        if(other_object instanceof Ball)
        {

            let ball:Ball = other_object as Ball;

            if((this.position.x < Game.canvas.width / 2) == (ball.velocity.x < 0))
            {
                ball.velocity.x *= -1 
                
                ball.velocity.y += (ball.position.y - this.position.y) * 0.03;
            }
        }
        
        super.onCollision(other_object);
    }

}