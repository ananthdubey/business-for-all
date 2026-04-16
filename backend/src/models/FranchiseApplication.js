const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const franchiseApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FranchiseCategory',
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    investmentBudget: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
      default: '',
    },
    documents: {
      type: [documentSchema],
      default: [],
    },
    payment: {
      status: {
        type: String,
        enum: ['unpaid', 'pending', 'paid', 'failed', 'refunded'],
        default: 'unpaid',
      },
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: 'INR',
      },
      provider: {
        type: String,
        default: '',
      },
      transactionId: {
        type: String,
        default: '',
      },
      paidAt: {
        type: Date,
        default: null,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'under-review'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

franchiseApplicationSchema.index({ userId: 1, createdAt: -1 });
franchiseApplicationSchema.index({ categoryId: 1, status: 1 });

module.exports = mongoose.model('FranchiseApplication', franchiseApplicationSchema);
