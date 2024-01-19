import { default as UserModule } from "./modules/user";

function __main__(): void {
    UserModule().then((module) => module.start());
}

__main__();
