import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../type/productResponse";

export const BASE_URL = process.env.NEXT_PUBLIC_API;
const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse[], void>({
      query: () => "/api/v1/products",
    }),
  }),
});

export const { useGetProductsQuery } = ecommerceApi;
