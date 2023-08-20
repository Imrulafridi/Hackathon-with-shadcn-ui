import { NextRequest, NextResponse } from "next/server";
import { db, cartTable, addToCart } from "@/lib/drizzle";
import { auth } from '@clerk/nextjs';
import { and, eq } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  const req: addToCart = await request.json();
  const {userId} = auth()
  

  try {
    if (req && userId) {
      const res = await db
        .insert(cartTable)
        .values({
          product_id: req.product_id,
          image: req.image,
          price: req.price,
          product_name: req.product_name,
          total_price: req.price * req.quantity,
          quantity: req.quantity,
          user_id: userId,
        })
        .returning();
      return NextResponse.json({ res });
    } else {
      throw new Error("Failed to insert Data");
    }
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const PUT = async (request: NextRequest) => {
  const { userId } = auth();

  const req: addToCart = await request.json();

  try {
    if (req && userId) {
      const res = await db
        .update(cartTable)
        .set({
          quantity: req.quantity,
          total_price: req.price,
        })
        .where(and(eq(cartTable.user_id, userId), eq(cartTable.product_id, req.product_id))).returning();
      return NextResponse.json({ res });
    } else {
      throw new Error("Failed to update Data");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: "Something went wrong",
    });
  }
};