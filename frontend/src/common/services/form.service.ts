import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import ILogin from "./interface/auth.interface";
import IResponse from "./interface/response.interface";

const BASE_URL = "forms";

export const formEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createEEPD: build.mutation<IResponse<any>, any>({
      query: (body) => ({
        url: `${BASE_URL}/create-eepd`,
        method: "POST",
        body,
      }),
    }),
    createBACL: build.mutation<IResponse<any>, any>({
      query: (body) => ({
        url: `${BASE_URL}/create-bacl`,
        method: "POST",
        body,
      }),
    }),
    createPFECL: build.mutation<IResponse<any>, any>({
      query: (body) => ({
        url: `${BASE_URL}/create-pfecl`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateEEPDMutation, useCreateBACLMutation, useCreatePFECLMutation } = formEndpoint;
