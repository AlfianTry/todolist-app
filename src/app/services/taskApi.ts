import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Task {
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
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getDefaultTasks: builder.query<Task[], void>({
      query: () => "to-do-list",
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const { useGetDefaultTasksQuery } = taskApi;
