import { Collection, MongoClient } from "mongodb";
import { User } from "../../beans/user.bean";
import { UserModel } from "../user.model";
import { Config } from "../../../../config";

export default class MongoDbUserModel implements UserModel {

    private collection: Collection<User>;

    constructor() {
        const client = new MongoClient(Config.MONGODB_URL);
        const db = client.db(Config.MONGODB_DATABASE);
        this.collection = db.collection<User>(Config.USER_MONGODB_COLLECTION);
    }

    public async save(user: User): Promise<User> {
        const { acknowledged = false } = await this.collection.updateOne({id: user.id}, {$set: user}, {upsert: true});
        return acknowledged ? Promise.resolve(user) : Promise.reject();
    }
    
    public findById(id: string): Promise<User> {
        return this.collection.findOne({id});
    }

    public findAll(): Promise<User[]> {
        return this.collection.find().toArray();
    }
    
    public async deleteById(id: string): Promise<User> {
        const user = this.findById(id);
        const { acknowledged = false} = await this.collection.deleteOne({id});
        return acknowledged ? user : Promise.reject();
    }

}