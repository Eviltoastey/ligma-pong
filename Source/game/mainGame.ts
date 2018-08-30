/// <reference path="../framework/game.ts"/>
/// <reference path="player.ts"/>
/// <reference path="score.ts"/>
/// <reference path="tileMaker.ts"/>
/// <reference path="../menu/checkbox.ts"/>
/// <reference path="mutators/gamesettings.ts"/>
/// <reference path="mutators/gameSettingsDecorator.ts"/>
/// <reference path="mutators/widebatsMutator.ts"/>
/// <reference path="mutators/fastBallMutator.ts"/>
/// <reference path="mutators/hardModeMutator.ts"/>
/// <reference path="mutators/quickBatMutator.ts"/>
/// <reference path="mutators/slowBatMutator.ts"/>
/// <reference path="mutators/seeEnemy.ts"/>
/// <reference path="../menu/startButton.ts"/>

class MainGame extends Game
{
    tiles:TileMaker;
    score_limit:number = 10;

    game_screen:boolean;
    fast_ball:Checkbox;
    wide_bats:Checkbox;
    huge_ball:Checkbox;
    upgrade_blocks:Checkbox;
    no_blocks:Checkbox;
    multi_ball:Checkbox;
    see_enemy:Checkbox;
    hard_mode:Checkbox;
    quickBats:Checkbox;
    slowBats:Checkbox;

    static settings:GameSettings = new GameSettings();

    gameStart()
    {
        this.create_menu_scene();
    }

    create_menu_scene()
    {
        this.game_screen = false;

        Score.player1_score = 0;
        Score.player2_score = 0;

        this.activeScene = new Scene();

        this.hard_mode = new Checkbox(new Vector(50, Game.canvas.height -75), "hardmode");
        this.see_enemy = new Checkbox(new Vector(50, Game.canvas.height -125), "see AI thoughts");
        this.multi_ball = new Checkbox(new Vector(50, Game.canvas.height -175), "multi ball");
        this.fast_ball = new Checkbox(new Vector(50, Game.canvas.height -225 ), "fast ball");
        this.wide_bats = new Checkbox(new Vector(50, Game.canvas.height -275), "wide bats ");
        this.upgrade_blocks = new Checkbox(new Vector(50, Game.canvas.height -325), "no upgrade blocks");
        this.no_blocks = new Checkbox(new Vector(50, Game.canvas.height -375), "no blocks");
        this.quickBats = new Checkbox(new Vector(150, Game.canvas.height -425), "sonicmode");
        this.slowBats = new Checkbox(new Vector(150, Game.canvas.height -475), "eggmode");

        let startBtn = new StartButton(new Vector(Game.canvas.width /2, Game.canvas.height -100 ), this);
    }

    create_game_scene()
    {
        this.game_screen = true;
        this.activeScene = new Scene();

        let ball:Ball = new Ball(new Vector(Game.canvas.width / 2, Game.canvas.height / 2));
        let enemy:Enemy = new Enemy();
        let player1:Player = new Player(50, Game.canvas.height /2 );

        this.tiles = new TileMaker(10,30);

        if(MainGame.settings.multi_ball)
        {
            let ball2:Ball = new Ball(new Vector(Game.canvas.width / 2 - 50, Game.canvas.height / 2));
            let ball3:Ball = new Ball(new Vector(Game.canvas.width / 2 + 50, Game.canvas.height / 2));
        }

    }

    create_game_over_scene()
    {
        console.log("GAME OVER BOI");

        this.activeScene = new Scene();

        if(Score.player1_score > Score.player2_score)
        {
            Game.drawText(new Vector((Game.canvas.width /2) - 60, 100 ), "rgb(0,0,0)", "20px Arial", "50", "Player 1 wins!")    
        }
        else if(Score.player1_score < Score.player2_score)
        {
            Game.drawText(new Vector((Game.canvas.width  /2) - 60, 200 ), "rgb(0,0,0)", "20px Arial", "50", "Player 2 wins!")    
        }
        else
        {
            Game.drawText(new Vector(100,100), "rgb(0,0,0)", "20px Arial", "50", "ITS A DRAW!!!")    
        }

        let startBtn = new MenuButton(new Vector(Game.canvas.width /2, Game.canvas.height -100 ), this);

    }

    startGame()
    {
        this.reloadMutators();

        this.create_game_scene();
    }

    update()
    {
        super.update();

        if((Score.player1_score >= this.score_limit || Score.player2_score>= this.score_limit ))
        {
            this.create_game_over_scene();
        }

        if(this.game_screen ==  true )
        {
            Game.drawText(new Vector((Game.canvas.width - 50) /2, 25 ), "rgb(0,0,0)", "20px Arial", "50", Score.player1_score + ' | ' + Score.player2_score)
        }

        if(this.quickBats.checked)
            this.slowBats.checked = false;
    }

    reloadMutators()
    {
        MainGame.settings = new GameSettings();

        if(this.fast_ball.checked)
        {
            MainGame.settings = new FastBallMutator(MainGame.settings);
        }

        if(this.wide_bats.checked)
        {
            MainGame.settings = new WideBatsMutator(MainGame.settings); 
        }

        if(this.no_blocks.checked)
        {
            MainGame.settings = new NoBlocksMutator(MainGame.settings); 
        }

        if(this.upgrade_blocks.checked)
        {
            MainGame.settings = new NoUpgradeBlocksMutator(MainGame.settings); 
        }

        if(this.multi_ball.checked)
        {
            MainGame.settings = new MultiBallMutator(MainGame.settings); 
        }

        if(this.see_enemy.checked)
        {
            MainGame.settings = new SeeEnemyMutator(MainGame.settings); 
        }
        
        if(this.hard_mode.checked)
        {
            MainGame.settings = new HardModeMutator(MainGame.settings); 
        }
        
        if(this.quickBats.checked)
        {
            MainGame.settings = new QuickBatMutator(MainGame.settings);
        }
        
        if(this.slowBats.checked)
        {
            MainGame.settings = new SlowBatMutator(MainGame.settings); 
        }
    }

    draw()
    {
        Game.drawText(new Vector(100,100), "rgb(0,0,0)", "20px Arial", "50", Score.player1_score + ' | ' + Score.player2_score)

        super.draw();
    }
    
}

let game: MainGame = new MainGame(0, 0, 900, 500);