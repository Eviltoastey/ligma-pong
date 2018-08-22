class Scene
{
    all_objects:GameObject[] = [];

    AddObject(newObject:GameObject)
    {
        this.all_objects.push(newObject);
        newObject.scene = this;
    }

    update()
    {
        this.all_objects.forEach(element => 
        {
            element.update();
        });
    }

    draw()
    {
        this.all_objects.forEach( element => 
        {
            element.draw();
        });
    }
}