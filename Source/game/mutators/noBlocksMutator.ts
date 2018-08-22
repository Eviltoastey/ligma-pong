class NoBlocksMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.blocks = false;

        return settings;
    }
}