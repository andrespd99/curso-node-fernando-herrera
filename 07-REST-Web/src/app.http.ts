import fs from "fs";
import http from "http";


const server = http.createServer((req, res) => {
    console.log(req.url);




    if (req.url == '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile)
        return;
    }


    if (req.url == '/css/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    else if (req.url == '/js/script.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);

    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end()
    }

});


server.listen(8080, () => {
    console.log(`Server running on port 8080`);
});