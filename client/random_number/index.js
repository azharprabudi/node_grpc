const grpc = require("grpc");
const RandomNumberService = grpc.load("server/protos/random_number.proto")
  .RandomNumberService;

const client = new RandomNumberService(
  "localhost:5050",
  grpc.credentials.createInsecure()
);

module.exports = client;
