/// <reference path="upgrade.ts"/>

class SlowDown extends Upgrade
{
    constructor(target:Ball)
    {
        super(target);
        console.log('slow down boi');

        if(target.velocity.y <= -1)
        {
            target.velocity.y += 1
        }
        else
        {
            target.velocity.y -= 1
        }

        if(target.velocity.x <= -1)
        {
            target.velocity.x += 1
        }
        else
        {
            target.velocity.x -= 1
        }

        console.log(target.velocity)
    }
}