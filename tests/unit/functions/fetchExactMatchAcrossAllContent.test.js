const fetchExactMatchesAcrossAllContent = require('../../../devhub-search-service/functions/fetchExactMatchesAcrossAllContent.js');

let content = 'mockcontent';
let searchText = 'mocktext';

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
    }];

let databasedetails = {
    "collection": "mockCollection",
    "database": "mockDataBase"
};


beforeEach(() => {
    const toArray = jest.fn();
    const aggregate = jest.fn().mockReturnValue({toArray});
    const collection = jest.fn().mockReturnValue({ aggregate });
    const db = jest.fn().mockReturnValue({ collection });
    const get = jest.fn().mockReturnValue({ db, databasedetails});

    collection.aggregate = aggregate;
    db.collection = collection;
    get.db = db;
    get.databasedetails = databasedetails;

    // Setup global.context.services
    global.context = {
        services: {
            get
        },
        values: {
            get
        }
    }
});

test('gets database details from SEARCHDB context values', async () => {
    await fetchExactMatchesAcrossAllContent(searchText);
    expect(context.values.get).toHaveBeenCalledWith("SEARCHDB");
})

test('gets collection object from dbName and collection Name fetched from SEARCHDB context value', async () => {
    await fetchExactMatchesAcrossAllContent(searchText);
    expect(context.services.get.db).toHaveBeenCalledWith("mockDataBase");
    expect(context.services.get.db.collection).toHaveBeenCalledWith("mockCollection");

})

test('constructs the aggregation query with accurate parameters and accurate return values', async () => {
    await fetchExactMatchesAcrossAllContent(searchText);
    expect(context.services.get.db.collection.aggregate).toHaveBeenCalledWith(query);
})