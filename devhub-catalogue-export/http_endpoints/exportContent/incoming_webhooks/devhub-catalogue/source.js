// This function is the webhook's request handler.
exports = async function(payload) {
    let catalogue;
    const queryParams = payload.query ? context.functions.execute("buildQueryStringFromParams", payload.query) : '';
    if (queryParams === '') {
      catalogue = await context.functions.execute("getData");
    } else {
      let endPoint = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-search-service-fldiy/service/devhub_export/incoming_webhook/compositesearch";
      const url = `${endPoint}${queryParams}`;
      const response = await context.http.get({url:url})
      catalogue = JSON.parse(response.body.text());
    }
    
    const jsonFeed = context.functions.execute("constructJsonFeedFromCatalogue", catalogue);
    return jsonFeed
};

if (typeof module === 'object') {
   module.exports = exports;
}