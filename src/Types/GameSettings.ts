import type {Chance} from "./Chance";

export type GameSettings = {
    stake: number,
    symbolCount: number,
    winCap: number,
    bonus: Chance,
    prizeTable: number[],
    chanceTable: Chance[]
}