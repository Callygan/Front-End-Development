import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Player = "X" | "O" | null;

interface GameState {
    board: Player[];
    currentTurn: Player;
    winner: Player | "draw" | null;
    winningLine: number[] | null;
    score: {
        X: number;
        O: number;
    };
}

const initialState: GameState = {
    board: Array(9).fill(null),
    currentTurn: null, // become X when game starts
    winner: null,
    winningLine: null,
    score: {
        X: 0, 
        O: 0,
    },
};

const gameSlice = createSlice({
    name: "game", 
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<number>) {
            const index = action.payload;

            if(state.board[index] || state.winner) return;

            //if is first move, set currentTurn to X
            if(!state.currentTurn) {
                state.currentTurn = "X";
            }

            state.board[index] = state.currentTurn;
            state.currentTurn = state.currentTurn === "X" ? "O" : "X";
        },

        resetGame(state) {
            state.board = Array(9).fill(null);
            state.currentTurn = null;
            state.winner = null;
            state.winningLine = null;
            state.score = { X: 0, O: 0 };
        },

        setWinner(
            state,
            action: PayloadAction<{ winner: Player | "draw"; line: number[] | null }>
        ) {
            state.winner = action.payload.winner;
            state.winningLine = action.payload.line;

            if (action.payload.winner === "X" || action.payload.winner === "O") {
                state.score[action.payload.winner]++;
            }
        },

        clearBoardOnly(state) {
            state.board = Array(9).fill(null);
            state.currentTurn = null;
            state.winner = null;
            state.winningLine = null;
        },
    },
});

export const { makeMove, resetGame, setWinner, clearBoardOnly } = gameSlice.actions;
export default gameSlice.reducer;