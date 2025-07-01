import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    // Get raw body buffer
    const buf = Buffer.from(await req.arrayBuffer());

    // Get Stripe signature header
    const sig = req.headers.get('stripe-signature');
    if (!sig) {
      console.error("⚠️  Missing Stripe signature");
      return new Response("Missing Stripe signature", { status: 400 });
    }

    // Verify event
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);

  } catch (err: any) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log("✅ Payment succeeded!");
    console.log("Session ID:", session.id);
    console.log("Session metadata:", session.metadata);
    console.log("Customer email:", session.customer_details?.email);
    
    // TODO: You can trigger frontend update or just log info for now
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
