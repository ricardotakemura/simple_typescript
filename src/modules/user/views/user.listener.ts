import { User } from "../beans/user.bean";

export interface UserListener {
    onSave(user: User);
    onGetOne(id: string);
    onGetAll();
    onDelete(id: string);
}