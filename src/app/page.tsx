import Mycard from "../../components/Mycard";
import Hero from "../../components/section/Hero";
import EventsBanner from "../../components/section/Promotion";
import { client } from "../../sanity/lib/client";

export const getDataSanity = async () => {
  const res = await client.fetch(`*[_type=="product"]{
    _id,
    title,
    description,
    price,
    image,
      category -> {
        name
      }
  }`);
  return res;
};

export default async function Home() {
  const data = await getDataSanity();

  return (
    <>
      <Hero />
      <div>
        <EventsBanner/>
      </div>
      <div className="container mx-auto grid md:grid-cols[auto,auto] lg:grid-cols-[auto,auto,auto] justify-center gap-x-8  ">
        {data.map((item: { _id: any }) => (
          <div key={item._id} className="my-4" >
            <Mycard item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
