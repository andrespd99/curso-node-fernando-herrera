import fs from 'fs';

import { argv } from './plugins/args.plugin';


const { b: base, l: limit, s: showTable } = argv;


let outputMessage = '';

const header: string = `
====================
Tabla del ${base}
====================\n
`

for (let index = 0; index <= limit; index++) {
    const entry: string = `${base} x ${index} = ${base * index}\n`
    outputMessage += entry;
}

outputMessage = header + outputMessage


const outputDir = "./outputs";
const outputPath = `${outputDir}/tabla-${base}.txt`

fs.mkdirSync(outputDir, { recursive: true })


fs.writeFileSync(outputPath, outputMessage);

if (showTable) console.log(outputMessage)

console.log('File created!')
