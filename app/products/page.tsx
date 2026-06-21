import ProductListClient from "@/components/i-tech-cards/product-list-client";
import { fetchAllProducts } from "@/lib/data/products";

export default function ProductsPage() {
  const products = fetchAllProducts();
  return (
    <div>
      <ProductListClient fetchProducts={products} />
    </div>
  );
}
