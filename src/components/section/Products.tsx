"use client"
import React from 'react'
import { client } from "../../../sanity/lib/client";
import Mycard from '../Mycard';
import { IProduct } from '@/lib/interface';



const getSanityData = async () => {
    const res = await client.fetch(`*[_type=="product"]{
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
  
  
  

const Products = async () => {
    const data: IProduct[] = await getSanityData();

  return (
    <div className="container mx-auto grid md:grid-cols[auto,auto] lg:grid-cols-[auto,auto,auto] justify-center gap-x-8  ">
    {data.map((item) => (
      <div key={item._id} className="my-4" >
        <Mycard item={item} />
      </div>
    ))}
  </div>
  )
}

export default Products