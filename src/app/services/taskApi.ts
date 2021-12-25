import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../slices/taskSlice";

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/",
});

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery,
  endpoints: (builder) => ({
    getDefaultTasks: builder.query<Task[], void>({
      query: () => "to-do-list",
      transformResponse: (responses: TaskResponse[]) =>
        responses.map((data) => ({
          ...data,
          createdAt: new Date(data.createdAt),
        })),
    }),
  }),
});

export const { useGetDefaultTasksQuery } = taskApi;
