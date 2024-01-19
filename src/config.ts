export const Config = {
    CSV_SEPARATOR: ";",
    GRPC_IP_PORT: "0.0.0.0:50051",
    LOGGER_ENABLED: true,
    MONGODB_URL: "mongodb://127.0.0.1:27017",
    MONGODB_DATABASE: "simple",
    REST_PORT: 3030,
    USER_MONGODB_COLLECTION: "users",
    USER_CSV_FILE: "data/users.csv",
    USER_GRPC_PROTO_PATH: "protos/route.user.proto",
    USER_MODEL: "csv",
    USER_VIEW: "grpc",
}