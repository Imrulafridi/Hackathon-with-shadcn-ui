import React from "react";
import { client } from "../../../sanity/lib/client";
import { IProduct } from "@/lib/interface";
import Mycard from "../../components/Mycard";

const getSanityData = async ({ params }: Props) => {
  const str = params.slug;
  const strCapital = str.charAt(0).toUpperCase() + str.slice(1);
  const res =
    await client.fetch(`*[_type=="product" && category -> name == "${strCapital}"]{
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

const CategoryProducts = async ({ params }: Props) => {
  const data: IProduct[] = await getSanityData({ params });

  return (
    <div className="container mx-auto grid md:grid-cols[auto,auto] lg:grid-cols-[auto,auto,auto] justify-center gap-x-8  ">
      {data.map((item: IProduct) => (
        <div key={item._id} className="my-4">
          <Mycard item={item} />
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;

type Icategory = {
  slug: {
    current: string;
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const res: Icategory[] = await client.fetch(`*[_type=="category"]{
//     slug {
//       current
//     }
//   }`);

//   return res.map((category) => ({
//     slug: category.slug.current,
//   }));
// }
