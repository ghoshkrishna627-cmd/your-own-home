const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  // We don't throw here so the rest of the app (auth, listings, etc.)
  // can still run/be tested before Stripe is configured — but payment
  // routes will fail loudly and explicitly if this is missing.
  // eslint-disable-next-line no-console
  console.warn(
    '[stripe] STRIPE_SECRET_KEY is not set. Payment routes will not function until it is configured in .env'
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
});

module.exports = stripe;
