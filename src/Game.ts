import * as PIXI from 'pixi.js'
import Background from "./Components/Background";

export class Game {
    private m_app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.m_app = app;

        const background = new Background();

        this.m_app.stage.addChild(background);
    }
}

export default Game;