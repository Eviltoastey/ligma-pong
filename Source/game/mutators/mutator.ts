
class Mutator
{
    protected parent:Mutator = null;

    constructor(parent:Mutator)
    {
        this.parent = parent;
    }

    getSettings():GameSettings
    {
        return new GameSettings();
    }
}