import { Container } from 'pixi.js';
import Symbol from '../Symbol/Symbol';
import settings from './SymbolManagerSettings.json';

class SymbolManager extends Container {
    private _symbols: Symbol[];

    constructor() {
        super();

        this._symbols = settings.symbolPositions.map(({x, y}) => {
            const symbol = new Symbol(x, y)
            this.addChild(symbol);
            return symbol;
        })
    }

    updateSymbols(results: number[], winningIndexes: number[]): void {
        this._symbols.forEach((symbol, index) => {
           symbol.setUpSymbol(results[index], winningIndexes.includes(index));
        });
    }
}

export default SymbolManager;