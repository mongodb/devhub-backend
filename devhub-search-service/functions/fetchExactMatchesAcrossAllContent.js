exports = function(searchText){
  const {database,collection} = context.values.get("SEARCHDB").databasedetails;
  const collectionObject = context.services.get("mongodb-atlas").db(database).collection(collection);
  const query = 
     [{
            $search: {
                index: 'default',
                phrase: {
                  path: { "wildcard": "*" },
                  query: searchText
                } 
            }
        }, {
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
    
    return collectionObject.aggregate(query).toArray();
};

if (typeof module === 'object') {
    module.exports = exports;
}

