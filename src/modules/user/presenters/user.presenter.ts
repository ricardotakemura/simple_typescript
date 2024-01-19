import { User } from "../beans/user.bean";
import { UserModel } from "../models/user.model";
import { UserListener } from "../views/user.listener";
import { UserView } from "../views/user.view";

export class UserPresenter implements UserListener {
    private view: UserView;
    private model: UserModel;

    constructor(view: UserView, model: UserModel) {
        this.view = view;
        this.model = model;
    }

    public async start(): Promise<void> {
        await this.view.init(this);
    }

    public async onSave(user: User): Promise<User> {
        return await this.model.save(user);
    }

    public async onGetOne(id: string): Promise<User> {
        return await this.model.findById(id);
    }

    public async onGetAll(): Promise<User[]> {
        return await this.model.findAll();
    }

    public async onDelete(id: string): Promise<User> {
        return await this.model.deleteById(id);
    }
}
