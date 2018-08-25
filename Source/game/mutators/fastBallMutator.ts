
/// <reference path="gameSettingsDecorator.ts"/>

class FastBallMutator extends GameSettingsDecorator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.base_ball_speed *= 2;

        return settings;
    }
}