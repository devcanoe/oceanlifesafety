import { sungloApi } from "../lib/api";
import IResponse, { IResponseBase } from "./interface/response.interface";
import User from "./interface/user.interface";

const baseUrl = "users";

export const userEndpoint = sungloApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<IResponseBase, {password: string, confirmpassword: string}>({
      query: (body) => ({
        url: `${baseUrl}/changepassword`,
        method: "PATCH",
        body,
      }),
    }),
    updateUser: build.mutation<IResponse<User>, User>({
      query: (body) => ({
        url: `${baseUrl}`,
        method: "PATCH",
        body,
      }),
    }),
    fetchUser: build.query<IResponse<User>, void>({
      query: () => `${baseUrl}`,
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useFetchUserQuery
} = userEndpoint;
