// auth.ts
import { apiSlice } from ".";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    postRegister: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApiSlice;
