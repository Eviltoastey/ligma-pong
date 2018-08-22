/// <reference path="bat.ts"/>

class Player extends Bat
{

    update()
    {
        if(InputManager.isHeld(83))
        {
            this.moveDown();
        }

        if(InputManager.isHeld(87))
        {
            this.moveUp();
        }

        super.update();

    }
}