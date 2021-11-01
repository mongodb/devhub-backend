
exports = function(payload){
    const domain = context.values.get("DEVHUB-DOMAIN").domain;
    const host = domain && domain.host ? domain.host : "www.mongodb.com/";
    const subdomain = domain && domain.subdomain ? domain.subdomain : "developer/"
    return host+""+subdomain;
};
