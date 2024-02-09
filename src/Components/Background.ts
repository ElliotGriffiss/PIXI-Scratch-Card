import { Container, Sprite } from 'pixi.js';

class Background extends Container {
    constructor() {
        super();


        const backgroundSprite = Sprite.from('assets/Background.png');
        this.addChild(backgroundSprite);
    }
}

export default Background;