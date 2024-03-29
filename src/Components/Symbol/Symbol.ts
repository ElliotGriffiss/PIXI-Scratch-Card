import { Container, Text } from 'pixi.js';

class Symbol extends Container {
    private _text: Text;

    constructor( x: number, y: number ) {
        super();
        this.x = x;
        this.y = y;

        this._text = new Text('£500.00', {
            fontFamily: 'minecraftia',
            fontSize: 21,
            fill: "white",
            align: 'center',
            padding: 15
        });

        this.addChild(this._text)
    }

    setText(newText: number): void {
        this._text.text = (`£${newText}`);
    }
}

export default Symbol;