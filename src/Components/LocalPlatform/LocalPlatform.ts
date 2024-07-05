import type { Chance } from '../../Types/Chance';
import type { BetResult} from "../../Types/BetResult";

class LocalPlatform {
    private _symbolCount: number = 0;
    private _chanceTable: Chance[] = null;

    constructor(symbolCount: number, chanceTable: Chance[]) {
        this._symbolCount = symbolCount;
        this._chanceTable = chanceTable;
    }

    async generateResults(): Promise<BetResult> {
        const result: BetResult = {
            winAmount: 10,
            results: [5,10,300,100,5,480000,10,2],
            winningIndexes: []
        };

        return result;
    }
}

export default LocalPlatform;