/// <reference path="gameSettingsDecorator.ts"/>
class MultiBallMutator extends GameSettingsDecorator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.multi_ball = true;

        return settings;
    }
}