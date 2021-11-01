/**
* Find the text node in a nested array
* @param {Array} child an ast children array
* @returns {String} description text
*/
const getNestedText = child => {
    if (!child) {
        return '';
    }
    const firstChild = child[0];
    // If this child has child arrays keep digging
    if (firstChild.children) {
        return getNestedText(firstChild.children);
    }
    // If we hit the text node we can return that value
    if (firstChild.type === 'text') {
        return firstChild.value;
    }
    // There wasn't any content
    return '';
};

/*
* Safely return a deeply nested value from an object. If the property is not found, return null.
* Arguments:
* - p: an array containing the path to the desired return value
* - o: the object to be searched
*/
const getNestedValue = (p, o) => {
    if (!o) return null;
    return p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
};

const typeMap = {
    Article: 'article',
    HowTo: 'how-to',
    Quickstart: 'quickstart',
};

const getArticleNode = (doc) => {
    const inferredType = doc['type'] || 'Article';
    const fullSlug = `${typeMap[inferredType]}${doc['slug']}`;

    return {
            title: doc['name'],
            description: doc['description'],
            pubDate: doc['published_at'],
            atf_image: getNestedValue(['url'], doc['image']),
            slug: fullSlug ,
            type: typeMap[inferredType],
            author_names: doc['authors'].map(a => a['name']),
            languages: doc['languages'].map(a => a['language']),
            products: doc['products'].map(a => a['product']),
            tags: doc['tags'].map(a => a['tag']),
            raw_content : doc['content'],
            mediaType: 'article'
        };
}

exports = async function() {
  const endPoint = "http://54.219.137.111:1337/articles";
  const response = await context.http.get({ url: endPoint });
  const documents = JSON.parse(response.body.text());
  const formattedRstArticles = [];
  documents.forEach(document => {
    formattedRstArticles.push(getArticleNode(document));
  } );
  return formattedRstArticles;
}