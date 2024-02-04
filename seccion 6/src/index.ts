import { argv } from './plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
    main()
})();


async function main() {

    const { b: base, l: limit, s: showTable, n: fileName, d: destination } = argv;

    ServerApp.run({ base, limit, showTable, fileName, destination });

}