/// <reference path="gameSettingsDecorator.ts"/>
class WideBatsMutator extends GameSettingsDecorator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.bat_sprite = SpriteLoader.wide_bat;

        return settings;
    }
}