import { Balance } from "stake-engine"

export type BetResult = {
    winAmount: number,
    bonusWin: boolean,
    results: number[],
    winningIndexes: number[],
    balance: Balance
}