import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type PositionType = {
	id: number;
	name: string;
};

export type PositionState = {
	positions: PositionType[];
};

const initialState: PositionState = {
	positions: [],
};

export const positionSlice = createSlice({
	name: "position",
	initialState,
	reducers: {
		setPositions: (state, action: PayloadAction<PositionState>) => {
			state.positions = action.payload.positions;
		},
	},
});

export const { setPositions } = positionSlice.actions;

export default positionSlice.reducer;
