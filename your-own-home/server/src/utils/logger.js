/**
 * Minimal structured logger. Swappable for winston/pino later without
 * touching call sites, since everything goes through this module.
 */
const timestamp = () => new Date().toISOString();

const logger = {
  info: (msg) => console.log(`[INFO] ${timestamp()} - ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${timestamp()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${timestamp()} - ${msg}`),
  debug: (msg) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${timestamp()} - ${msg}`);
    }
  },
};

module.exports = logger;
