import { sungloApi } from "../lib/api";
import { Invoice } from "../model/invoice.model";
import { Service, Task } from "./interface/calendar.interface";
import IResponse from "./interface/response.interface";

const baseUrl = "calendar";

export const calendarEndpoint = sungloApi.injectEndpoints({
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
    fetchInvoices: build.query<IResponse<Invoice[]>, void>({
      query: () => `${baseUrl}`,
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useCreateServiceMutation
} = calendarEndpoint;