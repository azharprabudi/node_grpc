const client = require("./index");

client.add(
  {
    userId: 1,
    id: 1,
    title: "kondel",
    body: "kondel ganteng"
  },
  (err, notes) => {
    if (err) {
      console.log("ERROR", err);
      return;
    }

    console.log("SUCCESS", notes);
  }
);
