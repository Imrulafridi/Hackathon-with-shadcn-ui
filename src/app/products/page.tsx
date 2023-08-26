import { IProduct } from "@/lib/interface";
import { client } from "../../../sanity/lib/client";
import Mycard from "@/components/Mycard";

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
  const products: IProduct[] = await getSanityData();
  return (
    <main className="container mx-auto grid grid-cols-1 bs:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 place-items-center p-12">
      {products.map((item) => (
        <div key={item._id}>
          <Mycard item={item} />
        </div>
      ))}
    </main>
  );
}
