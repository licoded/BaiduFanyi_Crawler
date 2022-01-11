var moment = require("moment");
const { getCollectionPage } = require("../xhr/collection");

const compareDateStr = (s1, s2) => {
  return moment(s1).isBefore(s2);
};

const getTotalPage = async () => {
  const firstPage = await getCollectionPage(1);
  const { totalpage } = firstPage;
  return totalpage;
};

const getFirstWord = (pageData) => {
  const { wordList } = pageData;
  const [firstWord] = wordList;
  return firstWord;
};

// curDate: 2022-01-08
const checkEmptyDate = (pageData, curDate) => {
  const firstWord = getFirstWord(pageData);
  if (!firstWord) {
    console.error("收藏夹为空，或请求失败!");
    return true;
  } else {
    const { updatetime } = firstWord;
    const [updateDate] = updatetime.split(" ");
    const emptyDateFlag = compareDateStr(updateDate, curDate);
    return emptyDateFlag;
  }
};

// curDate: 2022-01-08
const getDateCollection = async (curDate) => {
  const collections = [];
  const totalPage = await getTotalPage();
  for (let pageNum = 1; pageNum <= totalPage; pageNum++) {
    const pageData = await getCollectionPage(pageNum);
    const emptyDateFlag = checkEmptyDate(pageData, curDate);
    if (emptyDateFlag) break;
    collections.push(
      ...pageData.wordList.filter((wordItem) =>
        wordItem.updatetime.startsWith(curDate)
      )
    );
  }
  return collections;
};

module.exports = {
  getDateCollection,
};
