const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true, min: 1 },
    // Snapshot pricing fields at time of booking — listing prices can change later,
    // but a confirmed booking's total must never silently change.
    pricePerNight: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'failed', 'refunded'],
      default: 'unpaid',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    stripePaymentIntentId: { type: String, default: null },
    stripeCheckoutSessionId: { type: String, default: null },
    cancelledAt: { type: Date, default: null },
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

// Core index supporting the overlap-detection query used by availability.service.js
bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ guest: 1, bookingStatus: 1 });
bookingSchema.index({ host: 1, bookingStatus: 1 });

bookingSchema.pre('validate', function (next) {
  if (this.checkOut <= this.checkIn) {
    return next(new Error('checkOut must be after checkIn'));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
