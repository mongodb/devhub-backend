exports = function(catalogue){
  const items = catalogue.map((ele,idx) => {
    const index = idx+"";
    return {id: index,
            title: ele.title,
            url: ele.url,
            content_text: JSON.stringify(ele)
    }
  })
  const jsonfeed = {
    "version": "https://jsonfeed.org/version/1.1",
    "title": "Devhub export",
    "items": items
  }
  return jsonfeed;
};