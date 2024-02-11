const { getEuDicPage } = require('../xhr/euDicV2');

getEuDicPage(0, 10).then(console.log).catch(console.error);