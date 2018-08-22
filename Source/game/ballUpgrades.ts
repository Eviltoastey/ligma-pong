abstract class BallUpgrades extends Ball
{

    public upgrade_list:Upgrade[]

    decoratedBall:Ball;

    upgrade_func:Function;

    public getUpgrades()
    {
        this.upgrade_func && this.upgrade_func();
    }
}