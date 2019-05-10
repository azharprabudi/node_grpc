const client = require("./index");

client.detail({ id: 10092 }, (err, notes) => {
  if (err) {
    console.log("ERROR", err);
    return;
  }

  console.log("SUCCESS", notes);
});
