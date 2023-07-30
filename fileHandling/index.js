const fs = require('node:fs');

const fileContents = fs.readFileSync('./file.txt', 'utf-8');
console.log(fileContents);

fs.readFile('./file.txt', 'utf-8', (error, data) => {
    if(error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

fs.writeFileSync('./greet.txt', 'Jay Shree Ganesh!');

console.log( 'writeFileSync' ,fs.readFileSync('./file.txt', 'utf-8'));

fs.writeFile('./greet.txt', 'Om namo bhagwate vasudevay!',  {flag: 'a'}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('writeFile');
    }
});

console.log('writeFile' ,fs.readFileSync('./file.txt', 'utf-8'));