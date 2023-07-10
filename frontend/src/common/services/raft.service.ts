import { sungloApi } from "../lib/api";
import Account from "../model/company.model";
import Raft from "../model/raft.model";
import Ship from "../model/ship.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "rafts";

export const raftEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    createRaft: build.mutation<IResponse<Raft>, Account>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    deleteRaft: build.mutation<IResponseBase, { id: string }>({
      query: ({ id }) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    getAllRafts: build.query<IResponse<Raft[]>, { id: string }>({
      query: ({id}) => `${baseUrl}/s/${id}`,
    }),
  }),
});

export const {
  useCreateRaftMutation,
  useDeleteRaftMutation,
  useGetAllRaftsQuery
} = raftEndpoint;
