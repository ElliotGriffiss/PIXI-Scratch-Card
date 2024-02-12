import * as PIXI from 'pixi.js'
import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import settings from "./settings.json";

export class Game {
    private m_app: PIXI.Application;
    private m_curreny = settings.startingCurrency;

    constructor(app: PIXI.Application) {
        this.m_app = app;

        const background = new Background();
        this.m_app.stage.addChild(background);

        const symbolManager = new SymbolManager();
        this.m_app.stage.addChild(symbolManager);
    }
}

export default Game;