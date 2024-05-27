import { apiSlice } from ".";
import { Category } from "../types/category.type";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: body,
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
    }),
    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ _id, ...body }) => ({
        url: `/categories/${_id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
