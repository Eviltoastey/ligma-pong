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

I used the singleton pattern in score because I onlky make 1 instance of score troughout the game.
```
