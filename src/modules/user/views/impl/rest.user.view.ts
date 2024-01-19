import Fastify from "fastify";
import { UserView } from "../user.view";
import { Config } from "../../../../config";
import { UserListener } from "../user.listener";

export default class RestUserView implements UserView {

    private fastify: any;
    private listener: UserListener;

    constructor() {
        this.fastify = Fastify({
            logger: Config.LOGGER_ENABLED
        });
    }

    public async init(listener: UserListener): Promise<void> {
        try {
            this.listener = listener;
            this.routes();
            await this.fastify.listen({port: Config.REST_PORT});
            return Promise.resolve();
        } catch (err) {
            this.fastify.log.error(err);
            return Promise.reject();
        }
    }

    private routes(): void {
        this.fastify.get("/user",async (request, response) => {
            const users = await this.listener.onGetAll();
            response.status(200);
            response.send({status: "ok", data: users});
        });

        this.fastify.get("/user/:id", async (request, response) => {
            const { id = "" } = request.params;
            const user = await this.listener.onGetOne(id);
            response.status(200);
            response.send({status: "ok", data: user});
        });

        this.fastify.post("/user",async (request, response) => {
            const newUser = request.body;
            const user = await this.listener.onSave(newUser);
            response.status(201);
            response.send({status: "ok", data: user});
        });

        this.fastify.delete("/user/:id", async (request, response) => {
            const { id = "" } = request.params;
            await this.listener.onDelete(id);
            response.status(200);
        });
    }
}