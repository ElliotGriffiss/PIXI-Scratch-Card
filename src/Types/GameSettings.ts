import type {Chance} from "./Chance";

export type GameSettings = {
    symbolCount: number,
    winCap: number,
    prizeTable: number[],
    chanceTable: Chance[]
}