import {Container, Text} from "pixi.js";

class CreditPanel extends Container {
    private readonly _text: Text;

    constructor(startingCredit: number) {
        super();
        this.x = 183;
        this.y = 276;

        this._text = new Text({ text: '£5.00', style: {
                fontFamily: 'minecraft-webfont',
                fontSize: 26,
                fill: "white",
                align: 'center',
            }});
        this._text.anchor = {x: 0.5, y: 0.5};

        this.addChild(this._text);
        this.setText(startingCredit);
    }

    setText(text: number): void {
        this._text.text = (`£${text}`);
    }

}

export default CreditPanel;