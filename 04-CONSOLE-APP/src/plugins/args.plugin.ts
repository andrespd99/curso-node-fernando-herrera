import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication tabl base multiplier'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Number of multiples'

    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'

    })
    .option('n', {
        alias: 'name',
        type: 'string',
        describe: 'File name',
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'File destination directory'

    })
    .check((argv, options) => {

        if (argv.b < 1) throw 'InvalidBaseError: base must be greater than 0'
        if (argv.l < 1) throw 'LimitError: limit must be greater than 0'

        return true;
    })
    .parseSync();