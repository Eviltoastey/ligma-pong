/// <reference path="gameSettingsDecorator.ts"/>
class SeeEnemyMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.see_enemy = true;
    }
}