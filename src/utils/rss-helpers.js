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
  if (!xmlDocument.getElementsByTagName) return [];

  const feedsItemsEls = xmlDocument.getElementsByTagName('item');

  return Array.prototype.reduce.call(feedsItemsEls, (prevValue, el) => {
    const feedInfo = {};

    feedInfo['title'] = getRssItemProperty(el, 'title');
    feedInfo['link'] = getRssItemProperty(el, 'link');
    // feedInfo['author'] = getRssItemProperty(el, 'author');
    // feedInfo['description'] = getRssItemProperty(el, 'description');
    // feedInfo['category'] = getRssItemProperty(el, 'category');
    feedInfo['pubDate'] = new Date(getRssItemProperty(el, 'pubDate')).getTime();

    const thumbnailEl = el.getElementsByTagName('media:thumbnail')[0];
    if (thumbnailEl && thumbnailEl.attributes && thumbnailEl.attributes.url) {
      feedInfo['thumbnail'] = thumbnailEl.attributes.url.textContent;
    }
    const contentEl = el.getElementsByTagName('media:content')[0];
    if (contentEl && contentEl.attributes && contentEl.attributes.url) {
      feedInfo['thumbnail'] = contentEl.attributes.url.textContent;
    }

    prevValue.push(feedInfo);

    return prevValue;
  }, []);
};

export const getNameFromUrl = (url) => {
  let name = url;
  name = name.replace('https://', '');
  name = name.replace('http://', '');
  name = name.replace('www.', '');
  name = name.replace(/\?.*$/g, '');
  name = name.replace(/[\/\\].*/g, '');
  name = name.replace(/\./g, '_');

  return name;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};