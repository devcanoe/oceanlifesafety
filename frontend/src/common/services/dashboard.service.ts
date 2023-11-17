import { sungloApi } from "../lib/api";
import IDashboard from "./interface/dashboard.interface";
import IResponse from "./interface/response.interface";

export const authEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<IResponse<any>, void>({
      query: () => `/dashboard`,
    }),
    search: build.query<IResponse<any>, {invoice_id: any}>({
      query: ({invoice_id}) => `/search/${invoice_id}`,
    }),
  }),
});

export const { 
  useGetDashboardQuery,
  useSearchQuery
} = authEndpoint;
