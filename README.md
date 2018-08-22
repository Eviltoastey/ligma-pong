# ligma-pong
school opdracht - pong game typescript

Move up and down using the 'W' and 'A' keys.

The bot can be replaced by a player two. This can be done by pressing 'spacebar'

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
All changes will be compiled to main.html.


# UML

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
``

I used the observer here to watch over the score progress 'sortof'. When the ball object hits left or right the score needs to change and this is where the listener, notifier and observer come in.

## Decorator

```typescript

```

## Factory

```typescript

```
