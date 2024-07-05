import {Container, Sprite, Text} from "pixi.js";
import {sound} from '@pixi/sound';
import gsap from "gsap";

import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";
import Timings from "./engine/Utils/Timings/Timings";

import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";
import RevealAnimation from "./Components/RevealAnimation/RevealAnimation";
import SpinButton from "./Components/SpinButton/SpinButton";
import CreditPanel from "./Components/CreditPanel/CreditPanel";

class Game extends Container {
    private _credit: number = 10;

    constructor() {
        super();

        const background = new Background();
        const symbolManager = new SymbolManager();
        const bonus = new Bonus();
        const revealAnimation = new RevealAnimation();

        const creditPanel = new CreditPanel();
        creditPanel.setText(this._credit);

        const spinButton = new SpinButton(()=> {this._onSpinButtonPressed()});

        this.addChild(
            background,
            symbolManager,
            bonus,
            revealAnimation,
            creditPanel,
            spinButton
        );
    }

    private _onSpinButtonPressed(): void {
        void this.playGame();
    }

    playGame(): Promise<void> {
        return Promise.resolve();
    }
}

export default Game;