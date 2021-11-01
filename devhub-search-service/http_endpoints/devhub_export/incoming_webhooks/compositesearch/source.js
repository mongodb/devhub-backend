exports = async function(payload) {
    return context.functions.execute("exportContentCatalogueFromCompositeSearch", payload);
};

if (typeof module === 'object') {
    module.exports = exports;
}

