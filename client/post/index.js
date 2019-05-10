const grpc = require("grpc");
const PostService = grpc.load("server/protos/post.proto").PostService;

const client = new PostService(
  "localhost:5050",
  grpc.credentials.createInsecure()
);

module.exports = client;
