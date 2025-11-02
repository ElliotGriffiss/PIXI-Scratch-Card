import type {BetResult} from "../../Types/BetResult";
import {GameSettings} from "../../Types/GameSettings";
import {RGSClient, Balance} from 'stake-engine';

class StakePlatformError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StakePlatformError";
    }
}

class StakePlatformInitError extends StakePlatformError {
    constructor(message: string, public readonly originalError?: Error) {
        super(`Stake Platform initialization failed: ${message}`);
        this.name = "StakePlatformInitError";
    }
}

class StakePlatformBetError extends StakePlatformError {
    constructor(message: string, public readonly originalError?: Error) {
        super(`Bet placement failed: ${message}`);
        this.name = "StakePlatformBetError";
    }
}

class StakePlatform {
    private readonly _gameSettings: GameSettings = null;
    private _engine: ReturnType<typeof RGSClient> = null;
    private _isInitialized: boolean = false;

    constructor(settings: GameSettings) {
        this._gameSettings = settings;
    }

    private async _initializeEngine(): Promise<void> {
        try {
            this._engine = RGSClient({
                url: window.location.href,
                protocol: process.env.NODE_ENV === "development" ? "http" : "https",
                enforceBetLevels: true
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error("Failed to initialize Stake Platform:", error);
            throw new StakePlatformInitError(message, error instanceof Error ? error : undefined);
        }
    }

    /**
     * Initializes the Stake engine and authenticates the player.
     * Returns the auth payload and extracted credit/balance for convenience.
     */
    public async initialize(): Promise<Balance> {
        try {
            if (!this._engine) {
                await this._initializeEngine();
            }

            const auth = await this._engine.Authenticate();
            if (!auth) {
                throw new Error("Authentication failed");
            }

            this._isInitialized = true;

            return auth.balance;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            throw new StakePlatformInitError(message, error instanceof Error ? error : undefined);
        }
    }

    public isReady(): boolean {
        return this._isInitialized && this._engine !== null;
    }

    public async generateResults(): Promise<BetResult> {
        if (!this.isReady()) {
            throw new StakePlatformError("Stake Platform is not initialized");
        }

        try {
            // Place the bet
            const playResponse = await this._engine.Play({
                amount: this._gameSettings.stake,
                mode: "BASE"
            });

            console.log('Play response', playResponse);

            // Parse the server response - extract state array from round
            const response = playResponse as any;
            const stateArray: any[] = response?.round?.state || [];
            
            // Extract scratch grid data
            const scratchGrid = stateArray.find((item: any) => item.type === 'scratch_grid');
            const grid = scratchGrid?.grid || [];
            
            // Flatten grid to get symbol results [symbol, prize, symbol, prize, ...]
            const results: number[] = [];
            for (const pair of grid) {
                if (Array.isArray(pair) && pair.length === 2) {
                    results.push(Number(pair[0])); // symbol
                    results.push(Number(pair[1])); // prize
                }
            }
            
            // Extract bonus data
            const bonusSpot = stateArray.find((item: any) => item.type === 'bonus_spot');
            const bonusWin = Boolean(bonusSpot?.is_bonus);
            
            // Extract winning symbol info
            const scratchWin = stateArray.find((item: any) => item.type === 'scratch_win');
            const winningSymbol = scratchWin ? Number(scratchWin.symbol) : null;
            
            // Extract winning indexes from winning_positions array
            // winning_positions is an array of [row, col] pairs like [[0,0], [0,1], [2,0]]
            // Convert to flat grid indexes
            const winningIndexes: number[] = [];
            if (scratchWin?.winning_positions && Array.isArray(scratchWin.winning_positions)) {
                for (const position of scratchWin.winning_positions) {
                    if (Array.isArray(position) && position.length === 2) {
                        const row = Number(position[0]);
                        const col = Number(position[1]);
                        // Convert [row, col] to flat index
                        const flatIndex = row * 2 + col; // Assuming 2 columns per row
                        winningIndexes.push(flatIndex);
                    }
                }
            }
            
            // Extract final win amount
            const finalWin = stateArray.find((item: any) => item.type === 'finalWin');
            const winAmount = finalWin ? Number(finalWin.amount) : 0;

            // Extract balance from response
            const balance = response.balance;

            // Convert platform response to our BetResult type
            return {
                winAmount,
                bonusWin,
                results,
                winningIndexes,
                balance
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error("Error generating bet results:", error);
            
            if (error instanceof StakePlatformError) {
                throw error; // Re-throw our custom errors
            }
            
            throw new StakePlatformBetError(message, error instanceof Error ? error : undefined);
        }
    }

    public async endRound(): Promise<Balance> {
        const endRound = await this._engine.EndRound();
        console.log('Round ended', endRound);
        return endRound.balance;
    }
}

export default StakePlatform;