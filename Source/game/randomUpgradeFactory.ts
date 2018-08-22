/// <reference path="upgrades/speedUp.ts"/>
/// <reference path="upgrades/slowDown.ts"/>
/// <reference path="upgrades/shrink.ts"/>
/// <reference path="upgrades/grow.ts"/>

class RandomUpgradeFactory
{
    
    
    static upgrade_list = [SpeedUp, SlowDown, Shrink, Grow];

    static randomUpgrade(other_object:Ball)
    {
        let rand = Math.floor(Math.random() * this.upgrade_list.length); 
        let return_upgrade = new this.upgrade_list[rand](other_object);

        if(rand == 0)
        {
            return_upgrade = new SpeedUp(other_object);
        }
        else if(rand == 1)
        {
            return_upgrade = new SlowDown(other_object);
        }
        else if(rand == 2)
        {
            return_upgrade = new Shrink(other_object);
        }
        else if(rand == 3)
        {
            return_upgrade = new Grow(other_object);
        }

        return return_upgrade;
    }
}