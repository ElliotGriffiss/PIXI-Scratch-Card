import { Container, Text } from 'pixi.js';

class Symbol extends Container {
    private text: Text;

    constructor( x: number, y: number ) {
        super();
        this.x = x;
        this.y = y;

        this.text = new Text('£500.00', {
            fontFamily: 'minecraftia',
            fontSize: 21,
            fill: "white",
            align: 'center',
            padding: 15
        });

        this.addChild(this.text)
    }

    setText(newText: number): void {
        this.text.text = (`£${newText}`);
    }
}

export default Symbol;