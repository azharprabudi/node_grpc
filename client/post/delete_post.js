const client = require("./index");

client.delete({ id: 1 }, (err, notes) => {
  if (err) {
    console.log("ERROR", err);
    return;
  }

  console.log("SUCCESS", notes);
});
