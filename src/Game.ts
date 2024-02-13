import * as PIXI from 'pixi.js'
import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";
import Button from "./Components/Button/Button";
import settings from "./settings.json";

export class Game {
    private _app: PIXI.Application;
    private _curreny = settings.startingCurrency;

    constructor(app: PIXI.Application) {
        this._app = app;

        const background = new Background();
        const symbolManager = new SymbolManager();
        const bonus = new Bonus();
        const button = new Button(() => {this.onSpinButtonPressed});

        this._app.stage.addChild(
            background,
            symbolManager,
            bonus,
            button
        );
    }

    onSpinButtonPressed(): void {
        // disable spin button
        this.playGame();
    }

    playGame(): Promise<void> {
        // deduct credit

        // const data = generateData();

        // symbolManager.updateSymbols(data);

        // play reveal animation

        // award wins

        // Reactive spin button

        return Promise.resolve()
    }
}

export default Game;