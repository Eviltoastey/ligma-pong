class StartButton extends GameObject
{
    mainGame:MainGame;

    constructor(position:Vector, mGame:MainGame)
    {
        super(position.x, position.y, SpriteLoader.start_btn);

        this.mainGame = mGame;
    }

    onClick()
    {
        super.onClick();

        this.mainGame.startGame();
    }
}