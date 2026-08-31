const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', default: null },
    lastMessage: {
      text: { type: String, default: '' },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      sentAt: { type: Date },
    },
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });
// Prevent duplicate conversations for the same pair of users + listing
conversationSchema.index({ participants: 1, listing: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
