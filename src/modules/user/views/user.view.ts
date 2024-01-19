import { UserListener } from "./user.listener";

export interface UserView {
    init(presenter: UserListener): Promise<void>;
}