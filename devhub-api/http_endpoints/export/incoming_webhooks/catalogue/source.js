// This function is the webhook's request handler.
exports = async function(payload) {
  const queryParams = payload.query ? context.functions.execute("buildQueryStringFromParams", payload.query) : '';
  const endPoint = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/devhub-catalogue-export-xijyd/service/exportContent/incoming_webhook/devhub-catalogue";
  const url = `${endPoint}${queryParams}`;
  const response = await context.http.get({url:url})
  return JSON.parse(response.body.text());
};