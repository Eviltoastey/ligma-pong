class SeeEnemyMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.see_enemy = true;

        return settings;
    }
}