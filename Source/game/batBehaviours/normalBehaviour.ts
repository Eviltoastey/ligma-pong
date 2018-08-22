/// <reference path="batBehaviour.ts"/>

class NormalBehaviour implements BatBehaviour
{
    moveUp(bat:Bat)
    {
        bat.position.y -= 3;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }

    moveDown(bat:Bat)
    {
        bat.position.y += 3;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }
}