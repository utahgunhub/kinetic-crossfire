const { BetaAnalyticsDataClient } = require("@google-analytics/data");

function getCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON");
    return null;
  }
}

function rangeDays(range) {
  if (range === "90d") return 90;
  if (range === "28d") return 28;
  return 7;
}

async function fetchAnalyticsSummary(range = "7d") {
  const propertyId = process.env.GA_PROPERTY_ID;
  const credentials = getCredentials();
  if (!propertyId || !credentials) {
    return { configured: false };
  }

  const days = rangeDays(range);
  const client = new BetaAnalyticsDataClient({ credentials });
  const property = `properties/${propertyId}`;

  const [totals] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "averageSessionDuration" },
      { name: "screenPageViews" },
    ],
  });

  const [pages] = await client.runReport({
    property,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });

  const metricValues = totals.rows?.[0]?.metricValues || [];

  return {
    configured: true,
    range,
    days,
    activeUsers: Number(metricValues[0]?.value || 0),
    sessions: Number(metricValues[1]?.value || 0),
    averageSessionDuration: Number(metricValues[2]?.value || 0),
    pageViews: Number(metricValues[3]?.value || 0),
    topPages: (pages.rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || "/",
      views: Number(row.metricValues?.[0]?.value || 0),
    })),
  };
}

module.exports = { fetchAnalyticsSummary };
