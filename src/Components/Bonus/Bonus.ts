import {Container, Sprite, Text} from 'pixi.js';

class Bonus extends Container {
    private _text: Text;

    constructor() {
        super();

        const sprite = Sprite.from('assets/BonusIcon.png');
        sprite.x = 68;
        sprite.y = 103;

        this._text = new Text('£5.00', {
            fontFamily: 'minecraftia',
            fontSize: 21,
            fill: "white",
            align: 'center',
            padding: 15
        })

        this._text.x = 60;
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