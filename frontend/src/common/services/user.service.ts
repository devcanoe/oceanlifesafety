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
    addUser: build.mutation<IResponse<User>, User>({
      query: (body) => ({
        url: `${baseUrl}/create`,
        method: "POST",
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
    deleteUser: build.mutation<IResponse<User>, {id: string}>({
      query: ({id}) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE"
      }),
    }),
    fetchUsers: build.query<IResponse<User[]>, void>({
      query: () => `${baseUrl}`,
    }),
    fetchUser: build.query<IResponse<User>, {id: string}>({
      query: ({id}) => `${baseUrl}/${id}`,
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useFetchUsersQuery,
  useFetchUserQuery,
  useAddUserMutation,
  useDeleteUserMutation
} = userEndpoint;
