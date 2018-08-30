/// <reference path="gameSettingsDecorator.ts"/>
class QuickBatMutator extends GameSettingsDecorator

{
    applySettings():void
    {
        this.quickBats = true;
    }
}