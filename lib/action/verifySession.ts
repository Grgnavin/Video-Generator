'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil', 
});

export async function verifySession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.metadata) {
      throw new Error("Invalid session or missing metadata");
    }

    const email = session.metadata.email;
    const credits = Number(session.metadata.credits);

    if (!email || !credits) {
      throw new Error("Incomplete metadata");
    }

    return { email, credits };
  } catch (err) {
    console.error(err);
    throw new Error("Stripe session verification failed");
  }
}
