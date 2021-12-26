import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
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

type ModalPayload = {
  isOpen: boolean;
  task?: Task;
};

interface TaskState {
  tasks: Task[];
  modalState: ModalPayload;
}

const initialState: TaskState = {
  tasks: [],
  modalState: { isOpen: false },
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
      state.tasks.push({
        ...action.payload,
        id: state.tasks.length + 1,
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (taskIndex > -1) {
        state.tasks[taskIndex] = action.payload;
        state.modalState.task = action.payload;
      }
    },
    updateTaskStatus: (state, action: PayloadAction<[string, string]>) => {
      const draggedTaskIndex = state.tasks.findIndex(
        (task) => task.id?.toString() === action.payload[0]
      );
      if (draggedTaskIndex > -1) {
        const updatedTask = {
          ...state.tasks[draggedTaskIndex],
          status: parseInt(action.payload[1]),
        };
        state.tasks[draggedTaskIndex] = updatedTask;
      }
    },
    removeTask: (state, action: PayloadAction<Task | undefined>) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload?.id
      );
    },
    removeAllTasks: (state, action: PayloadAction<taskStatus>) => {
      state.tasks = state.tasks.filter(
        (task) => task.status !== action.payload
      );
    },
    setOpenModal: (state, action: PayloadAction<ModalPayload>) => {
      state.modalState = {
        ...action.payload,
        task: action.payload.task || undefined,
      };
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

export const {
  initTasks,
  addTask,
  updateTask,
  updateTaskStatus,
  removeTask,
  removeAllTasks,
  setOpenModal,
} = taskSlice.actions;

export default taskSlice.reducer;
