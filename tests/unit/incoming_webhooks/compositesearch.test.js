const compositesearch = require('../../../devhub-search-service/http_endpoints/devhub_export/incoming_webhooks/compositesearch/source.js');

beforeEach(() => {

    const execute = jest.fn();

    // Setup global.context.services
    global.context = {
        functions: {
            execute
        }
    }
});

test('webhook calls fetchCompositeSearchResults with payload', async () => {
    const payload = {};
    await compositesearch(payload);
    expect(context.functions.execute).toHaveBeenCalledWith("exportContentCatalogueFromCompositeSearch",payload);
})