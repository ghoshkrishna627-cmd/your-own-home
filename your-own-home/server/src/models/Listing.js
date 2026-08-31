const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 5000,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ['apartment', 'house', 'villa', 'cottage', 'cabin', 'condo', 'other'],
    },
    address: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    coordinates: {
      // GeoJSON Point for geospatial queries
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: (val) => val.length === 2,
          message: 'Coordinates must be [longitude, latitude]',
        },
      },
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    pricePerNight: { type: Number, required: true, min: 0 },
    cleaningFee: { type: Number, default: 0, min: 0 },
    serviceFee: { type: Number, default: 0, min: 0 },
    bedrooms: { type: Number, required: true, min: 0 },
    beds: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1 },
    amenities: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    // Admin moderation
    moderationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved', // set to 'pending' if you enable a moderation workflow
    },
  },
  { timestamps: true }
);

listingSchema.index({ city: 1, isPublished: 1 });
listingSchema.index({ coordinates: '2dsphere' });
listingSchema.index({ pricePerNight: 1 });
listingSchema.index({ title: 'text', description: 'text', city: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
