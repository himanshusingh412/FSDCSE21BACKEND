// Practical 3

import http from "http";

const server = http.createServer((req, res) => {

  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  res.write("<h1>Hello World</h1>");

  res.writeHead(403, {
    "Content-Type": "text/html"
  });

  res.end("<h2>403 Forbidden Error</h2>");
})