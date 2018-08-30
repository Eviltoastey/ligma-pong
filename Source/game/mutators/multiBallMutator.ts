/// <reference path="gameSettingsDecorator.ts"/>
class MultiBallMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.multi_ball = true;
    }
}