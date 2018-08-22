class HardModeMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.hard_mode = true;

        return settings;
    }
}