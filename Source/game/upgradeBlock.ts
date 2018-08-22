class UpgradeBlock extends Block
{
    position:Vector;

    constructor(position:Vector)
    {
        super(position, SpriteLoader.upgradeBlock);
    }

    onCollision(object_other:GameObject)
    {
        super.onCollision(object_other);

        let upgrade = RandomUpgradeFactory.randomUpgrade(object_other as Ball);
    }

}