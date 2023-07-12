import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "./store";

export interface BaseModel {
  status: number;
  message: string;
}

export const sungloApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oceanlifeservice.onrender.com/api/v2/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the state,
      const token: string = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
