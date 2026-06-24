"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductCard from "../shadcn-studio/card/card-12";
import {
  useCreateCategoryMutation,
  useCreateProductMutation,
  useDeleteAllProductsMutation,
  useGetProductsQuery,
} from "@/redux/service/categoryApi";
import { Spinner } from "../ui/spinner";

export default function ProductListClient() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [createCategory, { isLoading: isCreatingCategory }] =
    useCreateCategoryMutation();
  const [deleteAllProducts, { isLoading: isDeleting }] =
    useDeleteAllProductsMutation();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    slug: "",
    image: "",
    categoryId: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createProduct({
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      slug: formData.slug,
      image: formData.image,
      categoryId: Number(formData.categoryId),
    }).unwrap();

    setFormData({
      title: "",
      price: "",
      description: "",
      slug: "",
      image: "",
      categoryId: "",
    });
  };

  const handleDeleteAllProducts = async () => {
    setDeleteError(null);
    try {
      await deleteAllProducts().unwrap();
    } catch (err: any) {
      console.error("Delete all products failed:", err);
      const message =
        err?.data?.message || err?.error || err?.message || "Delete failed";
      setDeleteError(String(message));
    }
  };

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCategoryError(null);

    try {
      await createCategory({ name: categoryFormData.name }).unwrap();
      setCategoryFormData({ name: "" });
    } catch (err: any) {
      console.error("Create category failed:", err);
      const message =
        err?.data?.message || err?.error || err?.message || "Create failed";
      setCategoryError(String(message));
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto">
        <div className="flex items-center justify-center h-64">
          <Spinner className="size-16" /> Loading...
        </div>
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
      <form
        onSubmit={handleCreateCategory}
        className="mb-8 rounded-xl border border-border/60 bg-background p-4 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Create Category</h2>
            <p className="text-sm text-muted-foreground">
              Create a category first, then use its ID when creating a product.
            </p>
          </div>
          <Button type="submit" disabled={isCreatingCategory}>
            {isCreatingCategory ? "Creating..." : "Create Category"}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={categoryFormData.name}
              onChange={(event) =>
                setCategoryFormData({ name: event.target.value })
              }
              placeholder="Shoes"
              required
            />
          </div>
        </div>
      </form>

      {categoryError && (
        <div className="mb-6 text-sm text-red-500">Error: {categoryError}</div>
      )}

      <form
        onSubmit={handleCreateProduct}
        className="mb-8 rounded-xl border border-border/60 bg-background p-4 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Create Product</h2>
            <p className="text-sm text-muted-foreground">
              Add a new product and let RTK Query refresh the list.
            </p>
          </div>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Product"}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="Product title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  price: event.target.value,
                }))
              }
              placeholder="99.99"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Short description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
              placeholder="product-slug"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category ID</Label>
            <Input
              id="categoryId"
              type="number"
              value={formData.categoryId}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  categoryId: event.target.value,
                }))
              }
              placeholder="1"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  image: event.target.value,
                }))
              }
              placeholder="https://..."
              required
            />
          </div>
        </div>
      </form>

      <div className="mb-6 flex justify-end">
        <Button
          variant="destructive"
          onClick={handleDeleteAllProducts}
          disabled={isDeleting || products.length === 0}
        >
          {isDeleting ? "Deleting..." : "Delete All Products"}
        </Button>
      </div>
      {deleteError && (
        <div className="mb-6 text-sm text-red-500">Error: {deleteError}</div>
      )}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard
              id={product.id}
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
