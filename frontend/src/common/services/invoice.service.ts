import { sungloApi } from "../lib/api";
import { Invoice } from "../model/invoice.model";
import IGenerateInvoice from "./interface/invoice.interface";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "invoice";

export const invoiceEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    generateInvoice: build.mutation<IResponse<Invoice>, IGenerateInvoice>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    fetchInvoice: build.query<IResponse<Invoice[]>, { id: string }>({
      query: ({ id }) => `${baseUrl}/${id}`,
    }),
    deleteInvoice: build.mutation<IResponseBase, { id: string }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGenerateInvoiceMutation,
  useFetchInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoiceEndpoint;
