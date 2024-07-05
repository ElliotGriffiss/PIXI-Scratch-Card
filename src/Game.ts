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

import setting from './app.json';

class Game extends Container {
    private readonly _symbolManager: SymbolManager = null;
    private readonly _bonus: Bonus = null;
    private readonly _revealAnimation: RevealAnimation = null;
    private readonly _creditPanel: CreditPanel = null;
    private readonly _spinButton: SpinButton = null;

    private _credit: number = setting.startingCredit;

    constructor() {
        super();

        const background = new Background();
        this._symbolManager = new SymbolManager();
        this._bonus = new Bonus();
        this._revealAnimation = new RevealAnimation();
        this._creditPanel = new CreditPanel(this._credit);

        this._spinButton = new SpinButton(()=> {this._onSpinButtonPressed()});

        this.addChild(
            background,
            this._symbolManager,
            this._bonus,
            this._revealAnimation,
            this._creditPanel,
            this._spinButton
        );
    }

    private _onSpinButtonPressed(): void {
        if (this._credit >= setting.stake) {
            this._credit -= setting.stake;
            this._creditPanel.setText(this._credit);

            void this.playGame();
        }
    }

    async playGame(): Promise<void> {
        this._spinButton.isActive = false;

        await this._revealAnimation.play();

        if (this._credit >= setting.stake) {
            this._spinButton.isActive = true;
        }
        return Promise.resolve();
    }
}

export default Game;