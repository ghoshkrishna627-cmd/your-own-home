const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssSanitizer = require('./middleware/xssSanitizer');
const passport = require('./config/passport');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();

// ---- Security middleware (order matters) ----
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // required so the browser sends/receives the httpOnly cookie
  })
);

// Stripe webhooks need the RAW body for signature verification, so that
// route is mounted with express.raw() BEFORE the global express.json()
// parser. See routes/payment.routes.js.
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . from req.body/query/params keys (NoSQL injection)
app.use(xssSanitizer); // strips HTML/script tags from string input
app.use(passport.initialize());
app.use(generalLimiter);

// ---- Health check ----
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy', timestamp: new Date() });
});

// ---- Routes ----
// Mounted incrementally as each resource is implemented in later phases:
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/listings', require('./routes/listing.routes'));
// app.use('/api/bookings', require('./routes/booking.routes'));
// app.use('/api/reviews', require('./routes/review.routes'));
// app.use('/api/upload', require('./routes/upload.routes'));
// app.use('/api/payments', require('./routes/payment.routes'));
// app.use('/api/conversations', require('./routes/message.routes'));
// app.use('/api/admin', require('./routes/admin.routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
