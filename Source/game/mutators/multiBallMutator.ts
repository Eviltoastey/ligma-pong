
/// <reference path="mutator.ts"/>
class MultiBallMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.multi_ball = true;

        return settings;
    }
}