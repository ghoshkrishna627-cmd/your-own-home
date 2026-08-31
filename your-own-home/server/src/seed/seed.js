/**
 * Seed script — populates the database with realistic fictional demo data:
 * an admin account, sample hosts/guests, listings, bookings, and reviews.
 *
 * This will be fully implemented once the models above are exercised by
 * real controllers (Phase 3+), so the seed data matches actual validation
 * rules. Run with: npm run seed
 */
require('dotenv').config();
const connectDB = require('../config/db');
const logger = require('../utils/logger');

const run = async () => {
  await connectDB();
  logger.info('Seed script placeholder — will be implemented alongside models/controllers in later phases.');
  process.exit(0);
};

run();
