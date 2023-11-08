import { sungloApi } from "../lib/api";
import { Invoice } from "../model/invoice.model";
import IGenerateInvoice from "./interface/invoice.interface";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "invoices";

export const invoiceEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    generateInvoice: build.mutation<IResponse<Invoice>, IGenerateInvoice>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    updateInvoice: build.mutation<IResponse<Invoice>, {id: string, body: any}>({
      query: ({id, body}) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    fetchInvoices: build.query<IResponse<Invoice[]>, void>({
      query: () => `${baseUrl}`,
    }),
    fetchOneInvoice: build.query<IResponse<any>, { id: string }>({
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
  useUpdateInvoiceMutation,
  useFetchInvoicesQuery,
  useFetchOneInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoiceEndpoint;
