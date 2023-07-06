import { sungloApi } from "../lib/api";
import IDashboard from "./interface/dashboard.interface";
import IResponse from "./interface/response.interface";

export const authEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<IResponse<IDashboard>, void>({
      query: () => `/dashboard`,
    }),
  }),
});

export const { useGetDashboardQuery } = authEndpoint;
