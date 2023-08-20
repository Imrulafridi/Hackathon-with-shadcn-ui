import { IProduct } from "@/lib/interface";
import {client} from "../../../sanity/lib/client"
import { urlForImage } from "../../../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";


const getSanityData = async () => {
  const res = await client.fetch(`*[_type=="product"]{
      _id,
      title,
      slug,
      description,
      price,
      image,
      slug
    }`);
  return res;
};



export default async function ProductsPage() {
  const products: IProduct[] = await getSanityData()
  return (
    <div className="container grid grid-cols-1 bs:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center px-10">
    {products.map((product) => (
      <div
        key={product._id}
        className="flex flex-col justify-center items-center mt-3 gap-2 hover:scale-110 ease-in duration-300"
      >
        <Link href={`products/${product.slug.current}`}>
          <Image
            src={urlForImage(product.image).url()}
            width={300}
            alt={product.title}
            height={300}
          />
          <h4 className="self-start mt-3">{product.title}</h4>
          <h4 className="self-start mt-3">${product.price}</h4>
        </Link>
      </div>
    ))}
  </div>
  )
}

 