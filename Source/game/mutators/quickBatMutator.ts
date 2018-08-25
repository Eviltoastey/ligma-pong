/// <reference path="gameSettingsDecorator.ts"/>
class QuickBatMutator extends GameSettingsDecorator

{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.quickBats = true;

        return settings;
    }
}