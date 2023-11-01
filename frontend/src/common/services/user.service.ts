import { sungloApi } from "../lib/api";
import { Invoice } from "../model/invoice.model";
import { Service, Task } from "./interface/calendar.interface";
import IResponse from "./interface/response.interface";
import User from "./interface/user.interface";

const baseUrl = "users";

export const userEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<IResponse<Task>, Task>({
      query: (body) => ({
        url: `${baseUrl}/create-task`,
        method: "POST",
        body,
      }),
    }),
    updateUser: build.mutation<IResponse<User>, User>({
      query: (body) => ({
        url: `${baseUrl}`,
        method: "PATCH",
        body,
      }),
    }),
    fetchUser: build.query<IResponse<User>, void>({
      query: () => `${baseUrl}`,
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateUserMutation,
  useFetchUserQuery
} = userEndpoint;
