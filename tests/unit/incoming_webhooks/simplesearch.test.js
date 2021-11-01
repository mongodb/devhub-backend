const simplesearch = require('../../../devhub-search-service/http_endpoints/devhub_export/incoming_webhooks/simplesearch/source.js');

beforeEach(() => {

    const execute = jest.fn();

    // Setup global.context.services
    global.context = {
        functions: {
            execute
        }
    }
});

test('webhook calls fetchExactMatchesByContentType when payload contains content', async () => {
    const payload = {query: {content: "mockContent", text: "mockText"}};
    await simplesearch(payload);
    expect(context.functions.execute).toHaveBeenCalledWith("fetchExactMatchesByContentType","mockContent","mockText");
})

test('webhook calls fetchExactMatchesAcrossAllContent when payload contains no content', async () => {
    const payload = {query: {text: "mockText"}};
    await simplesearch(payload);
    expect(context.functions.execute).toHaveBeenCalledWith("fetchExactMatchesAcrossAllContent","mockText");
})