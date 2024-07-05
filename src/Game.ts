import {Container} from "pixi.js";
import {sound} from '@pixi/sound';
import Timings from "./engine/Utils/Timings/Timings";

import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";
import RevealAnimation from "./Components/RevealAnimation/RevealAnimation";
import SpinButton from "./Components/SpinButton/SpinButton";
import CreditPanel from "./Components/CreditPanel/CreditPanel";
import LocalPlatform from "./Components/LocalPlatform/LocalPlatform";

import setting from './app.json';

class Game extends Container {
    private _localPlatform: LocalPlatform = null;

    private readonly _symbolManager: SymbolManager = null;
    private readonly _bonus: Bonus = null;
    private readonly _revealAnimation: RevealAnimation = null;
    private readonly _creditPanel: CreditPanel = null;
    private readonly _spinButton: SpinButton = null;

    private _credit: number = setting.startingCredit;

    constructor() {
        super();
        this._localPlatform = new LocalPlatform(setting.gameSettings);

        const background = new Background();
        this._symbolManager = new SymbolManager();
        this._bonus = new Bonus();
        this._revealAnimation = new RevealAnimation();
        this._creditPanel = new CreditPanel(this._credit);

        this._spinButton = new SpinButton(()=> {this._onSpinButtonPressed()});

        sound.play('Main_Theme', {loop: true});

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

            sound.play('Button_Click');
            void this.playGame();
        }
    }

    async playGame(): Promise<void> {
        this._spinButton.isActive = false;
        this._revealAnimation.reset();

        const betResult = await this._localPlatform.generateResults();
        this._symbolManager.updateSymbols(betResult.results, betResult.winningIndexes);

        if (betResult.bonusWin) {
            this._bonus.showBonus(setting.gameSettings.bonus.value);
        } else {
            this._bonus.hideBonus();
        }

        await this._revealAnimation.play();

        this._credit += betResult.winAmount;
        this._creditPanel.setText(this._credit);

        if (betResult.winAmount > 0) {
            sound.play('Pickup_Coin');
            await Timings.wait(500);
        }

        if (this._credit >= setting.stake) {
            this._spinButton.isActive = true;
        } else {
            sound.stop('Main_Theme');
            sound.play('Game_Over');
        }

        return Promise.resolve();
    }
}

export default Game;