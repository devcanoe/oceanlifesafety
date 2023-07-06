import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import Ship from "../model/ship.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "ships";

export const shipEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createShip: build.mutation<IResponse<Ship>, Account>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    deleteShip: build.mutation<IResponseBase, { id: string }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    getAllShips: build.query<IResponse<Ship[]>, { id: string }>({
      query: ({id}) => `${baseUrl}/company/${id}`,
    }),
  }),
});

export const {
  useCreateShipMutation,
  useDeleteShipMutation,
  useGetAllShipsQuery
} = shipEndpoint;
