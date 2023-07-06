import { sungloApi } from "../lib/api";
import Message from "../model/message.model";
import IResponse, { IResponseBase } from "./interface/response.interface";

const baseUrl = "messages";

export const messageEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    postMessage: build.mutation<IResponseBase, Message>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body,
      }),
    }),
    getMessages: build.query<IResponse<Message[]>, { id: string }>({
      query: ({ id }) => `${baseUrl}/${id}`,
    }),
  }),
});

export const { usePostMessageMutation, useGetMessagesQuery } = messageEndpoint;
