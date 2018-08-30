/// <reference path="gameSettingsDecorator.ts"/>
class SlowBatMutator extends GameSettingsDecorator

{
    applySettings():void
    {
        this.slowBats = true;
    }
}