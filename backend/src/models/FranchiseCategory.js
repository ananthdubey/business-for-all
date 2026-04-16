const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const franchiseCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    investmentMin: {
      type: Number,
      required: true,
      min: 0,
    },
    investmentMax: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    benefits: {
      type: [String],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

franchiseCategorySchema.pre('validate', function preValidate(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

module.exports = mongoose.model('FranchiseCategory', franchiseCategorySchema);
