import express, { Router } from 'express';
import path from 'path';

interface ServerOptions {
    port: number;
    routes: Router,
    publicPath?: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: ServerOptions) {
        const { port, routes, publicPath = 'public' } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;
    }


    async start() {
        //* Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.use(this.routes);

        //* Single-page app (SPA) redirection
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });


        this.app.listen(this.port, () => {
            console.log(`Server runnning on port ${this.port}...`);
        })
    }
}