const exportContent = require("../../../devhub-catalogue-export/http_endpoints/exportContent/incoming_webhooks/devhub-catalogue/source")


describe('with empty payload query', () => {
    beforeEach(() => {
        const execute = jest.fn().mockReturnValueOnce("").mockReturnValueOnce([]);
        global.context = {
            functions: {
                execute
            }
        }
    })

    test("export with no payload query", async () => {
        const payload = { query: {} }
        await exportContent(payload)
        expect(context.functions.execute.mock.calls.length).toBe(3)
        expect(context.functions.execute).toBeCalledWith("buildQueryStringFromParams", {})
        expect(context.functions.execute).toBeCalledWith("getData")
        expect(context.functions.execute).toBeCalledWith("constructJsonFeedFromCatalogue", [])
    })

    test("export with undefined payload query", async () => {
        const payload = {}
        await exportContent(payload)
        expect(context.functions.execute.mock.calls.length).toBe(2)
    })
})

describe('with payload query', () => {
    beforeEach(() => {
        const execute = jest.fn().mockReturnValueOnce("?foo=bar");
        const text = jest.fn().mockReturnValue('[]')
        const get = jest.fn().mockReturnValue({
            body: {
                text
            }
        })

        global.context = {
            functions: {
                execute
            },
            http: {
                get
            }
        }
    })

    test('export with payload query', async () => {
        const payload = {query: {"foo": "bar"}}
        await exportContent(payload)
        expect(context.functions.execute.mock.calls.length).toBe(2)
        expect(context.http.get.mock.calls.length).toBe(1)
        expect(context.functions.execute).toBeCalledWith("buildQueryStringFromParams", {"foo": "bar"})
        expect(context.functions.execute).toBeCalledWith("constructJsonFeedFromCatalogue", [])
    })
})