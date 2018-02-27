const removeSpecialCharacters = (text) => {
  return text.replace(/&.+?;/gi, '').trim();
};

const getRssItemProperty = (el, prop) => {
  const propTag = el.getElementsByTagName(prop)[0];

  if (propTag) {
    return removeSpecialCharacters(propTag.textContent);
  }

  return null;
};

export const getRssFeedsListFromXML = (xmlDocument) => {
  const feedsItemsEls = xmlDocument.getElementsByTagName('item');

  return Array.prototype.reduce.call(feedsItemsEls, (prevValue, el) => {
    const feedInfo = {};

    feedInfo['title'] = getRssItemProperty(el, 'title');
    feedInfo['link'] = getRssItemProperty(el, 'link');
    feedInfo['author'] = getRssItemProperty(el, 'author');
    feedInfo['description'] = getRssItemProperty(el, 'description');
    feedInfo['category'] = getRssItemProperty(el, 'category');
    feedInfo['pubDate'] = new Date(getRssItemProperty(el, 'pubDate')).getTime();

    const thumbnailEl = el.getElementsByTagName('media:thumbnail')[0];
    if (thumbnailEl && thumbnailEl.attributes) {
      feedInfo['thumbnail'] = thumbnailEl.attributes.url.textContent;
    }

    prevValue.push(feedInfo);

    return prevValue;
  }, []);
};