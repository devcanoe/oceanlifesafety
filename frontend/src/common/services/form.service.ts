import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import Form from "../model/form.model";
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
    getForms: build.query<IResponse<Form>, { id: string | undefined }>({
      query: ({ id }) => `${BASE_URL}/company/${id}`,
    }),
    getForm: build.query<IResponse<Form>, { id: string | undefined }>({
      query: ({ id }) => `${BASE_URL}/one/${id}`,
    }),
    deleteForm: build.mutation<IResponse<any>, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateForm: build.mutation<IResponse<any>, { id: string; body: Form }>({
      query: ({ id, body }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useCreateEEPDMutation,
  useCreateBACLMutation,
  useCreatePFECLMutation,
  useGetFormsQuery,
  useGetFormQuery,
  useDeleteFormMutation,
  useUpdateFormMutation,
} = formEndpoint;
