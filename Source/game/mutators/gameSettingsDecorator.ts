/// <reference path="gameSettings.ts"/>
abstract class GameSettingsDecorator extends GameSettings
{
    protected parent:GameSettings = null;
    
    constructor(parent:GameSettings)
    {
        super();

        this.parent = parent;

        this.applySettingsRecursively(this);
    }

    applySettingsRecursively(target: GameSettingsDecorator):void
    {
        if(this.parent instanceof GameSettingsDecorator)
        {
            (this.parent as GameSettingsDecorator).applySettingsRecursively.call(this.parent, target);
        }

        this.applySettings.call(target);
    }

    abstract applySettings():void;
}
