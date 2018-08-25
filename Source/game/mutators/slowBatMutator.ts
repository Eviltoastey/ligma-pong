/// <reference path="gameSettingsDecorator.ts"/>
class SlowBatMutator extends GameSettingsDecorator

{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.slowBats = true;

        return settings;
    }
}