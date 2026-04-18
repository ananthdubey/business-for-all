export function formatCurrencyRange(min, max) {
  return `Rs ${Number(min || 0).toLocaleString()}-Rs ${Number(max || 0).toLocaleString()}`
}

export function normalizeOpportunity(opportunity, fallback = {}) {
  return {
    ...opportunity,
    slug: opportunity.slug || fallback.slug || opportunity._id,
    title: opportunity.title || fallback.title || 'Untitled Opportunity',
    type: opportunity.type || fallback.type || 'Business',
    tagline: opportunity.tagline || fallback.tagline || '',
    roi: opportunity.roiEstimate || opportunity.roi || fallback.roi || '20-30%',
    investment:
      opportunity.investment ||
      (opportunity.investmentMin || opportunity.investmentMax
        ? formatCurrencyRange(opportunity.investmentMin, opportunity.investmentMax)
        : fallback.investment || 'Flexible'),
    launchTime:
      opportunity.launchTimeline || opportunity.launchTime || fallback.launchTime || '30-60 days',
    benefits: opportunity.benefits || fallback.benefits || [],
    description: opportunity.description || fallback.description || '',
  }
}
