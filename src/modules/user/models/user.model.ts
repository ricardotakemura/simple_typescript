import { User } from "../beans/user.bean";

export interface UserModel {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    deleteById(id: string): Promise<User>;
}

