/// <reference path="batBehaviour.ts"/>

class QuickBehaviour implements BatBehaviour
{
    moveUp(bat:Bat)
    {
        bat.position.y -= 6;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }

    moveDown(bat:Bat)
    {
        bat.position.y += 6;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }
}