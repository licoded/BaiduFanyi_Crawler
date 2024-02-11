const { getEuDicPage } = require('../xhr/euDic');

getEuDicPage(0, 100).then(console.log).catch(console.error);