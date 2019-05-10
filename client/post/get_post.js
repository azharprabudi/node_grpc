const client = require("./index");

client.list({}, (err, notes) => {
  if (err) {
    console.log("ERROR", err);
    return;
  }

  console.log("SUCCESS", notes);
});
