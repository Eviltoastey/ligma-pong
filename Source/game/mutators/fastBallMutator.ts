/// <reference path="gameSettingsDecorator.ts"/>
class FastBallMutator extends GameSettingsDecorator

{
    applySettings():void
    {
        this.base_ball_speed *= 2;
    }
}