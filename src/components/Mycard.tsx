"use client"
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "./ui/button";
import { urlForImage } from "../../sanity/lib/image";
import { IProduct } from "@/lib/interface";

type Props = {
  item: IProduct
}


const Mycard = ({item}: Props) => {
  const { title, description, image, price, slug } = item;
  return (
    <>
      <div className="mx-auto items-center">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={urlForImage(image).url()}
              alt="image"
              width={200}
              height={300}
            />
          </CardContent>
          <CardFooter>
            <h1 className="font-bold text-lg"> Price: <strong> $ {price} </strong></h1>
          </CardFooter>
          <div className=" my-4 flex justify-center items-center mx-auto">
            <Link href={`/products/${slug.current}`} >
            <Button  variant="default" >Click For Details</Button>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Mycard;
