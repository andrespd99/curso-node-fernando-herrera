const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');



const wordCount = content.split(' ').length;
const reactWordCount = [...content.matchAll(/react/ig)].length;




console.log('El archivo README.md tiene', wordCount, 'palabras.');
console.log('La palabra "react" aparece', reactWordCount, 'veces.');


