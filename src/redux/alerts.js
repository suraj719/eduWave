import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    loading: false,
    name: "Ram",
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = alertSlice.actions;
