/// <reference path="../framework/gameObject.ts"/>
/// <reference path="notifier.ts"/>

class Ball extends GameObject
{
    velocity:Vector; 
    l_notifier:Notifier;
    r_notifier:Notifier;

    constructor(position:Vector)
    {
        super(position.x, position.y, SpriteLoader.ball);

        this.l_notifier = new Notifier();
        this.r_notifier = new Notifier();

        let baseSpeed = MainGame.mutator.getSettings().base_ball_speed;

        this.velocity = new Vector(Math.random() >= 0.5? baseSpeed : -baseSpeed, Math.random() * 5 - 2.5)

        this.r_notifier.register(Score.instance.RListner);
        this.l_notifier.register(Score.instance.lListner);
    }

    update()
    {
        this.position = this.position.add(this.velocity);

        if(this.position.x >= Game.canvas.width)
        {
            this.velocity.x *= -1
            this.r_notifier.notify();
        }

        if(this.position.x <= 0)
        {
            this.velocity.x *= -1
            this.l_notifier.notify();
        }

        if(this.position.y >= Game.canvas.height)
        {
            this.velocity.y *= -1
        }

        if(this.position.y <= 0)
        {
            this.velocity.y *= -1
        }

        super.update();
    }

    destroy()
    {
        this.r_notifier.unregister(Score.instance.RListner);
        this.l_notifier.unregister(Score.instance.lListner);

        super.destroy();
    }

    getUpgrades(){};
}