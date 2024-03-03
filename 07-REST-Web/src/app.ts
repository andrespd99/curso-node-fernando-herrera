import { env } from "./config/env";
import { Server } from "./presentation/server";



(async () => {
    main();
})();


function main() {
    const { PORT: port, PUBLIC_PATH: publicPath } = env;
    const server = new Server({ port, publicPath });

    server.start();
}