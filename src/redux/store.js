import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";
import { teacherSlice } from "./teachers";
import { studentSlice } from "./students";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  teacher: teacherSlice.reducer,
  student: studentSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
