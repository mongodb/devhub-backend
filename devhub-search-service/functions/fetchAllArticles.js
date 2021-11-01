exports = async function() {
  const rstArticles = await context.functions.execute("fetchRstArticles");
  const strapiArticles = await context.functions.execute("fetchStrapiArticles");
  return Array.from(rstArticles.values()).concat(Array.from(strapiArticles.values()));
};