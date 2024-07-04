import { Container, Sprite } from 'pixi.js';

class Background extends Container {
    constructor() {
        super();

        const backgroundSprite = Sprite.from(global.game.Background);
        this.addChild(backgroundSprite);
    }
}

export default Background;