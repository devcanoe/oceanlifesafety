import { ticket_status } from "../constants/ticket-status";
import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import Ticket from "../model/ticket.model";
import Type from "../model/type.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "tickets";

export const ticketEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createTicket: build.mutation<IResponse<Ticket>, Ticket>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    getAllTickets: build.query<IResponse<Ticket[]>, void>({
      query: () => `${baseUrl}`,
    }),
    getTicket: build.query<IResponse<Ticket>, { id: string }>({
      query: ({ id }) => `${baseUrl}/${id}`,
    }),
    assignAgent: build.mutation<
      IResponse<Ticket>,
      { id: string; body: { agent: string } }
    >({
      query: ({ id, body }) => ({
        url: `/assignagent/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    changeTicketStatus: build.mutation<
      IResponse<Ticket>,
      { id: string; body: { status: ticket_status } }
    >({
      query: (body) => ({
        url: `${baseUrl}/status`,
        method: "PATCH",
        body,
      }),
    }),
    deleteTicket: build.mutation<IResponseBase, { id: string }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    getTypes: build.query<IResponse<Type>, void>({
      query: () => `/types`,
    }),
    createType: build.mutation<IResponse<Type>, Type>({
      query: (body) => ({
        url: `/types/create`,
        method: "POST",
        body,
      }),
    }),
    updateType: build.mutation<IResponse<Type>, { id: string; body: Type }>({
      query: ({ id, body }) => ({
        url: `/types/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteType: build.mutation<IResponseBase, { id: string }>({
      query: (body) => ({
        url: `/types/${body.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteTypeMutation,
  useGetAllTicketsQuery,
  useChangeTicketStatusMutation,
  useAssignAgentMutation,
  useGetTicketQuery,
  useCreateTicketMutation,
  useDeleteTicketMutation,
  useGetTypesQuery,
  useUpdateTypeMutation,
  useCreateTypeMutation,
} = ticketEndpoint;
