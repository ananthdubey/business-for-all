const connectDB = require('../config/db');
const FranchiseCategory = require('../models/FranchiseCategory');
const sampleCategories = require('../data/sampleCategories');
const logger = require('../utils/logger');
require('../config/env');

const seedCategories = async () => {
  try {
    await connectDB();

    for (const category of sampleCategories) {
      await FranchiseCategory.findOneAndUpdate(
        { slug: category.slug },
        category,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    logger.info('Sample categories seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed categories', error);
    process.exit(1);
  }
};

seedCategories();
