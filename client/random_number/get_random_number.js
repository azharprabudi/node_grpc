const client = require("./index");

var call = client.get({});

call.on("data", res => {
  console.log(res);
});

call.on("end", () => {
  console.log("end gaes");
});

call.on("error", err => {
  console.log("ERR :", err);
});
