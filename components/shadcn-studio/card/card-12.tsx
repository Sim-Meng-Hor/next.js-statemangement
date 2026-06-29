"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Heart from "@/assets/svg/heart";

type ProductCardProps = {
  id: number;
  title: string;
  images: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  slug: string;
};

export default function ProductCard({
  id,
  title,
  images,
  price,
  description,
  category,
  slug,
}: ProductCardProps) {
  const [liked, setLiked] = useState<boolean>(true);

  return (
    <Card className="w-80 rounded-[28px] border-0 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
      {/* Image well */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[22px] bg-neutral-100">
        {/* Best Seller pill */}
        <Badge className="absolute left-4 top-4 rounded-full border-0 bg-white px-4 py-1.5 text-[13px] font-semibold text-neutral-800 shadow-sm">
          Best Seller
        </Badge>

        {/* Like button */}
        <Button
          size="icon"
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 size-9.5 rounded-full bg-white shadow-sm transition-transform hover:scale-110 hover:bg-white"
        >
          <Heart
            className={
              liked
                ? "size-4.5 fill-red-500 stroke-red-500"
                : "size-4.5 stroke-neutral-700"
            }
          />
          <span className="sr-only">Like</span>
        </Button>

        {/* Product image */}
        <img
          src={images}
          alt={title}
          className="max-h-46.25 w-auto object-contain"
        />

        {/* Carousel dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-600" />
          <span className="size-2 rounded-full bg-emerald-600/40" />
          <span className="size-2 rounded-full bg-black/10" />
        </div>
      </div>

      {/* Details */}
      <div className="px-2.5 pb-2 pt-4">
        <p className="text-sm font-semibold text-emerald-600">
          {category.name}
        </p>
        <h3 className="mt-1.5 text-xl font-bold leading-snug tracking-tight text-neutral-900 line-clamp-1">
          {title}
        </h3>
        <p className="mt-2.5 text-lg font-semibold text-neutral-900">
          ${Number(price).toFixed(2)}
        </p>

        <Button
          size="lg"
          className="mt-4 h-12.5 w-full rounded-full bg-neutral-800 text-base font-semibold text-white hover:bg-neutral-900"
        >
          Buy Now
        </Button>
      </div>
    </Card>
  );
}
