const axios = require('axios');

const Authorization = process.env.EuDic_Authorization;
const defaultLanguage = 'en';
const defaultCategoryId = 1707527613;

const makeUrl = (argObj) => {
    return Object.entries(argObj)
        .map((item) => "&" + item.join("="))
        .join("");
};

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    // url: 'https://api.frdic.com/api/open/v1/studylist/words/0?language=en&category_id=1707527613&page=0',
    url: 'https://api.frdic.com/api/open/v1/studylist/words/0?' + makeUrl({ language: defaultLanguage, category_id: defaultCategoryId }),
    headers: {
        Authorization,
    }
};

/**
 * @param {string} word_means
 * @returns {Array<string>}
 */
function parseMultipleWordMeans(word_means) {
    return word_means
        .replace(/; ([a-z])/g, ';;$1')
        .split(';;');
    // return '';
}

/**
 * @typedef {{ word: string, exp: string }} RawWordItem
 * @typedef {{ word_name: string, word_means: Array<string> }} WordItem
 */

/**
 * @param {RawWordItem} rawWordItem
 * @returns {WordItem}
 */
function parseWordItem(rawWordItem) {
    const { word: word_name, exp } = rawWordItem;
    const _means = exp.replace(/<br>.*/, '')
    const word_means = parseMultipleWordMeans(_means);
    // ; v
    return { word_name, word_means };
}

/**
 * @param {number} page
 * @param {number} page_size
 * @returns { Promise<Array<WordItem>> }
 */
const getEuDicPage = async (page = 0, page_size = 100) => {
    const response = await axios({
        ...config,
        url: config.url + makeUrl({ page, page_size }),
    });
    /**
     * @type {{data: Array<RawWordItem>}}
    */
    const { data: wordList } = response.data;
    return wordList.map(parseWordItem);
};

module.exports = {
    getEuDicPage,
};
