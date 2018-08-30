# ligma-pong
school opdracht - pong game typescript

Move up and down using the 'W' and 'A' keys.

The bot can be replaced by a player two. This can be done by pressing 'spacebar'

You can play the game here: https://stud.hosted.hr.nl/0887504/ligma-pong/Build/main.html

# Installation

If you want to install the game on your local device clone the repo.
```
git clone https://github.com/eviltoastey/ligma-pong.git
```
The javascript file is already build so you can run the main.html file to test the game on your local device.

If you want to make changes don't forget to fork the repo.

# Adding your own code
If you wan't to make ligma pong better you can add changes in the dev environment.

Just run
```
tsc -w
```

To compile the code while you are changing it.
All changes will be compiled the Build map.
You can run the main.html file to play the game.


# UML

![UML v0.5](https://i.imgur.com/jVABzg9.png)

# Design Patterns

## Singleton

```typescript
class Score 
{
    private static _instance:Score;

    static get instance():Score
    {
        if(Score._instance == null)
            Score._instance = new Score();

        return Score._instance;
    }

    static player1_score:number = 0;
    static player2_score:number = 0;

    lListner:Listener;
    RListner:Listener;

    private constructor()
    {
        this.RListner = new Listener(this);
        this.lListner = new Listener(this);

        this.RListner.callback = function()
        {
            Score.player1_score += 1;
        }

        this.lListner.callback = function()
        {
            Score.player2_score += 1;
        }

    }

}
```

I used the singleton pattern in score because I onlky make 1 instance of score troughout the game.

## Polymorphism

```typescript
    onCollision(other_object:GameObject)
    {

        if(other_object instanceof Ball)
        {

            let ball:Ball = other_object as Ball;

            if((this.position.x < Game.canvas.width / 2) == (ball.velocity.x < 0))
            {
                ball.velocity.x *= -1 
                
                ball.velocity.y += (ball.position.y - this.position.y) * 0.03;
            }
        }
        
    super.onCollision(other_object);
    }
    
    
    class RandomUpgradeFactory
    {

        static upgrade_list = [SpeedUp, SlowDown, Shrink, Grow];

        static randomUpgrade(other_object:Ball)
        {
            let rand = Math.floor(Math.random() * this.upgrade_list.length); 
            let return_upgrade:Upgrade = new this.upgrade_list[rand](other_object);

            return return_upgrade;
        }
    }
    
    
```
I used polymorphism on a bunch of places but the most remarkeble onces are listed above.

1. All objects that are drawn on the canvas are **gameobjects** because of this I can use it to check the collision.
In the first bit of code you can see I check if the object is an instance of **Ball**.
This is used in a lot of places.

2. The different types of upgrades like **SpeedUp**, **SlowDown** etc. Are all type of **upgrade**. Therefor I let the **randomUpgradeFactory** create a random upgrade of type upgrade.

## Strategy

```typescript

interface BatBehaviour
{
    moveUp(bat:Bat);

    moveDown(bat:Bat);
}

class NormalBehaviour implements BatBehaviour
{
    moveUp(bat:Bat)
    {
        bat.position.y -= 3;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }

    moveDown(bat:Bat)
    {
        bat.position.y += 3;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }
}

class QuickBehaviour implements BatBehaviour
{
    moveUp(bat:Bat)
    {
        bat.position.y -= 6;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }

    moveDown(bat:Bat)
    {
        bat.position.y += 6;
        
        if(bat.position.y <= 0)
        {
            bat.position.y = 0;
        }
    }
}

/// class bat.ts

if(MainGame.mutator.getSettings().quickBats)
{
    this.behaviour = new QuickBehaviour();
}
else if(MainGame.mutator.getSettings().slowBats)
{
    this.behaviour = new SlowBehaviour();
}

```
I made a strategy pattern for the movement behaviours of the **Bat** class (How original..).
Because of this the movement behaviours are interchangeable. In the **Bat** class the movements get implemented.

## Observer

The notifier
```typescript
class Notifier implements Observer
{
    listeners:Listener[];

    constructor()
    {
        this.listeners = [];
    }

    register(listener:Listener)
    {
        this.listeners.push(listener);
    }

    unregister(listener:Listener)
    {
        let index:number = this.listeners.indexOf(listener);

        if(index > 0)
        {
            this.listeners.splice(index, 1);
        }
    }

    notify()
    {
        for(let i = 0; i < this.listeners.length; i++)
        {
            this.listeners[i].notify();
        }
    }
}
```

The listener
```typescript
class Listener
{
    callback:Function;
    context;

    constructor(context)
    {
        this.context = context;
    }

    notify()
    {
        this.callback && this.callback.call(this.context);
    }
}
```
Implementation in score
```typescript
class Score 
{
    private static _instance:Score;

    static get instance():Score
    {
        if(Score._instance == null)
            Score._instance = new Score();

        return Score._instance;
    }

    static player1_score:number = 0;
    static player2_score:number = 0;

    lListner:Listener;
    RListner:Listener;

    private constructor()
    {
        this.RListner = new Listener(this);
        this.lListner = new Listener(this);

        this.RListner.callback = function()
        {
            Score.player1_score += 1;
        }

        this.lListner.callback = function()
        {
            Score.player2_score += 1;
        }

    }

}
```

I used the observer here to watch over the score progress 'sortof'. When the ball object hits left or right the score needs to change and this is where the listener, notifier and observer come in.

## Decorator

The Decorator
```typescript

/// <reference path="gameSettingsContainer.ts"/>

abstract class GameSettingsDecorator extends GameSettingsContainer
{
    protected parent:GameSettingsContainer = null;
    
    constructor(parent:GameSettingsContainer)
    {
        super();

        this.parent = parent;
    }

    getSettings():GameSettings
    {
        return super.getSettings();
    }
}

```
The quick bat mutator (there are several other mutators with similar code but different game effects)
```typescript

/// <reference path="gameSettingsDecorator.ts"/>
class QuickBatMutator extends GameSettingsDecorator

{
    getSettings():GameSettings
    {
        let settings:GameSettings = this.parent.getSettings();

        settings.quickBats = true;

        return settings;
    }
}

```

Implementation in maingame.ts

```typescripts

    static mutator:GameSettingsContainer = new GameSettingsContainer();
    
        if(this.quickBats.checked == true)
        {
            MainGame.mutator = new QuickBatMutator(MainGame.mutator); 
        }
         
```

The decorator is a set of mutators that decorate the game (or mutate the game (that sounds way cooler (Unreal tournement reference!))).
In the menu screen of the game you can choose a set of mutators to decorate the game setting. This way you can change the game every time you play it!

## Factory

The random upgrade factory
```typescript
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
        let return_upgrade:Upgrade = new this.upgrade_list[rand](other_object);

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
```

The tile maker (block maker)
```typescript


/// <reference path="upgradeBlock.ts"/>

class TileMaker
{

    rand:number;

    constructor(columns:number, upgrade_amount:number)
    {

        if(MainGame.mutator.getSettings().upgrade_blocks == false)
        {
            upgrade_amount = 0;
        }

        if(MainGame.mutator.getSettings().blocks == true)
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

```

The upgrade block

```typescript
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

```
For the factory I made a random upgrade factory. This game has destroyable blocks and some of them have random upgrades. So why not make a factory that creates random upgrade blocks? The factory creates a random upgrade block and the Tilemaker actually uses them. In this way you always have random placed upgrade blocks.

# Gameplay components
I added some extra stuff because I want a higher grade ofcourse. And it made the game more fun.

## Multiplayer
Your friend can join by pressing the space bar. This will destroy the AI and let's you human friend join the fun.

## AI
This AI is almost unbeatable. It tracks the ball or balls and predicts where it will land. I've added logic for the multi ball option but the AI can't see the tiles/blocks on the screen.

There is also an option that draws a 'prediction line' from the AI's logic. That way you can see what the AI thinks.

## pause screen with settings (Menu screen)
I've added a menu screen with different checkboxes so you can change the game. It's not a pause screen but it's kinds like a pause screen.

## Canvas
The game is build inside of a canvas, what can i say more? 

## Styling
The style of the game is awesome! It has my face so +1 for that. (it also has my angry face and my happy face.)

# Pull request
I made a pull request for the astroid game from link: https://github.com/ArnovanDoesburg/Asteroid-Assault. He already created some upgrades and a good hierachy so it was easy for me to add an extra upgrade. 

I've added the upgrade so there is some more variation in the random upgrades you get.

You can find the pull request here: https://github.com/ArnovanDoesburg/Asteroid-Assault/pull/2


# Peer review

I've peerreviewed the same game I did a pull request to. 
You can read the review here: https://github.com/ArnovanDoesburg/Asteroid-Assault/issues/3

