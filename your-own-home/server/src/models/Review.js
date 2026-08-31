const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true }
);

// One review per booking — enforced at the DB layer, not just app logic
reviewSchema.index({ booking: 1 }, { unique: true });
reviewSchema.index({ listing: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
