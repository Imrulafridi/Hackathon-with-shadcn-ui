import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import Link from "next/link";


const Success = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-[60vh] p-8 space-y-4">
      <CheckCircle2 size={120} color="#4bb95d" strokeWidth={3} />
      <h1 className="font-bold text-4xl uppercase">Success</h1>
      <Link href={`/products`}>
          <Button className="m-2 w-56 h-12">
            <ShoppingCart className="mr-2 h-5 w-5" /> Start Shopping
          </Button>
        </Link>
    </div>
  );
};

export default Success;
