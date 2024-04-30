import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TmpState = {
  prop1: string;
  prop2: number;
  prop3: boolean;
};

const initialState: TmpState = {
  prop1: "test",
  prop2: 0,
  prop3: false,
};

const tmpSlice = createSlice({
  name: "tmp",
  initialState: initialState,
  reducers: {
    setProp1: (state, action: PayloadAction<string>) => {
      state.prop1 = action.payload;
    },
    setProp2: (state, action: PayloadAction<number>) => {
      state.prop2 += action.payload;
    },
    setProp3: (state, action: PayloadAction<boolean>) => {
      state.prop3 ||= action.payload;
    },
  },
});

export const { setProp1, setProp2, setProp3 } = tmpSlice.actions;

export default tmpSlice.reducer;
