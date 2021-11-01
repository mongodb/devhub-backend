exports = async function(payload) {
    const collection = context.services.get("mongodb-atlas").db("devhub").collection("search_content");

    let searchQuery = payload.query.q;

    return collection.aggregate(
        [{
            $search: {
                index: 'default',
                text: {
                    path: ["author_names", "description", "raw_content", "tags", "title"],
                    query: searchQuery,
                    fuzzy: {
                        maxEdits: 2,
                        // Below was causing issues with title matching, when dropped to 1 this seemed to be resolved
                        // but not sure of other implications
                        maxExpansions: 5,
                        prefixLength: 2
                    }
                }
            }
        }, {
            $project: {
                title: 1,
                description: 1,
                author_names: 1,
                type: 1,
                tags: 1,
                products: 1,
                languages: 1,
                atf_image: 1,
                slug: 1,
                pubDate: 1,
                mediaType: 1,
                score: {
                    $meta: "searchScore"
                },
            }
        }]
    ).toArray();
};