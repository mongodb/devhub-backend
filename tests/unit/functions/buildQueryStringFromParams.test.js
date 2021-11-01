const buildQueryStringFromParams = require("../../../devhub-catalogue-export/functions/buildQueryStringFromParams")

test("Build query string with params", () => {
    const params = {hello: "world", foo: "bar"}
    expect(buildQueryStringFromParams(params)).toBe("?hello=world&foo=bar")
})

test("Build query string with no params", () => {
    const params = {}
    expect(buildQueryStringFromParams(params)).toBe("")
})