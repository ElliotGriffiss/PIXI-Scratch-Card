import type {BetResult} from "../../Types/BetResult";
import {GameSettings} from "../../Types/GameSettings";

class LocalPlatform {
    private readonly _gameSettings: GameSettings = null;

    constructor(settings: GameSettings) {
        this._gameSettings = settings;
    }

    async generateResults(): Promise<BetResult> {
        let winAmount: number = 0;
        const results = new Array(this._gameSettings.symbolCount).fill(null);
        const winningIndexes: number[] = [];

        const wins: number[] = [];

        this._gameSettings.chanceTable.forEach((chance)=> {
            // Cap the number of wins to prevent wins from being overridden.
            // This also means higher paying wins will take priority.
            if (wins.length < this._gameSettings.winCap) {
                const win = this._randomRange(1, chance.oddsIn1) === 1;

                if (win) {
                    wins.push(chance.value);
                    winAmount+= chance.value;
                }
            }
        });

        wins.forEach((win)=> {
            for (let i = 0; i < 3; i++) {
                let randomIndex = this._randomRange(0, results.length);

                while (results[randomIndex] !== null) {
                    for (let i = 0; i < 3; i++) {
                        randomIndex = this._randomRange(0, results.length)
                    }
                }

                winningIndexes.push(randomIndex);
                results[randomIndex] = win;
            }
        });

        while (results.includes(null)) {
            for (let i = 0; i < results.length; i++) {
                if (results[i] === null) {
                    let result = this._gameSettings.prizeTable[this._randomRange(0, this._gameSettings.prizeTable.length)];

                    // Gets the count of results already in the array, this prevents us from accidentally creating wins
                    // Not accounted for in the chance table.
                    while (results.filter(x => x === result).length >= 2) {
                        result = this._gameSettings.prizeTable[this._randomRange(0, this._gameSettings.prizeTable.length)];
                    }

                    results[i] = result;
                }
            }
        }

        // Handles the bonus feature.
        const bonusWin = this._randomRange(1, this._gameSettings.bonus.oddsIn1) === 1;
        if (bonusWin) {
            winAmount+= this._gameSettings.bonus.value;
        }

        const betResult: BetResult = {
            winAmount: winAmount,
            bonusWin: bonusWin,
            results: results,
            winningIndexes: winningIndexes
        };

        return betResult;
    }

    private _randomRange(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}

export default LocalPlatform;