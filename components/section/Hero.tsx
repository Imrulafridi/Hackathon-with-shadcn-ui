import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container mx-auto m-12 flex flex-1">
      <div className="m-10 flex flex-col justify-center items-center space-y-8 md:items-start w-full">
        <div className="bg-blue-200 p-3 rounded">
          <h2 className="text-blue-600">Sale 70%</h2>
        </div>
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-5xl">
          An Industrial Take on Streetwear
        </h1>
        <p className="max-w-md leading-6 text-md [&:not(:first-child)]:mt-6">
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>

        <Button className="m-2 w-56 h-12">
          <ShoppingCart className="mr-2 h-5 w-5" /> Start Shopping
        </Button>
      </div>
      <div className="hidden lg:block">
        <Image src={"/header.webp"} alt="header pic" width={450} height={500} />
      </div>
    </div>
  );
};

export default Hero;
