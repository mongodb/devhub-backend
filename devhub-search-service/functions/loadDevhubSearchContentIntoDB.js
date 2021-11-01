exports = async function(arg){
  const allArticles = await context.functions.execute("fetchAllArticles");
  const allMedia = await context.functions.execute("fetchMediaContent");
  const dbName = 'devhub';
  const collectionName = 'search_content';
  const searchCollection = context.services.get('mongodb-atlas').db(dbName).collection(collectionName);
  
  const currentContentCount = await searchCollection.count({});
  const newContentCount = allArticles.length + allMedia.length;
  
  if(newContentCount !== 0 && newContentCount >= currentContentCount){
     searchCollection.deleteMany({})
    .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
    .catch(err => console.error(`Delete failed with error: ${err}`))

    searchCollection.insertMany([allArticles,allMedia].flat())
    .then(result => console.log(`Inserted ${result.insertedIds.length} item(s).`))
    .catch(err => console.error(`Insert failed with error: ${err}`))
  
    return "Inserted " + allArticles.length + " articles "  + allMedia.length + " media records";
  }else {
    return "No New Content to be inserted";
  }
};