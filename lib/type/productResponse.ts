export type ProductResponse = {
  id: number;
  title: string;
  price: number;
  description: string;
  slug: string;
  category: Category;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
};
