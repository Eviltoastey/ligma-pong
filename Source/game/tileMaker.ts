
/// <reference path="upgradeBlock.ts"/>

class TileMaker
{

    rand:number;

    constructor(columns:number, upgrade_amount:number)
    {

        if(MainGame.settings.upgrade_blocks == false)
        {
            upgrade_amount = 0;
        }

        if(MainGame.settings.blocks == true)
        {
            for(let x = 0; x < columns; x++)
            {
    
                for(let y = 0; y < 10; y++)
                {
                    let pos:Vector = new Vector(Game.canvas.width / 2 - (columns/2)*20 + x*20, 25 + 50 * y);
    
                        if(pos.distanceTo(new Vector(pos.x, Game.canvas.height / 2)) > 50)
                        {
                            this.rand = Math.floor(Math.random() * 2) + 1; 
    
                            if(this.rand == 1)
                            {
                                let block:Block = new Block(pos);
                            }
                            else
                            {
                                if(upgrade_amount != 0)
                                {
                                    upgrade_amount--;
                                    let upgrade_block:UpgradeBlock = new UpgradeBlock(pos);
                                } 
                                else 
                                {
                                    let block:Block = new Block(pos);
                                }
                            }
                        }
                }
            }
        }
    }
}