"use client";

import { ProductResponse } from "@/lib/type/productResponse";
import Link from "next/link";
import { use } from "react";
import ProductCard from "../shadcn-studio/card/card-12";

export default function ProductListClient({
  fetchProducts,
}: {
  fetchProducts: Promise<ProductResponse[]>;
}) {
  // received data from server to client component
  const products = use(fetchProducts);
  console.log("product in client ", products);
  return (
    <main className="container mx-auto">
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link href={`/products/${product.id}`} key={index}>
            <ProductCard
              id={product.id}
              key={index}
              title={product.title}
              images={product.images}
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
