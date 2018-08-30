/// <reference path="gameSettingsDecorator.ts"/>
class WideBatsMutator extends GameSettingsDecorator
{
    applySettings():void
    {
        this.bat_sprite = SpriteLoader.wide_bat;
    }
}