import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AddMoneySourceModalState = {
  visible: boolean;
};

const initialState: AddMoneySourceModalState = {
  visible: false,
};

const AddMoneySourceModalSlice = createSlice({
  name: "AddMoneySourceModal",
  initialState: initialState,
  reducers: {
    stateToggle: (state, action: PayloadAction<string>) => {
      state.visible = !state.visible;
    },
  },
});

export const { stateToggle } = AddMoneySourceModalSlice.actions;

export default AddMoneySourceModalSlice.reducer;
