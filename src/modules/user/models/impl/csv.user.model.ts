import { Config } from "../../../../config";
import { User } from "../../beans/user.bean";
import { UserModel } from "../user.model";
import { readFileSync, writeFileSync } from "fs";

export default class CsvUserModel implements UserModel {

    private users: User[];

    constructor() {
        const buffer = readFileSync(Config.USER_CSV_FILE, "utf-8")
        const lines = buffer.split("\n");
        this.users = lines.map((item) => {
            const [id, name] = item.split(Config.CSV_SEPARATOR);
            return {id, name};
        });
    }

    private write() {
        const data = this.users.map(user => user.id + Config.CSV_SEPARATOR + user.name).join("\n");
        writeFileSync(Config.USER_CSV_FILE, data);
    }

    public save(user: User): Promise<User> {
        this.users.push(user);
        this.write();
        return Promise.resolve(user);
    }
    
    public findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        return Promise.resolve(user);
    }

    public findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
    
    public deleteById(id: string): Promise<User> {        
        const index = this.users.findIndex(user => user.id === id);
        const userDeleted = this.users[index];
        this.users.splice(index, 1);
        this.write();
        return Promise.resolve(userDeleted);
    }
}