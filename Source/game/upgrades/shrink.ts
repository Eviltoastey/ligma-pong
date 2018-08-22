/// <reference path="upgrade.ts"/>

class Shrink extends Upgrade
{
    constructor(target:Ball)
    {
        super(target);

        target.sprite = SpriteLoader.happy

    }
}