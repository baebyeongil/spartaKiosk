const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 600 });

module.exports = myCache;
