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
    createService: build.mutation<IResponse<Service>, Service>({
      query: (body) => ({
        url: `${baseUrl}/create-servicing`,
        method: "POST",
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
  useCreateServiceMutation,
  useFetchUserQuery
} = userEndpoint;
