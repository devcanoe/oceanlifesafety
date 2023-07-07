import { sungloApi } from "../lib/api";
import Company from "../model/company.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "company";

export const companyEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createCompany: build.mutation<IResponse<Company>, Company>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    updateCompany: build.mutation<IResponse<Company>, { id: string; body: Company }>({
      query: ({ id, body }) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteCompany: build.mutation<IResponseBase, { id: string }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    getCompanies: build.query<IResponse<Company[]>, void>({
      query: () => `${baseUrl}`,
    }),
    getOneCompany: build.query<IResponse<Company>, {id: string}>({
      query: ({id}) => `${baseUrl}/${id}`,
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useGetOneCompanyQuery
} = companyEndpoint;
