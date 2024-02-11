var axios = require("axios");

const Cookie = process.env.BAIDU_COOKIE;

var config = {
  method: "get",
  url: "https://fanyi.baidu.com/pcnewcollection?req=get&dstStatus=all&order=time&direction=all",
  headers: {
    Connection: "keep-alive",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"',
    Accept: "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua-mobile": "?0",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62",
    "sec-ch-ua-platform": '"macOS"',
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://fanyi.baidu.com/collection",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    Cookie,
  },
};

const makeUrl = (argObj) => {
  return Object.entries(argObj)
    .map((item) => "&" + item.join("="))
    .join("");
};

const dict2means = (dict) => {
  if (dict.includes("\r\n")) {
    return dict
      .split("\r\n")
      .slice(1)
      .map((item) => item.replace(/\s/g, ""));
  } else {
    return dict.split("\n");
  }
};

// const parseWordItem = (rawData) => {
//   const {
//     dictjson,
//     dict: word_means,
//     updatetime,
//   } = JSON.parse(JSON.stringify(rawData));
//   const wordData = JSON.parse(dictjson).simple_means;
//   const { word_name } = wordData;
//   return { word_name, word_means, updatetime };
// };

/**
 * @param {string} rawData
 * @typedef {{word_name: string, word_means: Array<string>, updatetime: string}} WordItem
 * @returns {WordItem}
 */
const parseWordItem = (rawData) => {
  /**
   * @type {{fanyisrc: string, dict: string, fanyidst: Array<string>, updatetime: string}}
   */
  const {
    fanyisrc: word_name,
    dict,
    fanyidst,
    updatetime,
  } = JSON.parse(JSON.stringify(rawData));
  const _means = dict2means(dict).filter((item) => item !== "");
  const word_means = _means.length > 0 ? _means : [].concat(fanyidst);
  return { word_name, word_means, updatetime };
};

/**
 * @param {number} page
 * @param {number} page_size
 * @typedef {{currentpage: number, total: number, totalpage: number, wordList: Array<WordItem>}} CollectionPage
 * @returns {Promise<CollectionPage>}
 */
const getCollectionPage = async (page = 1, pagesize = 30) => {
  const response = await axios({
    ...config,
    url: config.url + makeUrl({ page, pagesize }),
  });
  /**
   * @type {{currentpage: number, total:number, totalpage: number, pageinfo: Array<string>}}
   */
  const { currentpage, total, totalpage, pageinfo: wordList } = response.data;
  const res = {
    currentpage,
    total,
    totalpage,
    wordList: wordList.map(parseWordItem),
  };
  return res;
};

module.exports = {
  getCollectionPage,
};
