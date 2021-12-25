import { createSlice } from "@reduxjs/toolkit";

export enum taskStatus {
  todo = 0,
  done = 1,
}

const initialState = {};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
