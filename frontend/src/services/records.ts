import { apiSlice } from ".";
import { Record } from "../types/record.type";

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRecord: builder.mutation<Record, Partial<Record>>({
      query: body => ({
        url: "/records",
        method: "POST",
        body: body,
      }),
    }),
    getRecords: builder.query<Record[], void>({
      query: () => "/records",
    }),
    getRecordById: builder.query<Record, string>({
      query: id => `/records/${id}`,
    }),
    updateRecord: builder.mutation<Record, Partial<Record>>({
      query: ({ _id, ...body }) => ({
        url: `/records/${_id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteRecord: builder.mutation<Record, string>({
      query: id => ({
        url: `/records/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRecordMutation,
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = recordsApiSlice;
