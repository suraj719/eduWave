import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,
  },
  reducers: {
    SetStudent: (state, action) => {
      state.student = action.payload;
    },
  },
});

export const { SetStudent } = studentSlice.actions;
