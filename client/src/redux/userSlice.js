import { createSlice } from "@reduxjs/toolkit";
// reducx toolkit doc.
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, reloadUserData } = userSlice.actions;
