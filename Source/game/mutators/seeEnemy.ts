class SeeEnemyMutator extends GameSettingsDecorator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.see_enemy = true;

        return settings;
    }
}