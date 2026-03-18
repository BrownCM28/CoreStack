import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

export const PLANS = {
  STARTER: {
    name: "Starter",
    priceId: process.env.STRIPE_STARTER_PRICE_ID ?? "",
    price: 99,
    jobs: 3,
    features: ["3 active job posts", "30-day listings", "Email applications"],
  },
  GROWTH: {
    name: "Growth",
    priceId: process.env.STRIPE_GROWTH_PRICE_ID ?? "",
    price: 249,
    jobs: 10,
    features: [
      "10 active job posts",
      "60-day listings",
      "Featured listings",
      "Analytics dashboard",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? "",
    price: 599,
    jobs: -1,
    features: [
      "Unlimited job posts",
      "90-day listings",
      "Priority placement",
      "Dedicated support",
      "Custom integrations",
    ],
  },
} as const;
