import { Config } from "../../../../config";
import { UserListener } from "../user.listener";
import { UserView } from "../user.view";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";


export default class GrpcUserView implements UserView {

    private descriptor: any;
    private server: any;
    private listener: UserListener;

    constructor() {
        const packageDefinition = protoLoader.loadSync(
            Config.USER_GRPC_PROTO_PATH,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true,
            },
        );
        this.descriptor = grpc.loadPackageDefinition(packageDefinition);
        this.server = new grpc.Server();
    }
 
    public async init(listener: UserListener): Promise<void> {        
        this.listener = listener;
        this.services();
        this.server.bindAsync(Config.GRPC_IP_PORT, grpc.ServerCredentials.createInsecure(), () => {
            this.server.start();
        });
    }

    private services(): void {
        this.server.addService(this.descriptor.RouteUser.service, {
            getUser: async (call, callback) => {
                const {id = ""} = call.request;
                const user = await this.listener.onGetOne(id);
                callback(null, user);
            },
            getUsers: async (call) => {
                const users = await this.listener.onGetAll();
                users.forEach(user => call.write(user));
                call.end();
            },
            registerUser: async (call, callback) => {
                const {id = "", name = ""} = call.request;
                const newUser = { id, name };
                const user = await this.listener.onSave(newUser);
                callback(null, user);
            },
            removeUser: async (call, callback) => {
                const {id = ""} = call.request;
                const user = await this.listener.onDelete(id);
                callback(null, user);
            }
        });
    }
}