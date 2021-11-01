// This function is the webhook's request handler.
exports = async function(posts, resURI) {
  const xml = require("xml");
  const format = require('xml-formatter');

  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
          "xmlns:dc": "http://purl.org/dc/elements/1.1/"
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                type: "application/rss+xml",
                href: resURI,
                rel: "self"
              },
            },
          },
          {
            title: "MongoDB Developer Hub",
          },
          {
            link: "https://www.mongodb.com/developer",
          },
          { description: "MongoDB Developer Hub" },
          { language: "en-US" },
          ...buildFeed(posts),
        ],
      },
    ],
  };

  const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
  return format(feed);
}


const buildFeed = (
  posts
) => {
  const feedItems = [];

  feedItems.push(
    ...posts.map(function (post) {
      const feedItem = {
        item: [
          { title: post.title },
          {
            guid: [
              { _attr: { isPermaLink: true } },
              post.url,
            ],
          },
          {
            description: {
              _cdata: post.description,
            },
          },
          {
            "dc:creator": parseArray(post.author_names)
          }
        ],
      };
      return feedItem;
    })
  );

  return feedItems;
}

const parseArray = (valueArray) => {
  if(Array.isArray(valueArray)){
    return valueArray.join(",")
  }
  return null;
}