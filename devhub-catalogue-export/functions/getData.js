exports = async function(){
  var collection = context.services.get("mongodb-atlas").db("devhub").collection("search_content")
   const query = [{
      $project: {
          title: 1,
          author_names: 1,
          type: 1,
          tags: 1,
          products: 1,
          languages: 1,
          slug: 1,
          _id: 0
      }
    }]
  var results = await collection.aggregate(query).toArray()
  const data = results.map(res => {
      return {
        ...res,
        url: constructUrlFromSlug(context.values.get("DOMAIN-URL"), res.slug)
      }
    })
  return data;
};

const constructUrlFromSlug = (domainUrl,slug) => {
  if (slug.startsWith("/")) {
    slug = slug.substr(1);
  }
  return domainUrl.concat(slug);
}

if (typeof module === 'object') {
   module.exports = exports;
}