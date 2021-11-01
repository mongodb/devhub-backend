exports = async function(){
  const endPoint = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/snooty-koueq/service/dev-hub-rst-article/incoming_webhook/devhubRstArticle";
  const response = await context.http.get({ url: endPoint });
  return JSON.parse(response.body.text());
};