var jsonfile = require("jsonfile");
var mkdirp = require("mkdirp");
var moment = require("moment");
const { getDateCollection } = require("./service/getDayCollection");

const dataPath = "./data";

const getPathByDate = (curDate) => {
  const folderPath = curDate.split("-").slice(0, 2).join("/");
  mkdirp.sync([dataPath, folderPath].join("/"));
  const filename = `${curDate}.json`;
  return [dataPath, folderPath, filename].join("/");
};

const crawlByDate = async (curDate) => {
  const data = await getDateCollection(curDate);
  jsonfile.writeFileSync(getPathByDate(curDate), data, { spaces: 2 });
};

const curDate = moment().format("YYYY-MM-DD");
crawlByDate(curDate);
