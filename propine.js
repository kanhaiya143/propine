var fs = require("fs");
const { parse } = require("csv-parse");

var parser = parse({ columns: true }, function (err, records) {
  const tokeMap = {};

  records.sort(function (x, y) {
    return x.timestamp - y.timestamp;
  });
  //console.log(records);
  tokeMap["XRP"] = 0;
  tokeMap["BTC"] = 0;
  tokeMap["ETH"] = 0;
  
  for (let idx = 0; idx < records.length; idx++) {
    if (records[idx].transaction_type === "DEPOSIT") {
      tokeMap[records[idx].token] += parseFloat(records[idx].amount);
    } else {
      tokeMap[records[idx].token] -= parseFloat(records[idx].amount);
    }
  }
  console.log("Portfolio latest token value")
  console.log(tokeMap);

});

fs.createReadStream(__dirname + "/data.csv").pipe(parser);


