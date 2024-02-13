import {Container, Sprite} from 'pixi.js';

class Button extends Container {
    private _isActive: boolean = true;

    private _activeSprite: Sprite;
    private _pressedSprite : Sprite;
    private _inactiveSprite: Sprite;

    private _buttonPayload:Function;

    constructor(buttonPayload:Function) {
        super();
        this._buttonPayload = buttonPayload;

        this.x = 292;
        this.y = 254;

        this._activeSprite = Sprite.from('assets/SpinButton/Active.png')
        this._pressedSprite = Sprite.from('assets/SpinButton/Pressed.png')
        this._inactiveSprite = Sprite.from('assets/SpinButton/Inactive.png')

        this.eventMode = 'static';

        this._pressedSprite.visible = false;
        this._inactiveSprite.visible = false;

        this.addChild(this._activeSprite, this._pressedSprite, this._inactiveSprite)

        this.on("pointerup", this._onButtonReleased, this);
        this.on("pointerdown", this._onButtonPressed, this);
    }

    set isActive(active: boolean) {
        this._isActive = active;

        this._activeSprite.visible = active;
        this._inactiveSprite.visible = !active;
    }

    private _onButtonReleased(): void {
        if (this._isActive) {
            this._activeSprite.visible = true;
            this._pressedSprite.visible = false;
            this._buttonPayload();
        }
    }

    private _onButtonPressed(): void {
        if (this._isActive) {
            this._activeSprite.visible = false;
            this._pressedSprite.visible = true;
        }
    }
}

export default Button;