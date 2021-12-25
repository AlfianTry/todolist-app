import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultTasks, TaskResponse } from "../services/taskApi";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: number;
  createdAt: Date;
}

export enum taskStatus {
  todo = 0,
  done = 1,
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    initTasks: (state, action: PayloadAction<Task[]>) => {
      return {
        ...state,
        tasks: action.payload,
      };
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDefaultTasks.fulfilled, (state, action) => {
      state.tasks = (action.payload as TaskResponse[]).map((response) => ({
        ...response,
        createdAt: new Date(response.createdAt),
      }));
    });
  },
});

export const { initTasks, addTask } = taskSlice.actions;

export default taskSlice.reducer;
