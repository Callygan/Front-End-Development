import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ChatPlayer = "X" | "O";

export interface Message {
    player: ChatPlayer;
    text: string;
    timestamp: number;
}

interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
        resetChat(state) {
            state.messages = [];
        },
    },
});

export const { sendMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;