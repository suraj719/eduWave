import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: null,
  },
  reducers: {
    SetTeacher: (state, action) => {
      state.teacher = action.payload;
    },
  },
});

export const { SetTeacher } = teacherSlice.actions;
