import { env } from "./config/env";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



(async () => {
    main();
})();


function main() {
    const { PORT: port, PUBLIC_PATH: publicPath } = env;
    const server = new Server({
        port,
        publicPath,
        routes: AppRoutes.routes,
    });

    server.start();
}