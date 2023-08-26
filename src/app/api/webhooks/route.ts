import { cartTable, db } from "@/lib/drizzle"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import Stripe from "stripe"



const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export const POST = async (req: any , res: any) => {
        const headerList = headers()

        try {
            const rawBody = await req.text()
            const sig = headerList.get('stripe-signature')

            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , {
                apiVersion: "2023-08-16"
            })

            let events;

            try {
                if(!sig || !endPointSecret) {
                    return new Response("Webhook signature or Endpoint is missing"), {status: 400}
                }
                events = stripe.webhooks.constructEvent(
                    rawBody.toString(),
                    sig,
                    endPointSecret
                )
                
            } catch (error: any) {
                console.log("ERROR" , error)
                return new Response("Webhook signature or Endpoint is missing"), {status: 400}
            }

            if(`checkout.session.completed` === events.type) {
                const session = events.data.object

                // @ts-ignore
                const customerData = await stripe.customers.retrieve(session.customer)

                // @ts-ignore
                const userId = customerData.metadata.userId

                await db.delete(cartTable).where(eq(cartTable.user_id, userId))

                console.log(`Payment Success`, session)

                // @ts-ignore
                const line_items = await stripe.checkout.sessions.listLineItems(events.data.object!.id)

                return new Response('Payment Conirmation Router Reciept')
                
            } else {
                res.setHeader("Allow", "POST")
            }


        } catch (error) {
            console.log('Error in webhook ----', error)
            return
            
        }
}
