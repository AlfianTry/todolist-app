import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

const BASE_URL = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/";

export const getDefaultTasks = createAsyncThunk(
  "task/getDefaultTasks",
  async () => {
    const response = await axios.get(`${BASE_URL}to-do-list`);
    return response.data;
  }
);
