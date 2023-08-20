import { Image as IImage,  } from "sanity";

export interface cartProduct {
  _id: string;
  title: string;
  price: number;
  description: string,
  image: IImage;
  quantity: number;
  totalPrice: number;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: IImage;
  slug: {
    current: string;
  };
  category: {
    name: string;
  };
}


