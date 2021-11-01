const getData = require("../../../devhub-catalogue-export/functions/getData")

const dbRes = [
    {
        "title": "Test title 1",
        "slug": "test-slug-1",
    },
    {
        "title": "Test title 2",
        "slug": "test-slug-2",
    }
]
beforeEach(() => {
    const toArray = jest.fn().mockReturnValue(dbRes)
    const aggregate = jest.fn().mockReturnValue({ toArray })
    const collection = jest.fn().mockReturnValue({ aggregate })
    const db = jest.fn().mockReturnValue({ collection })
    const get = jest.fn().mockReturnValue({ db });

    collection.aggregate = aggregate
    db.collection = collection;
    get.db = db;

    // Setup global.context.services
    global.context = {
        services: {
            get
        },
        values: {
            get: jest.fn().mockReturnValue("www.test.com/developer/")
        },
    }
})

test("Get data", async () => {
    const result = await getData()
    expect(context.values.get).toHaveBeenCalledWith("DOMAIN-URL");
    expect(result).toStrictEqual([
        {
            "title": "Test title 1",
            "slug": "test-slug-1",
            "url": "www.test.com/developer/test-slug-1"
        },
        {
            "title": "Test title 2",
            "slug": "test-slug-2",
            "url": "www.test.com/developer/test-slug-2"
        }
    ])
})