import { Dayjs } from "dayjs";
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
    fetchMonthlyHighlight: build.query<IResponse<number[]>, { date: Dayjs}>({
      query: ({date}) => `${baseUrl}/monthhighlight/${date}`,
    }),
    fetchDailyData: build.query<IResponse<number[]>, { date: Dayjs}>({
      query: ({date}) => `${baseUrl}/monthhighlight/${date}`,
    }),
    fetchCalendar: build.query<IResponse<any[]>, { date: Dayjs}>({
      query: ({date}) => `${baseUrl}/${date}`,
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useCreateServiceMutation,
  useFetchMonthlyHighlightQuery,
  useFetchCalendarQuery
} = calendarEndpoint;
