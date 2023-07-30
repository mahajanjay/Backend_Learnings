const http = require('node:http');
const fs = require('node:fs');
const port = 3000;

const server = http.createServer((req, res) => {
    res.end(req.url);
    const json = {
        firstname: 'Ram',
        lastname: 'Sharma'
    }

    res.writeHead(200, { 'Content-type': 'text/html' } );

    // const fileContent = fs.readFileSync('./file.html', 'utf-8')

    fs.createReadStream('./file.html').pipe(res);

    // res.end(fileContent);
    // console.log(req);
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});