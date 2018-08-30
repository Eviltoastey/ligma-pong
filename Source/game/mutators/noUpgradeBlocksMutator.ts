/// <reference path="gameSettingsDecorator.ts"/>
class NoUpgradeBlocksMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.upgrade_blocks = false;
    }
}