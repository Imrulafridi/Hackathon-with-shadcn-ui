import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "./ui/button";
import { urlForImage } from "../sanity/lib/image";

const Mycard = ({ item }: any) => {
  const { title, description, image, price } = item;
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
            <h1> <strong> $ {price} </strong></h1>
          </CardFooter>
          <div className=" my-4 flex justify-center items-center mx-auto">
            <Button variant="default">Add to Cart</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Mycard;
