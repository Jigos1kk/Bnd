import protoLoader from "@grpc/proto-loader";
import path from "path";
const PROTO_PATH = path.join(__dirname, 'bnd.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
//# sourceMappingURL=index.js.map