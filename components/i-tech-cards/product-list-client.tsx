"use client";

import Link from "next/link";
import ProductCard from "../shadcn-studio/card/card-12";
import { useGetProductsQuery } from "@/lib/feature/ecommerceApi";

export default function ProductListClient() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <main className="container mx-auto">
        <div className="flex items-center justify-center h-64">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto">
        <div className="flex items-center justify-center h-64 text-red-500">
          Error loading products
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link href={`/products/${product.id}`} key={index}>
            <ProductCard
              id={product.id}
              key={index}
              title={product.title}
              images={product.images[0]}
              price={product.price}
              description={product.description}
              category={product.category}
              slug={product.slug}
            />
          </Link>
        ))}
      </section>
    </main>
  );
}
