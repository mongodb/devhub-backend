const fetchCompositeSearchResults = require('../../../devhub-search-service/functions/fetchCompositeSearchResults.js');

const databasedetails = {
    "collection": "mockCollection",
    "database": "mockDataBase"
};

const domainUrl = "mockurl/"

const projectedFields = {
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

let searchQuery = {
    queryString: {
        defaultPath: "raw_content",
        query: ""
    }
}

let query =
    [{
        $search: searchQuery
    }, {
        $project: projectedFields
    }]

let payload = {query: {}}



beforeEach(() => {
    const toArray = jest.fn();
    const aggregate = jest.fn().mockReturnValue({toArray});
    const collection = jest.fn().mockReturnValue({ aggregate });
    const db = jest.fn().mockReturnValue({ collection });
    const get = jest.fn().mockReturnValue({ db, databasedetails});
    const execute = jest.fn().mockReturnValue("mockurl/")

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
        },
        functions: {
            execute
        }
    }
});

test('gets database details from SEARCHDB context values', async () => {
    await fetchCompositeSearchResults(payload);
    expect(context.values.get).toHaveBeenCalledWith("SEARCHDB");
})

test('gets collection object from dbName and collection Name fetched from SEARCHDB context value', async () => {
    await fetchCompositeSearchResults(payload);
    expect(context.services.get.db).toHaveBeenCalledWith("mockDataBase");
    expect(context.services.get.db.collection).toHaveBeenCalledWith("mockCollection");

})

test('query contains all the indexed fields and payload query params values mapped accurately ', async () => {

    payload = {query: {author_names:"fooA", description:"fooD", languages: "fooL", products: "fooP", raw_content: "fooRC", tags: "fooTag", title: "fooTitle", type: "fooType"}}
    searchQuery = {
        queryString: {
            defaultPath: "raw_content",
            query: "author_names:(fooA) AND description:(fooD) AND languages:(fooL) AND products:(fooP) AND raw_content:(fooRC) AND tags:(fooTag) AND title:(fooTitle) AND type:(fooType)"
        }
    }
    query =
        [{
            $search: searchQuery
        }, {
            $project: projectedFields
        }]
    await fetchCompositeSearchResults(payload);

    expect(context.services.get.db.collection.aggregate).toHaveBeenCalledWith(query);
})

test('intercepts | as OR ', async () => {
    payload = {query: {author_names: "foo|bar|foos" , }}
    searchQuery = {
        queryString: {
            defaultPath: "raw_content",
            query: "author_names:(foo OR bar OR foos)"
        }
    }
    query =
        [{
            $search: searchQuery
        }, {
            $project: projectedFields
        }]
    await fetchCompositeSearchResults(payload);

    expect(context.services.get.db.collection.aggregate).toHaveBeenCalledWith(query);
})

test('intercepts + as AND ', async () => {
    payload = {query: {author_names: "foo+bar+foos" , }}
    searchQuery = {
        queryString: {
            defaultPath: "raw_content",
            query: "author_names:(foo AND bar AND foos)"
        }
    }
    query =
        [{
            $search: searchQuery
        }, {
            $project: projectedFields
        }]
    await fetchCompositeSearchResults(payload);

    expect(context.services.get.db.collection.aggregate).toHaveBeenCalledWith(query);
})

test('intercepts + as AND and | as or ', async () => {
    payload = {query: {author_names: "foo+bar|foos" , }}
    searchQuery = {
        queryString: {
            defaultPath: "raw_content",
            query: "author_names:(foo AND bar OR foos)"
        }
    }
    query =
        [{
            $search: searchQuery
        }, {
            $project: projectedFields
        }]
    await fetchCompositeSearchResults(payload);

    expect(context.services.get.db.collection.aggregate).toHaveBeenCalledWith(query);
})