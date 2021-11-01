// This function is the webhook's request handler.
exports = async function(payload,response) {
  const params = context.functions.execute("buildQueryStringFromParams",payload.query);
  const endpoint = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-search-service-fldiy/service/devhub_export/incoming_webhook/compositesearch";
  const webhookURI = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-api-ztlmp/service/export/incoming_webhook/catalogueXml"
  const resourceURI = webhookURI + params
  const jsonResponse = await context.functions.execute("getHttpResponse",endpoint,params);
  const xmlResponse = await context.functions.execute("convertResponseToXml",jsonResponse, resourceURI);
  response.setHeader('Content-Type', 'application/xml');
  response.setBody(xmlResponse);
};