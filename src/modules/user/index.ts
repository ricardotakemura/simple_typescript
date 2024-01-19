import { Config } from "../../config";
import { UserPresenter } from "./presenters/user.presenter";

export default async () => {
    const View = (await import(`./views/impl/${Config.USER_VIEW}.user.view`)).default;
    const Model = (await import(`./models/impl/${Config.USER_MODEL}.user.model`)).default;
    return new UserPresenter(new View(), new Model())
};