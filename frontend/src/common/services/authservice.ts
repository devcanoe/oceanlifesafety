import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import ILogin from "./interface/auth.interface";
import IResponse from "./interface/response.interface";

export const authEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IResponse<Account>, ILogin>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authEndpoint;
