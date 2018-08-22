
/// <reference path="mutator.ts"/>
class QuickBatMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.quickBats = true;

        return settings;
    }
}