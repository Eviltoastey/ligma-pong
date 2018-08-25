/// <reference path="gameSettingsContainer.ts"/>

abstract class GameSettingsDecorator extends GameSettingsContainer
{
    protected parent:GameSettingsContainer = null;
    
    constructor(parent:GameSettingsContainer)
    {
        super();

        this.parent = parent;
    }

    getSettings():GameSettings
    {
        return super.getSettings();
    }
}
