import type {Chance} from "./Chance";

export type GameSettings = {
    symbolCount: number,
    winCap: number,
    bonus: Chance,
    prizeTable: number[],
    chanceTable: Chance[]
}