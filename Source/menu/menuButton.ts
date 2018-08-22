class MenuButton extends GameObject
{
    mainGame:MainGame;

    constructor(position:Vector, mGame:MainGame)
    {
        super(position.x, position.y, SpriteLoader.menu_btn);

        this.mainGame = mGame;
    }

    onClick()
    {
        super.onClick();

        this.mainGame.create_menu_scene();
    }
}