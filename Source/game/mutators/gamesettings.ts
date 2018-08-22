class GameSettings
{
    base_ball_speed:number;
    bat_sprite:Sprite;
    blocks:Boolean;
    upgrade_blocks:Boolean;
    multi_ball:Boolean;
    see_enemy:Boolean;
    hard_mode:Boolean;
    quickBats:Boolean;
    slowBats:Boolean;
    
    constructor()
    {
        this.blocks = true;
        this.upgrade_blocks = true;
        this.base_ball_speed = 4;
        this.bat_sprite = SpriteLoader.bat;
        this.multi_ball = false;
        this.see_enemy = false;
        this.hard_mode = false;
        this.quickBats = false;
        this.slowBats = false;
    }
}