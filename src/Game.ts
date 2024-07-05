import {Container, Sprite, Text} from "pixi.js";
import {sound} from '@pixi/sound';
import gsap from "gsap";

import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";
import Timings from "./engine/Utils/Timings/Timings";

import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";
import CreditPanel from "./Components/CreditPanel/CreditPanel";

class Game extends Container {
    private _credit: number = 10;

    constructor() {
        super();

        const background = new Background();
        const symbolManager = new SymbolManager();
        const bonus = new Bonus();
        const creditPanel = new CreditPanel();
        creditPanel.setText(this._credit);

        const spinButton = this._createSpinButton();

        this.addChild(
            background,
            symbolManager,
            bonus,
            creditPanel,
            spinButton
        );
    }

    private _createSpinButton(): Button {
        const spinButton = new Button(()=> {this.onSpinButtonPressed()},
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            });
        spinButton.x = 292;
        spinButton.y = 254;

        return spinButton;
    }

    onSpinButtonPressed(): void {
        void this.playGame();
    }

    playGame(): Promise<void> {
        return Promise.resolve();
    }
}

export default Game;