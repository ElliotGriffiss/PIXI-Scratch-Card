import {Container, Sprite, Texture} from 'pixi.js';

type buttonSettings = {
    active?: Texture;
    pressed?: Texture;
    inactive?: Texture;
}

class Button extends Container {
    private _isActive: boolean = true;

    private readonly _activeSprite: Sprite;
    private readonly _pressedSprite : Sprite;
    private readonly _inactiveSprite: Sprite;

    private readonly _buttonPayload: () => void;

    constructor(buttonPayload:() => void, constructor: buttonSettings) {
        super();
        this._buttonPayload = buttonPayload;

        this._activeSprite = Sprite.from(constructor.active);
        this._pressedSprite = Sprite.from(constructor.pressed);
        this._inactiveSprite = Sprite.from(constructor.inactive);

        this.eventMode = 'static';
        this.cursor = 'Pointer';

        this._pressedSprite.visible = false;
        this._inactiveSprite.visible = false;

        this.addChild(this._activeSprite, this._pressedSprite, this._inactiveSprite);

        this.on("pointerup", this._onButtonReleased, this);
        this.on("pointerdown", this._onButtonPressed, this);
        this.on("pointerout", this._cancel, this);
    }

    set isActive(active: boolean) {
        this._isActive = active;

        this._activeSprite.visible = active;
        this._inactiveSprite.visible = !active;

        (this._isActive) ? this.cursor = 'Pointer' : this.cursor = 'default';
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

    private _cancel(): void {
        if (this._isActive) {
            this._activeSprite.visible = true;
            this._pressedSprite.visible = false;
        }
    }
}

export default Button;