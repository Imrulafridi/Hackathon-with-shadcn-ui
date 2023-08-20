import { cartTable, db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const DELETE = async (
  request: NextRequest,
  { params: { product_id } }: { params: {product_id: string  } }
) => {
  const { userId } = auth();
  try {
    if (product_id && userId) {
      const res = await db
        .delete(cartTable)
        .where(
          and(
            eq(cartTable.user_id, userId as string),
            eq(cartTable.product_id, product_id)
          )
        )
        .returning();
      return NextResponse.json({
        Message: "Item removed from Cart",
      });
    } else {
      if (product_id) {
        throw new Error("Please Login");
      } else {
        throw new Error("Incorrect Product Id");
      }
    }
  } catch (error) {
    return NextResponse.json((error as { message: string }).message);
  }
};
