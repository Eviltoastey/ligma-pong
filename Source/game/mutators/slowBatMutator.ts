
/// <reference path="mutator.ts"/>
class SlowBatMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.slowBats = true;

        return settings;
    }
}