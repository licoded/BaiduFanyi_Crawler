const axios = require("axios");

const Cookie = process.env.EuDic_COOKIE;
const defaultCategoryId = 1707527613;

const makeUrl = (argObj) => {
  return Object.entries(argObj)
    .map((item) => "&" + item.join("="))
    .join("");
};

let config = {
  method: "get",
  maxBodyLength: Infinity,
  // url: 'https://my.eudic.net/StudyList/WordsDataSource?=8&draw=12&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=false&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=id&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=word&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=false&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=phon&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=exp&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=rating&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=false&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=addtime&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=false&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=6&order%5B0%5D%5Bdir%5D=desc&search%5Bvalue%5D=&search%5Bregex%5D=false&start=0&length=25&categoryid=1707527613',
  url:
    "https://my.eudic.net/StudyList/WordsDataSource?=8&draw=12&columns%5B0%5D%5Bdata%5D=id&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=false&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=id&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=word&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=false&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=phon&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=exp&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=rating&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=false&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=addtime&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=false&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=6&order%5B0%5D%5Bdir%5D=desc&search%5Bvalue%5D=&search%5Bregex%5D=false" +
    makeUrl({ categoryid: defaultCategoryId }),
  headers: {
    authority: "my.eudic.net",
    accept: "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    Cookie,
    pragma: "no-cache",
    referer: "https://my.eudic.net/studyList",
    "sec-ch-ua":
      '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
    "x-requested-with": "XMLHttpRequest",
  },
};

/**
 * @param {string} word_means
 * @returns {Array<string>}
 */
function parseMultipleWordMeans(word_means) {
  return word_means.replace(/ ([a-z]+)\./g, ";;$1").split(";;");
  // return '';
}

/**
 * @typedef {{ uuid: string, exp: string, addtime: string }} RawWordItem
 * @typedef {{ word_name: string, updatetime: string, word_means: Array<string> }} WordItem
 */

/**
 * @param {RawWordItem} rawWordItem
 * @returns {WordItem}
 */
function parseWordItem(rawWordItem) {
  const { uuid: word_name, exp, addtime } = rawWordItem;
  const _means = exp.replace(/<br>.*/, "");
  const word_means = parseMultipleWordMeans(_means);
  // 2024-02-11T16:35:08 --> 2024-02-11
  const updatetime = addtime.split("T")[0];
  // ; v
  return { word_name, updatetime, word_means };
}

/**
 * @param {WordItem} wordItem
 * @returns {boolean}
 */
function checkValidWordItem(wordItem) {
  return wordItem.word_name != "(null)";
}

/**
 * @param {number} page
 * @param {number} page_size
 * @typedef {{currentpage: number, total: number, totalpage: number, wordList: Array<WordItem>}} CollectionPage
 * @returns {Promise<CollectionPage>}
 */
const getEuDicPage = async (page = 0, page_size = 50) => {
  const response = await axios({
    ...config,
    url: config.url + makeUrl({ start: page * page_size, length: page_size }),
  });
  /**
   * @type {{data: Array<RawWordItem>, recordsFiltered: number}}
   */
  const { data: wordList, recordsFiltered: total } = response.data;
  const res = {
    currentpage: page,
    total,
    totalpage: total / page_size, // if page is indexed from 0
    wordList: wordList.map(parseWordItem).filter(checkValidWordItem),
  };
  return res;
};

module.exports = {
  getEuDicPage,
};
