/// <reference path="randomUpgradeFactory.ts"/>

class Block extends GameObject
{
    constructor(position:Vector, sprite:Sprite = null)
    {
        super(position.x,position.y, sprite || SpriteLoader.block);
    }

    onCollision(other_object:GameObject)
    {
        if(other_object instanceof Ball)
        {
            let ball:Ball = other_object as Ball;

            ball.velocity.x *= -1 

            this.destroy();
        }
        super.onCollision(other_object);
    }
}
