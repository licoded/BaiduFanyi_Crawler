var jsonfile = require("jsonfile");
var mkdirp = require("mkdirp");
var moment = require("moment");
const { getDateCollection } = require("./service/getDayCollection");
const { getDateEuDicCollection } = require("./service/getDayEuDic");

const dataPath = "./data";

const getPathByDate = (curDate) => {
  const folderPath = curDate.split("-").slice(0, 2).join("/");
  mkdirp.sync([dataPath, folderPath].join("/"));
  const filename = `${curDate}.json`;
  return [dataPath, folderPath, filename].join("/");
};

function addFromTypeToWord(wordItem, from_type) {
  return {...wordItem, from_type};
}

const crawlByDate = async (curDate, from_type) => {
  let data = [];
  if (from_type == "Baidu") {
    data = await getDateCollection(curDate);
  } else if (from_type == "EuDic") {
    data = await getDateEuDicCollection(curDate);
  }
  data = data.map((wordItem)=>addFromTypeToWord(wordItem, from_type));
  return data;
};

const crawlByDateByTypeArr = async (curDate, from_type_arr) => {
  let data = [];
  for (let i = 0; i < from_type_arr.length; i++) {
    const from_type = from_type_arr[i];
    const dataByType = await crawlByDate(curDate, from_type);
    data = data.concat(dataByType);
  }
  return data;
}

const curDate = moment().format("YYYY-MM-DD");
// crawlByDate(curDate, 'Baidu');
// crawlByDate(curDate, 'EuDic');
crawlByDateByTypeArr(curDate, ['Baidu', 'EuDic'])
  .then((data) => {
    if (data.length == 0)
      return;
    jsonfile.writeFileSync(getPathByDate(curDate), data, { spaces: 2 });
  });
