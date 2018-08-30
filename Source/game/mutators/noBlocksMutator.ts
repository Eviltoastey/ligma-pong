/// <reference path="gameSettingsDecorator.ts"/>
class NoBlocksMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.blocks = false;
    }
}