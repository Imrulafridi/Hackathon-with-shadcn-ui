"use client";
import { cartProduct } from "@/lib/interface";
import { Button } from "../ui/button";
import { getStripePromise } from "@/lib/Stripe";

type IPROPS = {
  product: cartProduct[];
};

const StripeCheckOut = (props: IPROPS) => {
  const handleCheckout = async () => {
    const stripe = await getStripePromise();

    const res = await fetch(`/api/stripe/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(props.product),
    });

    const data = await res.json();

    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };

  return (
    <>
      <Button variant="default" size="lg" onClick={handleCheckout}>
        CHECKOUT
      </Button>
    </>
  );
};

export default StripeCheckOut;
