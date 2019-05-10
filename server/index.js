const grpc = require("grpc");
const axios = require("axios");
const PostProto = grpc.load("server/protos/post.proto");
const RandomNumberProto = grpc.load("server/protos/random_number.proto");

const server = new grpc.Server({});

// add service
server.addService(PostProto.PostService.service, {
  list: async (_, callback) => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      callback(null, resp.data);
    } catch (e) {
      callback({
        code: 404,
        message: "Not found",
        status: grpc.status.NOT_FOUND
      });
    }
  },
  detail: async (call, callback) => {
    try {
      const {
        request: { id: postId }
      } = call;

      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      callback(null, resp.data);
    } catch (e) {
      callback({
        code: 404,
        message: "Not found",
        status: grpc.status.NOT_FOUND
      });
    }
  },
  add: async (call, callback) => {
    try {
      const { request } = call;
      const resp = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        request
      );

      callback(null, request);
    } catch (e) {
      callback({
        code: 404,
        message: "Not found",
        status: grpc.status.NOT_FOUND
      });
    }
  },
  delete: async (call, callback) => {
    try {
      const {
        request: { id: postId }
      } = call;
      const resp = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      callback(null, {});
    } catch (e) {
      callback({
        code: 404,
        message: "Not found",
        status: grpc.status.NOT_FOUND
      });
    }
  }
});

server.addService(RandomNumberProto.RandomNumberService.service, {
  get(call, callback) {
    for (let i = 0; i < 10; i++) {
      call.write({ numb: i });
    }

    call.end();
  },
  post(call, cb) {
    call.on("data", req => {
      console.log(req);
    });

    call.on("end", end => {
      cb();
    });
  }
});

server.bind("127.0.0.1:5050", grpc.ServerCredentials.createInsecure());

console.log("Server already running at port :5050");
server.start();
