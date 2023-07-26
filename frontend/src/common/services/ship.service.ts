import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import Ship from "../model/ship.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "ships";

export const shipEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createShip: build.mutation<IResponse<Ship>, Ship>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    updateShip: build.mutation<
      IResponse<Ship>,
      { id: string | undefined; body: Ship }
    >({
      query: ({ id, body }) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteShip: build.mutation<IResponseBase, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    getAllShips: build.query<IResponse<Ship[]>, { id: string | undefined }>({
      query: ({ id }) => `${baseUrl}/company/${id}`,
    }),
    getShip: build.query<IResponse<Ship>, { id: string | undefined }>({
      query: ({ id }) => `${baseUrl}/${id}`,
    }),
  }),
});

export const {
  useCreateShipMutation,
  useDeleteShipMutation,
  useUpdateShipMutation,
  useGetAllShipsQuery,
  useGetShipQuery,
} = shipEndpoint;
