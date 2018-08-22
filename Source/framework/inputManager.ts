/// <reference path="vector.ts"/>

class InputManager
{

    private static key_status:boolean[] = [];
	private static p_key_status:boolean[]  = [];
	
	private static press_key_status:boolean[]  = [];
	private static p_press_key_status:boolean[]  = [];
	
	private static press_black_list:boolean[]  = [];

	private static mouse_down:boolean = false;
	private static mouse_down_this_frame:boolean = false;

	private static alt_mouse_down:boolean = false;
	private static alt_mouse_down_this_frame:boolean = false;
	
	private static middle_mouse_down:boolean = false;
    private static middleMouseDownThisFrame:boolean = false;
    
	static mouse_position:Vector = new Vector(0, 0);

	static mouse_buttons = {
		Left: 0,
		Middle: 1,
		Right: 2
	};

    constructor()
    {

    }

	static init()
	{		
		document.onkeydown = InputManager.setKeyStatus;
		document.onkeyup = InputManager.setKeyStatus;

		document.oncontextmenu = function(){return false;}

		document.onmousedown = function(e)
		{
			switch(e.button)
			{
				case InputManager.mouse_buttons.Left: 	InputManager.mouse_down_this_frame = true; break;
				case InputManager.mouse_buttons.Middle: InputManager.middleMouseDownThisFrame = true; break;
				case InputManager.mouse_buttons.Right: 	InputManager.alt_mouse_down_this_frame = true; break;
			}
		}

		document.onmouseup = function(e)
		{
			InputManager.mouse_down_this_frame = false;
			InputManager.mouse_down = false;
		}

		document.onmousemove = function(e)
		{
			InputManager.mouse_position.x = e.x + Game.canvas.x;
			InputManager.mouse_position.y = e.y + Game.canvas.y;
		}

		
		var el = document.getElementsByTagName("canvas")[0];
		el.addEventListener("touchstart", function(){InputManager.mouse_down_this_frame = true;}, false);
		el.addEventListener("touchend", function(){InputManager.mouse_down_this_frame = false;InputManager.mouse_down = false;}, false);
		el.addEventListener("touchcancel", function(){InputManager.mouse_down_this_frame = false;InputManager.mouse_down = false;}, false);
		el.addEventListener("touchmove", function(){return false}, false);
	}
	
	private static setKeyStatus(e)
	{
		InputManager.key_status[e.which] = (e.type == "keydown");
		
		if(!InputManager.press_black_list[e.which])
			InputManager.press_key_status[e.which] = (e.type == "keydown");
			
		InputManager.press_black_list[e.which] = (e.type == "keydown"); //only allow single presses if key has been released once
	}
	
	static updateKeys()
	{
		InputManager.p_key_status = InputManager.key_status;
		InputManager.p_press_key_status = InputManager.press_key_status;
		InputManager.press_key_status = [];

		if (InputManager.mouse_down && InputManager.mouse_down_this_frame)
		{
			InputManager.mouse_down_this_frame = false;
		}
		
		if(InputManager.mouse_down_this_frame && !InputManager.mouse_down)
		{
			InputManager.mouse_down = true;
		}

		if (InputManager.alt_mouse_down && InputManager.alt_mouse_down_this_frame)
		{
			InputManager.alt_mouse_down_this_frame = false;
		}
		
		if(InputManager.alt_mouse_down_this_frame && !InputManager.alt_mouse_down)
		{
			InputManager.alt_mouse_down = true;
		}

		if (InputManager.middle_mouse_down && InputManager.middleMouseDownThisFrame)
		{
			InputManager.middleMouseDownThisFrame = false;
		}
		
		if(InputManager.middleMouseDownThisFrame && !InputManager.middle_mouse_down)
		{
			InputManager.middle_mouse_down = true;
		}
	}

	static isPressed(keyCode)
	{
		if(InputManager.p_press_key_status[keyCode] == null)
			return false;
		else
			return InputManager.p_press_key_status[keyCode];
	}
	
	static isHeld(keyCode)
	{
		if(InputManager.p_key_status[keyCode] == null)
			return false;
		else
			return InputManager.p_key_status[keyCode];
	}

	static mousePressed(btn)
	{
		switch(btn)
		{
			case InputManager.mouse_buttons.Left: 	return InputManager.mouse_down_this_frame;
			case InputManager.mouse_buttons.Middle: return InputManager.middleMouseDownThisFrame;
			case InputManager.mouse_buttons.Right: 	return InputManager.alt_mouse_down_this_frame;
		}

		return InputManager.mouse_down_this_frame;
	}

	static mouseHeld(btn)
	{
		switch(btn)
		{
			case InputManager.mouse_buttons.Left: 	return InputManager.mouse_down;
			case InputManager.mouse_buttons.Middle: return InputManager.middle_mouse_down;
			case InputManager.mouse_buttons.Right: 	return InputManager.alt_mouse_down;
		}

		return InputManager.mouse_down;
	}


}