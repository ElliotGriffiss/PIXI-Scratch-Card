import {Container, Sprite, Text} from 'pixi.js';

class Bonus extends Container {
    private text: Text;

    constructor() {
        super();

        const sprite = Sprite.from('assets/BonusIcon.png');
        sprite.x = 68;
        sprite.y = 103;

        this.text = new Text('£5.00', {
            fontFamily: 'minecraftia',
            fontSize: 21,
            fill: "white",
            align: 'center',
            padding: 15
        })

        this.text.x = 60;
        this.text.y = 207;

        this.addChild(this.text, sprite);
    }

    showBonus(newText: number): void {
        this.text.text = (`£${newText}`);
        this.visible = true;
    }

    hideBonus(): void {
        this.visible = false;
    }
}

export default Bonus;