var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Canvas = (function () {
    function Canvas(x, y, width, height) {
        this.elementID = "GameBuilder_Window";
        this.windowElement = null;
        this.canvas = null;
        this.canvasContext = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        var body = document.body;
        body.insertAdjacentHTML('beforeend', '<canvas id="' + this.elementID + '" style="position: absolute; left: ' + this.x + 'px; top: ' + this.y + 'px; border: 1px solid black;" width="' + this.width + '" height="' + this.height + '"></canvas>');
        this.windowElement = document.getElementById(this.elementID);
        this.canvas = document.getElementById(this.elementID);
        this.canvasContext = this.canvas.getContext('2d');
    }
    return Canvas;
}());
var Sprite = (function () {
    function Sprite(sprite_name) {
        this.alpha = 1;
        this.image = null;
        this.name = "undefined image";
        var body = document.body;
        body.insertAdjacentHTML('beforeend', '<img id="image" src="img\\' + sprite_name + '" style="display:none;"></img>');
        this.image = document.getElementById('image');
        this.image.id = "loadedImage";
        this.name = sprite_name;
    }
    Sprite.prototype.draw = function (x, y, rotation) {
        var context = Game.canvas.canvasContext;
        context.drawImage(this.image, x - this.image.width / 2, y - this.image.height / 2);
    };
    return Sprite;
}());
var SpriteLoader = (function () {
    function SpriteLoader() {
    }
    SpriteLoader.ball = new Sprite("ball.png");
    SpriteLoader.angry = new Sprite("angry_ball.png");
    SpriteLoader.happy = new Sprite("happy_ball.png");
    SpriteLoader.bat = new Sprite("bat.png");
    SpriteLoader.wide_bat = new Sprite("wide_bat.png");
    SpriteLoader.block = new Sprite("block.png");
    SpriteLoader.upgradeBlock = new Sprite("upgradeblock.png");
    SpriteLoader.check_on = new Sprite("check_on.png");
    SpriteLoader.check_off = new Sprite("check_off.png");
    SpriteLoader.start_btn = new Sprite("start.png");
    SpriteLoader.menu_btn = new Sprite("menu.png");
    return SpriteLoader;
}());
var Vector = (function () {
    function Vector(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Vector.prototype.length = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vector.prototype.toAngle = function () {
        return (Math.atan2(this.y, this.x) * 180 / Math.PI) + 90;
    };
    Vector.prototype.normalize = function () {
        var newVector = this.getCopy();
        if (newVector.length() != 0) {
            var length_1 = newVector.length();
            newVector.x /= length_1;
            newVector.y /= length_1;
        }
        return newVector;
    };
    Vector.prototype.lerpTo = function (otherVector, t) {
        var delta = otherVector.subtract(this);
        return this.add(delta.stretch(t));
    };
    Vector.prototype.distanceTo = function (otherVector) {
        var dX = this.x - otherVector.x;
        var dY = this.y - otherVector.y;
        return new Vector(dX, dY).length();
    };
    Vector.prototype.add = function (otherVector) {
        var newVector = this.getCopy();
        newVector.x += otherVector.x;
        newVector.y += otherVector.y;
        return newVector;
    };
    Vector.prototype.subtract = function (otherVector) {
        var newVector = this.getCopy();
        newVector.x -= otherVector.x;
        newVector.y -= otherVector.y;
        return newVector;
    };
    Vector.prototype.multiply = function (otherVector) {
        var newVector = this.getCopy();
        newVector.x *= otherVector.x;
        newVector.y *= otherVector.y;
        return newVector;
    };
    Vector.prototype.divide = function (otherVector) {
        var newVector = this.getCopy();
        newVector.x /= otherVector.x;
        newVector.y /= otherVector.y;
        return newVector;
    };
    Vector.prototype.stretch = function (length) {
        var newVector = this.getCopy();
        newVector.x *= length;
        newVector.y *= length;
        return newVector;
    };
    Vector.prototype.deltaAngle = function (otherVector) {
        var a = this.toAngle() * (Math.PI / 180);
        var b = otherVector.toAngle() * (Math.PI / 180);
        return Math.atan2(Math.sin(a - b), Math.cos(a - b)) * (180 / Math.PI);
    };
    Vector.prototype.cross = function (otherVector) {
        return this.x * otherVector.y - this.y * otherVector.x;
    };
    Vector.prototype.getCopy = function () {
        return new Vector(this.x, this.y);
    };
    return Vector;
}());
var InputManager = (function () {
    function InputManager() {
    }
    InputManager.init = function () {
        document.onkeydown = InputManager.setKeyStatus;
        document.onkeyup = InputManager.setKeyStatus;
        document.oncontextmenu = function () { return false; };
        document.onmousedown = function (e) {
            switch (e.button) {
                case InputManager.mouse_buttons.Left:
                    InputManager.mouse_down_this_frame = true;
                    break;
                case InputManager.mouse_buttons.Middle:
                    InputManager.middleMouseDownThisFrame = true;
                    break;
                case InputManager.mouse_buttons.Right:
                    InputManager.alt_mouse_down_this_frame = true;
                    break;
            }
        };
        document.onmouseup = function (e) {
            InputManager.mouse_down_this_frame = false;
            InputManager.mouse_down = false;
        };
        document.onmousemove = function (e) {
            InputManager.mouse_position.x = e.x + Game.canvas.x;
            InputManager.mouse_position.y = e.y + Game.canvas.y;
        };
        var el = document.getElementsByTagName("canvas")[0];
        el.addEventListener("touchstart", function () { InputManager.mouse_down_this_frame = true; }, false);
        el.addEventListener("touchend", function () { InputManager.mouse_down_this_frame = false; InputManager.mouse_down = false; }, false);
        el.addEventListener("touchcancel", function () { InputManager.mouse_down_this_frame = false; InputManager.mouse_down = false; }, false);
        el.addEventListener("touchmove", function () { return false; }, false);
    };
    InputManager.setKeyStatus = function (e) {
        InputManager.key_status[e.which] = (e.type == "keydown");
        if (!InputManager.press_black_list[e.which])
            InputManager.press_key_status[e.which] = (e.type == "keydown");
        InputManager.press_black_list[e.which] = (e.type == "keydown");
    };
    InputManager.updateKeys = function () {
        InputManager.p_key_status = InputManager.key_status;
        InputManager.p_press_key_status = InputManager.press_key_status;
        InputManager.press_key_status = [];
        if (InputManager.mouse_down && InputManager.mouse_down_this_frame) {
            InputManager.mouse_down_this_frame = false;
        }
        if (InputManager.mouse_down_this_frame && !InputManager.mouse_down) {
            InputManager.mouse_down = true;
        }
        if (InputManager.alt_mouse_down && InputManager.alt_mouse_down_this_frame) {
            InputManager.alt_mouse_down_this_frame = false;
        }
        if (InputManager.alt_mouse_down_this_frame && !InputManager.alt_mouse_down) {
            InputManager.alt_mouse_down = true;
        }
        if (InputManager.middle_mouse_down && InputManager.middleMouseDownThisFrame) {
            InputManager.middleMouseDownThisFrame = false;
        }
        if (InputManager.middleMouseDownThisFrame && !InputManager.middle_mouse_down) {
            InputManager.middle_mouse_down = true;
        }
    };
    InputManager.isPressed = function (keyCode) {
        if (InputManager.p_press_key_status[keyCode] == null)
            return false;
        else
            return InputManager.p_press_key_status[keyCode];
    };
    InputManager.isHeld = function (keyCode) {
        if (InputManager.p_key_status[keyCode] == null)
            return false;
        else
            return InputManager.p_key_status[keyCode];
    };
    InputManager.mousePressed = function (btn) {
        switch (btn) {
            case InputManager.mouse_buttons.Left: return InputManager.mouse_down_this_frame;
            case InputManager.mouse_buttons.Middle: return InputManager.middleMouseDownThisFrame;
            case InputManager.mouse_buttons.Right: return InputManager.alt_mouse_down_this_frame;
        }
        return InputManager.mouse_down_this_frame;
    };
    InputManager.mouseHeld = function (btn) {
        switch (btn) {
            case InputManager.mouse_buttons.Left: return InputManager.mouse_down;
            case InputManager.mouse_buttons.Middle: return InputManager.middle_mouse_down;
            case InputManager.mouse_buttons.Right: return InputManager.alt_mouse_down;
        }
        return InputManager.mouse_down;
    };
    InputManager.key_status = [];
    InputManager.p_key_status = [];
    InputManager.press_key_status = [];
    InputManager.p_press_key_status = [];
    InputManager.press_black_list = [];
    InputManager.mouse_down = false;
    InputManager.mouse_down_this_frame = false;
    InputManager.alt_mouse_down = false;
    InputManager.alt_mouse_down_this_frame = false;
    InputManager.middle_mouse_down = false;
    InputManager.middleMouseDownThisFrame = false;
    InputManager.mouse_position = new Vector(0, 0);
    InputManager.mouse_buttons = {
        Left: 0,
        Middle: 1,
        Right: 2
    };
    return InputManager;
}());
var Scene = (function () {
    function Scene() {
        this.all_objects = [];
    }
    Scene.prototype.AddObject = function (newObject) {
        this.all_objects.push(newObject);
        newObject.scene = this;
    };
    Scene.prototype.update = function () {
        this.all_objects.forEach(function (element) {
            element.update();
        });
    };
    Scene.prototype.draw = function () {
        this.all_objects.forEach(function (element) {
            element.draw();
        });
    };
    return Scene;
}());
var Game = (function () {
    function Game(x, y, width, height) {
        this.activeScene = new Scene();
        this.position = new Vector(0, 0);
        this.scale = new Vector(0, 0);
        this.background_color = {
            r: 255,
            g: 255,
            b: 0
        };
        Game.instance = this;
        this.position = new Vector(x, y);
        this.scale = new Vector(width, height);
        Game.canvas = new Canvas(x, y, width, height);
        InputManager.init();
        var gameContext = this;
        this.gameStart();
        window.setInterval(function () {
            gameContext.draw();
            gameContext.update();
        }, 1000 / 60);
    }
    Game.prototype.gameStart = function () {
    };
    Game.prototype.update = function () {
        InputManager.updateKeys();
        this.activeScene.update();
    };
    Game.prototype.draw = function () {
        Game.canvas.canvasContext.fillStyle = "rgb(" + this.background_color.r + "," + this.background_color.g + "," + this.background_color.b + ")";
        Game.canvas.canvasContext.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
        this.activeScene.draw();
    };
    Game.drawText = function (position, rgb, font, width, text) {
        if (width === void 0) { width = '100'; }
        Game.canvas.canvasContext.fillStyle = rgb;
        Game.canvas.canvasContext.font = font;
        var w = Game.canvas.canvasContext.measureText(text).width;
        Game.canvas.canvasContext.fillText(text, position.x, position.y);
    };
    Game.canvas = null;
    Game.spriteLoader = new SpriteLoader();
    return Game;
}());
var GameObject = (function () {
    function GameObject(pos_x, pos_y, sprite) {
        this.ignoreCollisions = false;
        this.destroyed = false;
        this.position = new Vector(0, 0);
        this.sprite = null;
        this.position.x = pos_x;
        this.position.y = pos_y;
        this.sprite = sprite;
        Game.instance.activeScene.AddObject(this);
    }
    GameObject.prototype.update = function () {
        if (!this.destroyed) {
            if (InputManager.mousePressed(InputManager.mouse_buttons.Left)) {
                this.checkClick(true);
            }
            if (InputManager.mouseHeld(InputManager.mouse_buttons.Left)) {
                this.checkClick(false);
            }
        }
        if (!this.ignoreCollisions && !this.destroyed) {
            for (var i = 0; i < Game.instance.activeScene.all_objects.length; i++) {
                if (Game.instance.activeScene.all_objects[i] != this && !Game.instance.activeScene.all_objects[i].ignoreCollisions) {
                    var hit = false;
                    var o2 = Game.instance.activeScene.all_objects[i];
                    var hw = (this.sprite.image.width) / 2;
                    var hh = (this.sprite.image.height) / 2;
                    var ohw = (o2.sprite.image.width) / 2;
                    var ohh = (o2.sprite.image.height) / 2;
                    var p = [
                        [this.position.x - hw, this.position.y - hh],
                        [this.position.x + hw, this.position.y - hh],
                        [this.position.x - hw, this.position.y + hh],
                        [this.position.x + hw, this.position.y + hh]
                    ];
                    for (var pi = 0; pi < p.length; pi++) {
                        if (p[pi][0] > o2.position.x - ohw && p[pi][0] < o2.position.x + ohw) {
                            if (p[pi][1] > o2.position.y - ohh && p[pi][1] < o2.position.y + ohh) {
                                hit = true;
                            }
                        }
                    }
                    p =
                        [
                            [o2.position.x - ohw, o2.position.y - ohh],
                            [o2.position.x + ohw, o2.position.y - ohh],
                            [o2.position.x - ohw, o2.position.y + ohh],
                            [o2.position.x + ohw, o2.position.y + ohh]
                        ];
                    for (var pi = 0; pi < p.length; pi++) {
                        if (p[pi][0] > this.position.x - hw && p[pi][0] < this.position.x + hw) {
                            if (p[pi][1] > this.position.y - hh && p[pi][1] < this.position.y + hh) {
                                hit = true;
                            }
                        }
                    }
                    if (hit)
                        if (!this.destroyed) {
                            this.onCollision(o2);
                        }
                }
            }
        }
    };
    GameObject.prototype.checkClick = function (thisFrame) {
        var hit = false;
        var clickPos = InputManager.mouse_position;
        var hw = this.sprite.image.width / 2;
        var hh = this.sprite.image.height / 2;
        if (clickPos.x > this.position.x - hw && clickPos.x < this.position.x + hw) {
            if (clickPos.y > this.position.y - hh && clickPos.y < this.position.y + hh) {
                hit = true;
            }
        }
        if (hit) {
            if (thisFrame) {
                this.onClick();
            }
            else {
                this.onMouseHeld();
            }
        }
    };
    GameObject.prototype.onClick = function () { };
    GameObject.prototype.onMouseHeld = function () { };
    GameObject.prototype.onCollision = function (other_object) {
    };
    GameObject.prototype.destroy = function () {
        Game.instance.activeScene.all_objects.splice(Game.instance.activeScene.all_objects.indexOf(this), 1);
    };
    GameObject.prototype.draw = function () {
        if (this.sprite === null)
            return;
        this.sprite.draw(this.position.x, this.position.y, 0);
    };
    return GameObject;
}());
var Notifier = (function () {
    function Notifier() {
        this.listeners = [];
    }
    Notifier.prototype.register = function (listener) {
        this.listeners.push(listener);
    };
    Notifier.prototype.unregister = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index > 0) {
            this.listeners.splice(index, 1);
        }
    };
    Notifier.prototype.notify = function () {
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i].notify();
        }
    };
    return Notifier;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(position) {
        var _this = _super.call(this, position.x, position.y, SpriteLoader.ball) || this;
        _this.l_notifier = new Notifier();
        _this.r_notifier = new Notifier();
        var baseSpeed = MainGame.settings.base_ball_speed;
        _this.velocity = new Vector(Math.random() >= 0.5 ? baseSpeed : -baseSpeed, Math.random() * 5 - 2.5);
        _this.r_notifier.register(Score.instance.RListner);
        _this.l_notifier.register(Score.instance.lListner);
        return _this;
    }
    Ball.prototype.update = function () {
        this.position = this.position.add(this.velocity);
        if (this.position.x >= Game.canvas.width) {
            this.velocity.x *= -1;
            this.r_notifier.notify();
        }
        if (this.position.x <= 0) {
            this.velocity.x *= -1;
            this.l_notifier.notify();
        }
        if (this.position.y >= Game.canvas.height) {
            this.velocity.y *= -1;
        }
        if (this.position.y <= 0) {
            this.velocity.y *= -1;
        }
        _super.prototype.update.call(this);
    };
    Ball.prototype.destroy = function () {
        this.r_notifier.unregister(Score.instance.RListner);
        this.l_notifier.unregister(Score.instance.lListner);
        _super.prototype.destroy.call(this);
    };
    Ball.prototype.getUpgrades = function () { };
    ;
    return Ball;
}(GameObject));
var QuickBehaviour = (function () {
    function QuickBehaviour() {
    }
    QuickBehaviour.prototype.moveUp = function (bat) {
        bat.position.y -= 6;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    QuickBehaviour.prototype.moveDown = function (bat) {
        bat.position.y += 6;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    return QuickBehaviour;
}());
var NormalBehaviour = (function () {
    function NormalBehaviour() {
    }
    NormalBehaviour.prototype.moveUp = function (bat) {
        bat.position.y -= 3;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    NormalBehaviour.prototype.moveDown = function (bat) {
        bat.position.y += 3;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    return NormalBehaviour;
}());
var SlowBehaviour = (function () {
    function SlowBehaviour() {
    }
    SlowBehaviour.prototype.moveUp = function (bat) {
        bat.position.y -= 1;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    SlowBehaviour.prototype.moveDown = function (bat) {
        bat.position.y += 1;
        if (bat.position.y <= 0) {
            bat.position.y = 0;
        }
    };
    return SlowBehaviour;
}());
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(x, y) {
        var _this = _super.call(this, x, y, MainGame.settings.bat_sprite) || this;
        _this.behaviour = new NormalBehaviour();
        if (MainGame.settings.quickBats) {
            _this.behaviour = new QuickBehaviour();
        }
        else if (MainGame.settings.slowBats) {
            _this.behaviour = new SlowBehaviour();
        }
        return _this;
    }
    Bat.prototype.moveUp = function () {
        this.behaviour.moveUp(this);
    };
    Bat.prototype.moveDown = function () {
        this.behaviour.moveDown(this);
    };
    Bat.prototype.onClick = function () {
    };
    Bat.prototype.onCollision = function (other_object) {
        if (other_object instanceof Ball) {
            var ball = other_object;
            if ((this.position.x < Game.canvas.width / 2) == (ball.velocity.x < 0)) {
                ball.velocity.x *= -1;
                ball.velocity.y += (ball.position.y - this.position.y) * 0.03;
            }
        }
        _super.prototype.onCollision.call(this, other_object);
    };
    return Bat;
}(GameObject));
var Upgrade = (function () {
    function Upgrade(target) {
    }
    return Upgrade;
}());
var SpeedUp = (function (_super) {
    __extends(SpeedUp, _super);
    function SpeedUp(target) {
        var _this = _super.call(this, target) || this;
        if (target.velocity.y <= -1) {
            target.velocity.y -= 1;
        }
        else {
            target.velocity.y += 1;
        }
        if (target.velocity.x <= -1) {
            target.velocity.x -= 1;
        }
        else {
            target.velocity.x += 1;
        }
        console.log(target.velocity);
        return _this;
    }
    return SpeedUp;
}(Upgrade));
var SlowDown = (function (_super) {
    __extends(SlowDown, _super);
    function SlowDown(target) {
        var _this = _super.call(this, target) || this;
        console.log('slow down boi');
        if (target.velocity.y <= -1) {
            target.velocity.y += 1;
        }
        else {
            target.velocity.y -= 1;
        }
        if (target.velocity.x <= -1) {
            target.velocity.x += 1;
        }
        else {
            target.velocity.x -= 1;
        }
        console.log(target.velocity);
        return _this;
    }
    return SlowDown;
}(Upgrade));
var Shrink = (function (_super) {
    __extends(Shrink, _super);
    function Shrink(target) {
        var _this = _super.call(this, target) || this;
        target.sprite = SpriteLoader.happy;
        return _this;
    }
    return Shrink;
}(Upgrade));
var Grow = (function (_super) {
    __extends(Grow, _super);
    function Grow(target) {
        var _this = _super.call(this, target) || this;
        target.sprite = SpriteLoader.angry;
        return _this;
    }
    return Grow;
}(Upgrade));
var RandomUpgradeFactory = (function () {
    function RandomUpgradeFactory() {
    }
    RandomUpgradeFactory.randomUpgrade = function (other_object) {
        var rand = Math.floor(Math.random() * this.upgrade_list.length);
        var return_upgrade = new this.upgrade_list[rand](other_object);
        if (rand == 0) {
            return_upgrade = new SpeedUp(other_object);
        }
        else if (rand == 1) {
            return_upgrade = new SlowDown(other_object);
        }
        else if (rand == 2) {
            return_upgrade = new Shrink(other_object);
        }
        else if (rand == 3) {
            return_upgrade = new Grow(other_object);
        }
        return return_upgrade;
    };
    RandomUpgradeFactory.upgrade_list = [SpeedUp, SlowDown, Shrink, Grow];
    return RandomUpgradeFactory;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(position, sprite) {
        if (sprite === void 0) { sprite = null; }
        return _super.call(this, position.x, position.y, sprite || SpriteLoader.block) || this;
    }
    Block.prototype.onCollision = function (other_object) {
        if (other_object instanceof Ball) {
            var ball = other_object;
            ball.velocity.x *= -1;
            this.destroy();
        }
        _super.prototype.onCollision.call(this, other_object);
    };
    return Block;
}(GameObject));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this, Game.canvas.width - 50, Game.canvas.height / 2) || this;
        _this.prediction_frames = 150;
        _this.player_two = false;
        if (MainGame.settings.hard_mode)
            _this.prediction_frames = 50000;
        return _this;
    }
    Enemy.prototype.update = function () {
        var ball = null;
        var dist = 0;
        for (var i = 0; i < Game.instance.activeScene.all_objects.length; i++) {
            var obj = Game.instance.activeScene.all_objects[i];
            if (obj instanceof Ball) {
                var cball = obj;
                if (cball.velocity.x > 0) {
                    if (cball.position.x > dist) {
                        dist = cball.position.x;
                        ball = cball;
                    }
                }
            }
        }
        if (ball == null) {
            dist = 1000;
            for (var i = 0; i < Game.instance.activeScene.all_objects.length; i++) {
                var obj = Game.instance.activeScene.all_objects[i];
                if (obj instanceof Ball) {
                    var cball = obj;
                    if (cball.velocity.x < 0) {
                        if (cball.position.x < dist) {
                            dist = cball.position.x;
                            ball = cball;
                        }
                    }
                }
            }
        }
        if (InputManager.isPressed(32)) {
            this.player_two = true;
            console.log('player 2 has joined!');
        }
        if (this.player_two == true) {
            if (InputManager.isHeld(38)) {
                this.moveUp();
            }
            if (InputManager.isHeld(40)) {
                this.moveDown();
            }
        }
        else {
            Game.drawText(new Vector(Game.canvas.width / 2 - 200, Game.canvas.height - 10), "rgb(0,0,0)", "20px Arial", "50", "Press spacebar to activate 2 player mode");
            var sBall = { position: ball.position.getCopy(), velocity: ball.velocity.getCopy() };
            for (var i = 0; i < this.prediction_frames; i++) {
                sBall.position = sBall.position.add(sBall.velocity);
                if (sBall.position.x >= Game.canvas.width) {
                    sBall.velocity.x *= -1;
                }
                if (sBall.position.x <= 0) {
                    sBall.velocity.x *= -1;
                }
                if (sBall.position.y >= Game.canvas.height) {
                    sBall.velocity.y *= -1;
                }
                if (sBall.position.y <= 0) {
                    sBall.velocity.y *= -1;
                }
                if (MainGame.settings.see_enemy)
                    Game.drawText(sBall.position, "rgb(0,0,0)", "10px Arial", "1", ".");
                if (sBall.position.x >= this.position.x)
                    break;
            }
            if (sBall.position.y >= this.position.y + (this.sprite.image.height / 2)) {
                this.moveDown();
            }
            if (sBall.position.y <= this.position.y - (this.sprite.image.height / 2)) {
                this.moveUp();
            }
        }
        _super.prototype.update.call(this);
    };
    return Enemy;
}(Bat));
var Listener = (function () {
    function Listener(context) {
        this.context = context;
    }
    Listener.prototype.notify = function () {
        this.callback && this.callback.call(this.context);
    };
    return Listener;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Player.prototype.update = function () {
        if (InputManager.isHeld(83)) {
            this.moveDown();
        }
        if (InputManager.isHeld(87)) {
            this.moveUp();
        }
        _super.prototype.update.call(this);
    };
    return Player;
}(Bat));
var Score = (function () {
    function Score() {
        this.RListner = new Listener(this);
        this.lListner = new Listener(this);
        this.RListner.callback = function () {
            Score.player1_score += 1;
        };
        this.lListner.callback = function () {
            Score.player2_score += 1;
        };
    }
    Object.defineProperty(Score, "instance", {
        get: function () {
            if (Score._instance == null)
                Score._instance = new Score();
            return Score._instance;
        },
        enumerable: true,
        configurable: true
    });
    Score.player1_score = 0;
    Score.player2_score = 0;
    return Score;
}());
var UpgradeBlock = (function (_super) {
    __extends(UpgradeBlock, _super);
    function UpgradeBlock(position) {
        return _super.call(this, position, SpriteLoader.upgradeBlock) || this;
    }
    UpgradeBlock.prototype.onCollision = function (object_other) {
        _super.prototype.onCollision.call(this, object_other);
        var upgrade = RandomUpgradeFactory.randomUpgrade(object_other);
    };
    return UpgradeBlock;
}(Block));
var TileMaker = (function () {
    function TileMaker(columns, upgrade_amount) {
        if (MainGame.settings.upgrade_blocks == false) {
            upgrade_amount = 0;
        }
        if (MainGame.settings.blocks == true) {
            for (var x = 0; x < columns; x++) {
                for (var y = 0; y < 10; y++) {
                    var pos = new Vector(Game.canvas.width / 2 - (columns / 2) * 20 + x * 20, 25 + 50 * y);
                    if (pos.distanceTo(new Vector(pos.x, Game.canvas.height / 2)) > 50) {
                        this.rand = Math.floor(Math.random() * 2) + 1;
                        if (this.rand == 1) {
                            var block = new Block(pos);
                        }
                        else {
                            if (upgrade_amount != 0) {
                                upgrade_amount--;
                                var upgrade_block = new UpgradeBlock(pos);
                            }
                            else {
                                var block = new Block(pos);
                            }
                        }
                    }
                }
            }
        }
    }
    return TileMaker;
}());
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(position, text) {
        var _this = _super.call(this, position.x, position.y, SpriteLoader.check_off) || this;
        _this._checked = false;
        _this.text = "";
        _this.text = text;
        return _this;
    }
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (newStatus) {
            this._checked = newStatus;
            this.sprite = this._checked ? SpriteLoader.check_on : SpriteLoader.check_off;
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.onClick = function () {
        this.checked = !this.checked;
    };
    Checkbox.prototype.draw = function () {
        _super.prototype.draw.call(this);
        Game.drawText(this.position.add(new Vector(20, 5)), "rgb(0,0,0)", "13px Arial", "not even used", this.text);
    };
    return Checkbox;
}(GameObject));
var GameSettings = (function () {
    function GameSettings() {
        this.blocks = true;
        this.upgrade_blocks = true;
        this.base_ball_speed = 4;
        this.bat_sprite = SpriteLoader.bat;
        this.multi_ball = false;
        this.see_enemy = false;
        this.hard_mode = false;
        this.quickBats = false;
        this.slowBats = false;
    }
    return GameSettings;
}());
var GameSettingsDecorator = (function (_super) {
    __extends(GameSettingsDecorator, _super);
    function GameSettingsDecorator(parent) {
        var _this = _super.call(this) || this;
        _this.parent = null;
        _this.parent = parent;
        _this.applySettingsRecursively(_this);
        return _this;
    }
    GameSettingsDecorator.prototype.applySettingsRecursively = function (target) {
        if (this.parent instanceof GameSettingsDecorator) {
            this.parent.applySettingsRecursively.call(this.parent, target);
        }
        this.applySettings.call(target);
    };
    return GameSettingsDecorator;
}(GameSettings));
var WideBatsMutator = (function (_super) {
    __extends(WideBatsMutator, _super);
    function WideBatsMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WideBatsMutator.prototype.applySettings = function () {
        this.bat_sprite = SpriteLoader.wide_bat;
    };
    return WideBatsMutator;
}(GameSettingsDecorator));
var FastBallMutator = (function (_super) {
    __extends(FastBallMutator, _super);
    function FastBallMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastBallMutator.prototype.applySettings = function () {
        this.base_ball_speed *= 2;
    };
    return FastBallMutator;
}(GameSettingsDecorator));
var HardModeMutator = (function (_super) {
    __extends(HardModeMutator, _super);
    function HardModeMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HardModeMutator.prototype.applySettings = function () {
        this.hard_mode = true;
    };
    return HardModeMutator;
}(GameSettingsDecorator));
var QuickBatMutator = (function (_super) {
    __extends(QuickBatMutator, _super);
    function QuickBatMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickBatMutator.prototype.applySettings = function () {
        this.quickBats = true;
    };
    return QuickBatMutator;
}(GameSettingsDecorator));
var SlowBatMutator = (function (_super) {
    __extends(SlowBatMutator, _super);
    function SlowBatMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlowBatMutator.prototype.applySettings = function () {
        this.slowBats = true;
    };
    return SlowBatMutator;
}(GameSettingsDecorator));
var SeeEnemyMutator = (function (_super) {
    __extends(SeeEnemyMutator, _super);
    function SeeEnemyMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeeEnemyMutator.prototype.applySettings = function () {
        this.see_enemy = true;
    };
    return SeeEnemyMutator;
}(GameSettingsDecorator));
var StartButton = (function (_super) {
    __extends(StartButton, _super);
    function StartButton(position, mGame) {
        var _this = _super.call(this, position.x, position.y, SpriteLoader.start_btn) || this;
        _this.mainGame = mGame;
        return _this;
    }
    StartButton.prototype.onClick = function () {
        _super.prototype.onClick.call(this);
        this.mainGame.startGame();
    };
    return StartButton;
}(GameObject));
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score_limit = 10;
        return _this;
    }
    MainGame.prototype.gameStart = function () {
        this.create_menu_scene();
    };
    MainGame.prototype.create_menu_scene = function () {
        this.game_screen = false;
        Score.player1_score = 0;
        Score.player2_score = 0;
        this.activeScene = new Scene();
        this.hard_mode = new Checkbox(new Vector(50, Game.canvas.height - 75), "hardmode");
        this.see_enemy = new Checkbox(new Vector(50, Game.canvas.height - 125), "see AI thoughts");
        this.multi_ball = new Checkbox(new Vector(50, Game.canvas.height - 175), "multi ball");
        this.fast_ball = new Checkbox(new Vector(50, Game.canvas.height - 225), "fast ball");
        this.wide_bats = new Checkbox(new Vector(50, Game.canvas.height - 275), "wide bats ");
        this.upgrade_blocks = new Checkbox(new Vector(50, Game.canvas.height - 325), "no upgrade blocks");
        this.no_blocks = new Checkbox(new Vector(50, Game.canvas.height - 375), "no blocks");
        this.quickBats = new Checkbox(new Vector(150, Game.canvas.height - 425), "sonicmode");
        this.slowBats = new Checkbox(new Vector(150, Game.canvas.height - 475), "eggmode");
        var startBtn = new StartButton(new Vector(Game.canvas.width / 2, Game.canvas.height - 100), this);
    };
    MainGame.prototype.create_game_scene = function () {
        this.game_screen = true;
        this.activeScene = new Scene();
        var ball = new Ball(new Vector(Game.canvas.width / 2, Game.canvas.height / 2));
        var enemy = new Enemy();
        var player1 = new Player(50, Game.canvas.height / 2);
        this.tiles = new TileMaker(10, 30);
        if (MainGame.settings.multi_ball) {
            var ball2 = new Ball(new Vector(Game.canvas.width / 2 - 50, Game.canvas.height / 2));
            var ball3 = new Ball(new Vector(Game.canvas.width / 2 + 50, Game.canvas.height / 2));
        }
    };
    MainGame.prototype.create_game_over_scene = function () {
        console.log("GAME OVER BOI");
        this.activeScene = new Scene();
        if (Score.player1_score > Score.player2_score) {
            Game.drawText(new Vector((Game.canvas.width / 2) - 60, 100), "rgb(0,0,0)", "20px Arial", "50", "Player 1 wins!");
        }
        else if (Score.player1_score < Score.player2_score) {
            Game.drawText(new Vector((Game.canvas.width / 2) - 60, 200), "rgb(0,0,0)", "20px Arial", "50", "Player 2 wins!");
        }
        else {
            Game.drawText(new Vector(100, 100), "rgb(0,0,0)", "20px Arial", "50", "ITS A DRAW!!!");
        }
        var startBtn = new MenuButton(new Vector(Game.canvas.width / 2, Game.canvas.height - 100), this);
    };
    MainGame.prototype.startGame = function () {
        this.reloadMutators();
        this.create_game_scene();
    };
    MainGame.prototype.update = function () {
        _super.prototype.update.call(this);
        if ((Score.player1_score >= this.score_limit || Score.player2_score >= this.score_limit)) {
            this.create_game_over_scene();
        }
        if (this.game_screen == true) {
            Game.drawText(new Vector((Game.canvas.width - 50) / 2, 25), "rgb(0,0,0)", "20px Arial", "50", Score.player1_score + ' | ' + Score.player2_score);
        }
        if (this.quickBats.checked)
            this.slowBats.checked = false;
    };
    MainGame.prototype.reloadMutators = function () {
        MainGame.settings = new GameSettings();
        if (this.fast_ball.checked) {
            MainGame.settings = new FastBallMutator(MainGame.settings);
        }
        if (this.wide_bats.checked) {
            MainGame.settings = new WideBatsMutator(MainGame.settings);
        }
        if (this.no_blocks.checked) {
            MainGame.settings = new NoBlocksMutator(MainGame.settings);
        }
        if (this.upgrade_blocks.checked) {
            MainGame.settings = new NoUpgradeBlocksMutator(MainGame.settings);
        }
        if (this.multi_ball.checked) {
            MainGame.settings = new MultiBallMutator(MainGame.settings);
        }
        if (this.see_enemy.checked) {
            MainGame.settings = new SeeEnemyMutator(MainGame.settings);
        }
        if (this.hard_mode.checked) {
            MainGame.settings = new HardModeMutator(MainGame.settings);
        }
        if (this.quickBats.checked) {
            MainGame.settings = new QuickBatMutator(MainGame.settings);
        }
        if (this.slowBats.checked) {
            MainGame.settings = new SlowBatMutator(MainGame.settings);
        }
    };
    MainGame.prototype.draw = function () {
        Game.drawText(new Vector(100, 100), "rgb(0,0,0)", "20px Arial", "50", Score.player1_score + ' | ' + Score.player2_score);
        _super.prototype.draw.call(this);
    };
    MainGame.settings = new GameSettings();
    return MainGame;
}(Game));
var game = new MainGame(0, 0, 900, 500);
var MultiBallMutator = (function (_super) {
    __extends(MultiBallMutator, _super);
    function MultiBallMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiBallMutator.prototype.applySettings = function () {
        this.multi_ball = true;
    };
    return MultiBallMutator;
}(GameSettingsDecorator));
var NoBlocksMutator = (function (_super) {
    __extends(NoBlocksMutator, _super);
    function NoBlocksMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoBlocksMutator.prototype.applySettings = function () {
        this.blocks = false;
    };
    return NoBlocksMutator;
}(GameSettingsDecorator));
var NoUpgradeBlocksMutator = (function (_super) {
    __extends(NoUpgradeBlocksMutator, _super);
    function NoUpgradeBlocksMutator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoUpgradeBlocksMutator.prototype.applySettings = function () {
        this.upgrade_blocks = false;
    };
    return NoUpgradeBlocksMutator;
}(GameSettingsDecorator));
var MenuButton = (function (_super) {
    __extends(MenuButton, _super);
    function MenuButton(position, mGame) {
        var _this = _super.call(this, position.x, position.y, SpriteLoader.menu_btn) || this;
        _this.mainGame = mGame;
        return _this;
    }
    MenuButton.prototype.onClick = function () {
        _super.prototype.onClick.call(this);
        this.mainGame.create_menu_scene();
    };
    return MenuButton;
}(GameObject));
//# sourceMappingURL=main.js.map