import {Container, Sprite, Text} from 'pixi.js';

class Bonus extends Container {
    private readonly _text: Text;

    constructor() {
        super();

        const sprite = Sprite.from(global.game.BonusIcon);
        sprite.x = 68;
        sprite.y = 103;

        this._text = new Text({ text: '£5.00', style: {
                fontFamily: 'minecraft-webfont',
                fontSize: 26,
                fill: "white",
                align: 'center',
        }});

        this._text.anchor = {x: 0.5, y: 0.5};
        this._text.x = 92.5;
        this._text.y = 207;

        this.addChild(this._text, sprite);
    }

    showBonus(newText: number): void {
        this._text.text = (`£${newText}`);
        this.visible = true;
    }

    hideBonus(): void {
        this.visible = false;
    }
}
export default Bonus;