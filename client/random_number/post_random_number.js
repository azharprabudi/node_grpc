const client = require("./index");

const call = client.post((a, b) => {
  console.log({ a, b });
});

call.write({ numb: 1 });
call.write({ numb: 2 });
call.write({ numb: 3 });

call.end();
