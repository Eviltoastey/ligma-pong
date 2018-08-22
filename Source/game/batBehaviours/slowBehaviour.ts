/// <reference path="batBehaviour.ts"/>

class SlowBehaviour implements BatBehaviour
{
    moveUp(bat:Bat)
    {
        bat.position.y -= 1;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }

    moveDown(bat:Bat)
    {
        bat.position.y += 1;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }
}