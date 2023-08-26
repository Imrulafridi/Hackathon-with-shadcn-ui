import React from "react";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <section className="container mx-auto flex flex-col justify-center items-center h-[50vh] space-y-4">
      <div>
        <h1 className="font-extrabold text-4xl">Subscribe Our Newsletter</h1>
      </div>
      <div>
        <p>Get the latest information and promo offers directly</p>
      </div>
      <form className="flex flex-col md:flex-row justify-center items-center gap-2">
        <input className="p-2 border-2 " type="email" name="email" placeholder="Input Your email" />
        <Button type="submit">Get Started</Button>
      </form>
    </section>
  );
};

export default Newsletter;
