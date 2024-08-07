import { Container, Text } from 'pixi.js';

class Symbol extends Container {
    private readonly _text: Text;

    constructor( x: number, y: number ) {
        super();
        this.x = x;
        this.y = y;

        this._text = new Text({text: '£500.00', style: {
            fontFamily: 'minecraft-webfont',
            fontSize: 26,
            fill: "white",
            align: 'center',
            padding: 15
        }});
        this._text.anchor = {x: 0.5, y: 0.5};

        this.addChild(this._text)
    }

    setUpSymbol(newText: number, isWin: boolean): void {
        this._text.text = (`£${newText.toLocaleString()}`);

        if (isWin) {
            this._text.tint = "yellow";
        } else {
            this._text.tint = "white";
        }
    }
}

export default Symbol;