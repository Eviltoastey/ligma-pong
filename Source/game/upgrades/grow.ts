/// <reference path="upgrade.ts"/>

class Grow extends Upgrade
{
    constructor(target:Ball)
    {
        super(target);

        target.sprite = SpriteLoader.angry;
    }
}