"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import Heart from "@/assets/svg/heart";

const ProductCard = ({
  id,
  title,
  images,
  price,
  description,
  category,
  slug,
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 shadow-lg">
      <div className="flex h-60 justify-center ">
        <img
          src={images}
          alt={title}
          className="object-cover aspect-video overflow-hidden  rounded-t-xl"
        />
      </div>
      <Button
        size="icon"
        onClick={() => setLiked(!liked)}
        className="bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full"
      >
        {liked ? (
          <Heart className="fill-destructive stroke-destructive" />
        ) : (
          <Heart className="stroke-white" />
        )}
        <span className="sr-only">Like</span>
      </Button>
      <Card className="ring-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm">
              {category.name}
            </Badge>
            <Badge variant="outline" className="rounded-sm">
              {category.name}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        </CardContent>
        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${price}</span>
          </div>
          <Button size="lg">Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
