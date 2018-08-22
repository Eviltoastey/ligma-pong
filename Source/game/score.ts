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