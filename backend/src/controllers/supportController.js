const FranchiseCategory = require('../models/FranchiseCategory');
const dbState = require('../config/dbState');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/apiResponse');

const formatInvestment = (min, max) => {
  if (typeof min === 'number' && typeof max === 'number') {
    return `Rs.${min.toLocaleString()} to Rs.${max.toLocaleString()}`;
  }

  return null;
};

const getReplyFromMessage = async (message) => {
  const normalized = String(message || '').trim().toLowerCase();

  if (!normalized) {
    return {
      reply:
        'Welcome to Business for All. You can ask about applying, investment plans, support, or franchise types.',
      quickReplies: [
        'How to apply?',
        'Investment plans?',
        'Contact support?',
        'Franchise types?',
      ],
    };
  }

  if (normalized.includes('apply')) {
    return {
      reply:
        'Applying is simple: explore the franchise categories, choose the model that fits your goals, and submit your details through the Apply Now form. Our team then guides you through onboarding and the next steps.',
      quickReplies: ['Investment plans?', 'Franchise types?', 'Contact support?'],
    };
  }

  if (normalized.includes('investment') || normalized.includes('plan') || normalized.includes('price')) {
    const categories = dbState.getState().isReady
      ? await FranchiseCategory.find({ active: true })
          .sort({ createdAt: -1 })
          .limit(3)
          .select('title investmentMin investmentMax')
          .lean()
      : [];

    const planSummary = categories
      .map((category) => {
        const range = formatInvestment(category.investmentMin, category.investmentMax);
        return range ? `${category.title}: ${range}` : null;
      })
      .filter(Boolean)
      .join(' | ');

    return {
      reply: planSummary
        ? `Investment varies by category. Here are a few current ranges: ${planSummary}. You can open the Plans page or contact support for the best fit.`
        : 'Investment depends on the franchise category and support level you choose. Visit the Plans page or contact support and we can guide you to the right option.',
      quickReplies: ['How to apply?', 'Franchise types?', 'Contact support?'],
    };
  }

  if (normalized.includes('support') || normalized.includes('contact') || normalized.includes('help')) {
    return {
      reply:
        'You can reach support through the Contact page, email hello@businessforall.com, or call +91 98765 43210. If you prefer, submit your details and the team will get back to you quickly.',
      quickReplies: ['How to apply?', 'Investment plans?', 'Franchise types?'],
    };
  }

  if (normalized.includes('franchise') || normalized.includes('type') || normalized.includes('category')) {
    const categories = dbState.getState().isReady
      ? await FranchiseCategory.find({ active: true })
          .sort({ createdAt: -1 })
          .limit(4)
          .select('title type description')
          .lean()
      : [];

    const categorySummary = categories
      .map((category) => category.title || category.type)
      .filter(Boolean)
      .join(', ');

    return {
      reply: categorySummary
        ? `We currently support franchise opportunities across categories such as ${categorySummary}. Open Explore Categories to review the best match for your goals.`
        : 'We offer franchise opportunities across food, service, retail, and other business-ready categories. Open Explore Categories to see the available options.',
      quickReplies: ['How to apply?', 'Investment plans?', 'Contact support?'],
    };
  }

  return {
    reply:
      'I can help with applying, investment plans, support, and franchise types. Try one of the quick replies and I will point you in the right direction.',
    quickReplies: [
      'How to apply?',
      'Investment plans?',
      'Contact support?',
      'Franchise types?',
    ],
  };
};

const chatSupport = asyncHandler(async (req, res) => {
  const { message } = req.body || {};
  const response = await getReplyFromMessage(message);

  return sendResponse(res, {
    message: 'Support response generated successfully',
    data: response,
  });
});

module.exports = {
  chatSupport,
};
