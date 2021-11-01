const constructJsonFeedFromCatalogue = require("../../../devhub-catalogue-export/functions/constructJsonFeedFromCatalogue")

test("construct json feed", () => {
    const jsonResult = [
        {
            "title": "3 Things to Know When You Switch from SQL to MongoDB",
            "url": "www.mongodb.com/developer/article/3-things-to-know-switch-from-sql-mongodb",
        },
        {
            "title": "7 Things I Learned While Modeling Data for YouTube Stats",
            "url": "www.mongodb.com/developer/article/7-things-learned-while-modeling-data-youtube-stats",
        },
        {
            "title": "Active-Active Application Architectures with MongoDB",
            "url": "www.mongodb.com/developer/article/active-active-application-architectures",
        }
    ]

    const expectedJSONFeed = {
        "version": "https://jsonfeed.org/version/1.1",
        "title": "Devhub export",
        "items": [
            {
                "id": "0",
                "title": "3 Things to Know When You Switch from SQL to MongoDB",
                "url": "www.mongodb.com/developer/article/3-things-to-know-switch-from-sql-mongodb",
                "content_text": `{"title":"3 Things to Know When You Switch from SQL to MongoDB","url":"www.mongodb.com/developer/article/3-things-to-know-switch-from-sql-mongodb"}`
            },
            {
                "id": "1",
                "title": "7 Things I Learned While Modeling Data for YouTube Stats",
                "url": "www.mongodb.com/developer/article/7-things-learned-while-modeling-data-youtube-stats",
                "content_text": `{"title":"7 Things I Learned While Modeling Data for YouTube Stats","url":"www.mongodb.com/developer/article/7-things-learned-while-modeling-data-youtube-stats"}`
            },
            {
                "id": "2",
                "title": "Active-Active Application Architectures with MongoDB",
                "url": "www.mongodb.com/developer/article/active-active-application-architectures",
                "content_text": `{"title":"Active-Active Application Architectures with MongoDB","url":"www.mongodb.com/developer/article/active-active-application-architectures"}`
            }
        ]
    }
    expect(constructJsonFeedFromCatalogue(jsonResult)).toStrictEqual(expectedJSONFeed)
})