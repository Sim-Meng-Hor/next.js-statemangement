import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "@/lib/type/productResponse";

export type CreateProductRequest = {
  title: string;
  price: number;
  description: string;
  slug: string;
  image: string;
  categoryId: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API;
export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/api/v1/products",
      providesTags: ["Products"],
    }),
    deleteAllProducts: builder.mutation<void, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const productsResult = await baseQuery({
          url: "/api/v1/products",
          method: "GET",
        });

        if (productsResult.error) {
          return { error: productsResult.error };
        }

        const products = productsResult.data as ProductResponse[];

        for (const product of products) {
          const deleteResult = await baseQuery({
            url: `/api/v1/products/${product.id}`,
            method: "DELETE",
          });

          if (deleteResult.error) {
            return { error: deleteResult.error };
          }
        }

        return { data: undefined };
      },
      // Optimistic update: clear the cached products immediately so the UI
      // reflects the deletion in real time. If the mutation fails, rollback.
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ecommerceApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              draft.splice(0, draft.length);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Products"],
    }),
    createProduct: builder.mutation<ProductResponse, CreateProductRequest>({
      query: (body) => ({
        url: "/api/v1/products",
        method: "POST",
        body: {
          title: body.title,
          price: body.price,
          description: body.description,
          slug: body.slug,
          images: [body.image],
          categoryId: body.categoryId,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteAllProductsMutation,
  useCreateProductMutation,
} = ecommerceApi;
