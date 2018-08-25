class NoBlocksMutator extends GameSettingsDecorator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.blocks = false;

        return settings;
    }
}