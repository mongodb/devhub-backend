exports = async function(payload){
  const searchResults = await context.functions.execute("fetchCompositeSearchResults",payload);
  const domainUrl = context.functions.execute("constructDevhubDomainUrl");
  
  return searchResults.map((res) => {
    return {
      ...res,
      url: constructUrlFromSlug(domainUrl,res.slug)
    }
  });
};

const constructUrlFromSlug = (domainUrl,slug) => {
  if (slug.startsWith("/")) {
    slug = slug.substr(1);
  }
  return domainUrl.concat(slug);
}