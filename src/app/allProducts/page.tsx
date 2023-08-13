import React from 'react'
import { client } from "../../../sanity/lib/client";
import { Image as IImage } from "sanity";
import Mycard from '../../../components/Mycard';



const getSanityData = async () => {
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
  
  
  interface IProduct {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: IImage,
    category: {
      name: string
    }
  }
  

const Allproducts = async () => {
    const data: IProduct[] = await getSanityData();

  return (
    <div className="container mx-auto grid md:grid-cols[auto,auto] lg:grid-cols-[auto,auto,auto] justify-center gap-x-8  ">
    {data.map((item: { _id: any }) => (
      <div key={item._id} className="my-4" >
        <Mycard item={item} />
      </div>
    ))}
  </div>
  )
}

export default Allproducts