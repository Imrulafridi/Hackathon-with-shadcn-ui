"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { client } from "../../../sanity/lib/client";
import Mycard from "../Mycard";
import { IProduct } from "@/lib/interface";

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
    <section className="container py-16">
      <div className="flex flex-col text-center gap-4 mb-8">
        <span className="text-blue-700 font-bold">PRODUCTS</span>
        <h2 className="text-4xl font-bold">Check What We Have</h2>
      </div>
      <Swiper
        spaceBetween={10}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Mycard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Products;
