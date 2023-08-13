import React from "react";
import Image from "next/image";
import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import event3 from "../../assets/event3.png";

const EventsBanner = () => {
  return (
    <section className="container px-32 py-16">
      <div className="flex flex-col text-center gap-4 mb-8">
        <span className="text-blue-700">PROMOTIONS</span>
        <h2 className="text-2xl font-bolds">Our Promotions Events</h2>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <div className="mx-auto w-full flex flex-1 flex-col gap-4 ">
          <div className="bg-[#D6D6D8] px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="content">
              <h3 className="font-bold text-2xl ">
                GET UP TO <span>60%</span>
              </h3>
              <p>For the summer season</p>
            </div>
            <Image src={event1} alt="event" />
          </div>

          <div className="bg-[#212121] text-white p-8 text-center space-y-2">
            <h3 className="font-bold text-2xl">GET 30% Off</h3>
            <p>USE PROMO CODE</p>
            <button className="bg-slate-500 p-2 rounded-lg">DINEWEEKENDSALE</button>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row justify-between items-center gap-2">
          <div className="bg-[#EFE1C7] p-8 ">
            <div className="font-bold text-lg pb-8">
              <p>Flex Sweatshirt</p>
              <div className="space-x-4">
                <span>$100.00</span>
                <span className="line-through" >$75.00</span>
              </div>
            </div>
            <Image src={event2} alt="event" />
          </div>

          <div className="bg-[#D7D7D9] p-8">
            <div className="font-bold text-lg pb-8">
              <p>Flex Push Button </p>
              <div className="space-x-4">
                <span>$225.00</span>
                <span className="line-through">$190.00</span>
              </div>
            </div>
            <Image src={event3} alt="event" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsBanner;
