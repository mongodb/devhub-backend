/*
 Support combination search

 */
exports = function(payload){
  const {database,collection} = context.values.get("SEARCHDB").databasedetails;
  const domainUrl = context.functions.execute("constructDevhubDomainUrl");
  const collectionObject = context.services.get("mongodb-atlas").db(database).collection(collection);
  const searchQuery = constructQueryStringFromPayLoad(payload);
  const query =
     [{
           $search: {
              queryString: {
              defaultPath: "raw_content",
              query: searchQuery
         }
       
            }
        }, {
            $project: {
                title: 1,
                author_names: 1,
                description: 1,
                type: 1,
                tags: 1,
                products: 1,
                languages: 1,
                slug: 1,
                _id: 0
            }
        }]
    
    return collectionObject.aggregate(query).toArray();
};


const constructQueryStringFromPayLoad = (payload) => {
 const indexedFields = ["author_names", "description", "languages", "products", "raw_content", "tags", "title", "type"];
 let queryClauses = [];
 
 indexedFields.forEach( (field) => {
   if(payload.query[field] !== undefined) {
     queryClauses.push(field + ":"+ constructFieldSearchText(payload.query[field]));
   }
 })
 return queryClauses.join(" AND ");
}


const constructFieldSearchText = (searchText) => {
  searchText = searchText.replace(/\+/g, " AND ").replace(/\|/g, " OR ");
  return "(" + searchText + ")";
}

if (typeof module === 'object') {
    module.exports = exports;
}