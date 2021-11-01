exports = async function(arg){
  const endPoint = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/devhubauthentication-lidpq/service/devhubMediaContent/incoming_webhook/devhubMediaSearchContent";
  const response = await context.http.get({ url: endPoint });
  return JSON.parse(response.body.text());
};