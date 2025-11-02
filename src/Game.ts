import {Container} from "pixi.js";
import {sound} from '@pixi/sound';
import Timings from "./engine/Utils/Timings/Timings";

import Background from "./Components/Background/Background";
import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Bonus from "./Components/Bonus/Bonus";
import RevealAnimation from "./Components/RevealAnimation/RevealAnimation";
import SpinButton from "./Components/SpinButton/SpinButton";
import CreditPanel from "./Components/CreditPanel/CreditPanel";
import StakePlatform from "./Components/LocalPlatform/StakePlatform";

import setting from './app.json';
import {DisplayAmount} from "stake-engine";
import { Currency } from "stake-engine";

class Game extends Container {
    private _stakePlatform: StakePlatform = null;

    private readonly _symbolManager: SymbolManager = null;
    private readonly _bonus: Bonus = null;
    private readonly _revealAnimation: RevealAnimation = null;
    private _creditPanel: CreditPanel = null;
    private readonly _spinButton: SpinButton = null;

    private _credit: number = 0;
    private _currency: Currency = 'USD';

    constructor() {
        super();
        this._stakePlatform = new StakePlatform(setting.gameSettings);

        const background = new Background();
        this._symbolManager = new SymbolManager();
        this._bonus = new Bonus();
        this._revealAnimation = new RevealAnimation();

        this._spinButton = new SpinButton(()=> {this._onSpinButtonPressed()});
        this._spinButton.isActive = false; // Disable until initialized

        sound.play('Main_Theme', {loop: true});

        this.addChild(
            background,
            this._symbolManager,
            this._bonus,
            this._revealAnimation,
            this._spinButton
        );

        // Initialize Stake platform and then create the CreditPanel with real credit
        void this._initializePlatformAndUI();
    }

    private async _initializePlatformAndUI(): Promise<void> {
        try {
            const balance = await this._stakePlatform.initialize();
            this._credit = balance.amount;
            this._currency = balance.currency;

            this._creditPanel = new CreditPanel(DisplayAmount(balance));
            this.addChild(this._creditPanel);

            // Enable spin if the player has enough credit
            if (this._credit >= setting.gameSettings.stake) {
                this._spinButton.isActive = true;
            }
        } catch (e) {
            console.error('Failed to initialize StakePlatform, falling back to starting credit', e);
            this._credit = setting.startingCredit;
            this._creditPanel = new CreditPanel("00.00");
            this.addChild(this._creditPanel);
            this._spinButton.isActive = this._credit >= setting.gameSettings.stake;
        }
    }

    private _onSpinButtonPressed(): void {
        if (this._credit >= setting.gameSettings.stake) {
            this._credit -= setting.gameSettings.stake;
            this._creditPanel.setText(DisplayAmount({ amount: this._credit, currency: this._currency }));

            sound.play('Button_Click');
            void this.playGame();
        }
    }

    async playGame(): Promise<void> {
        this._spinButton.isActive = false;
        this._revealAnimation.reset();

        const betResult = await this._stakePlatform.generateResults();
        this._symbolManager.updateSymbols(betResult.results, betResult.winningIndexes);

        if (betResult.bonusWin) {
            this._bonus.showBonus(setting.gameSettings.bonus.value);
        } else {
            this._bonus.hideBonus();
        }

        await this._revealAnimation.play();

        this._credit = betResult.balance.amount;
        this._creditPanel.setText(DisplayAmount(betResult.balance));

        if (betResult.winAmount > 0) {
            sound.play('Pickup_Coin');
            await Timings.wait(500);

            const balance = await this._stakePlatform.endRound();

            this._credit = balance.amount;
            this._creditPanel.setText(DisplayAmount(balance));
        }

        if (this._credit >= setting.gameSettings.stake) {
            this._spinButton.isActive = true;
        } else {
            sound.stop('Main_Theme');
            sound.play('Game_Over');
        }
        return Promise.resolve();
    }
}

export default Game;