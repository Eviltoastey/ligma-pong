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