class WideBatsMutator extends Mutator
{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.bat_sprite = SpriteLoader.wide_bat;

        return settings;
    }
}