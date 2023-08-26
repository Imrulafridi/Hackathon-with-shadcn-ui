import React from "react";
import { client } from "../../../../sanity/lib/client";
import { cartProduct } from "@/lib/interface";
import ProductsDetails from "../../../components/section/ProductsDetails";
import { auth } from "@clerk/nextjs";

const getSanityData = async ({ params }: Props) => {
  const str = params.slug;
  const res = await client.fetch(`*[_type=="product" && slug.current == "${str}"][0]{
      _id,
      title,
      slug,
      description,
      price,
      image,
        category -> {
          name
        }
    }`);
  return res;
};

type Props = {
  params: {
    slug: string;
  };
};

const AddtoCartPage = async ({ params }: Props) => {
  const product: cartProduct = await getSanityData({ params });
    const {userId} = auth()

  return (
    <div className="container mx-auto grid md:grid-cols[auto,auto] lg:grid-cols-[auto,auto,auto] justify-center gap-x-8  ">
      <ProductsDetails product={product} qty={1} userId={userId as string}  />
    </div>
  );
};

export default AddtoCartPage;

type Icategory = {
  slug: {
    current: string;
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const res: Icategory[] = await client.fetch(`*[_type=="product"]{
    slug {
      current
    }
  }`);

  return res.map((category) => ({
    slug: category.slug.current,
  }));
}
