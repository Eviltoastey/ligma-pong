/// <reference path="gameSettingsDecorator.ts"/>
class HardModeMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.hard_mode = true;
    }
}