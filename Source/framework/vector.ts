class Vector
{

    x:number = 0;
    y:number = 0;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }

	length()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	toAngle()
	{
		return (Math.atan2(this.y, this.x) * 180 / Math.PI) + 90;
	}
	
	normalize()
	{
		let newVector:Vector = this.getCopy();
		
		if(newVector.length() != 0)
		{
			let length:number = newVector.length();
			newVector.x /= length;
			newVector.y /= length;
		}
		
		return newVector;
	}
	
	lerpTo(otherVector:Vector, t:number)
	{
		let delta:Vector = otherVector.subtract(this);
		
		return this.add(delta.stretch(t));
	}
	
	distanceTo(otherVector:Vector)
	{
		let dX = this.x - otherVector.x;
		let dY = this.y - otherVector.y;
		
		return new Vector(dX, dY).length();
	}
	
	add(otherVector:Vector)
	{
		let newVector:Vector = this.getCopy();
		
		newVector.x += otherVector.x;
		newVector.y += otherVector.y;
		
		return newVector;
	}
	
	subtract(otherVector:Vector)
	{
		let newVector:Vector = this.getCopy();
		
		newVector.x -= otherVector.x;
		newVector.y -= otherVector.y;
		
		return newVector;
	}

	multiply(otherVector:Vector)
	{
		let newVector:Vector = this.getCopy();
		
		newVector.x *= otherVector.x;
		newVector.y *= otherVector.y;
		
		return newVector;
	}
	
	divide(otherVector:Vector)
	{
		let newVector:Vector = this.getCopy();
		
		newVector.x /= otherVector.x;
		newVector.y /= otherVector.y;
		
		return newVector;
	}
	
	stretch(length:number)
	{
		let newVector:Vector = this.getCopy();
		
		newVector.x *= length;
		newVector.y *= length;
		
		return newVector;
	}

	deltaAngle(otherVector:Vector)
	{
		let a = this.toAngle() * (Math.PI / 180);
		let b = otherVector.toAngle() * (Math.PI / 180);

		return Math.atan2(Math.sin(a - b), Math.cos(a - b)) * (180 / Math.PI)
	}

	cross(otherVector:Vector)
	{
		return this.x * otherVector.y - this.y * otherVector.x;
	}
	
	getCopy()
	{
		return new Vector(this.x, this.y);
	}
}
