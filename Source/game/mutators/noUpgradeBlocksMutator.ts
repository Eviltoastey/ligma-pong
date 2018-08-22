class NoUpgradeBlocksMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.upgrade_blocks = false;

        return settings;
    }
}