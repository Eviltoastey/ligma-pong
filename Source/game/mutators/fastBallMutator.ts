
/// <reference path="mutator.ts"/>
class FastBallMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.base_ball_speed *= 2;

        return settings;
    }
}