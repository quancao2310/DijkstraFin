import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoginStatusState = {
  isLogin: boolean;
  accessToken: string;
  userId: string;
};

const initialState: LoginStatusState = {
  isLogin: false,
  accessToken: "",
  userId: "",
};

const LoginStatusSlice = createSlice({
  name: "LoginStatus",
  initialState: initialState,
  reducers: {
    stateIsLogin: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
    },
    logOut: (state, action: PayloadAction<string>) => {
      state.isLogin = false;
    },
  },
});

export const { stateIsLogin, logOut } = LoginStatusSlice.actions;

export default LoginStatusSlice.reducer;
