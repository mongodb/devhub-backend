exports = async function(payload) {
    const searchText = payload.query.text;
    const content = payload.query.content !== undefined ? payload.query.content : "all";
    const searchResults = (content === "all") ? context.functions.execute("fetchExactMatchesAcrossAllContent", searchText) : context.functions.execute("fetchExactMatchesByContentType",content,searchText);
    return searchResults;
};
