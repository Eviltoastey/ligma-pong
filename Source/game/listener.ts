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