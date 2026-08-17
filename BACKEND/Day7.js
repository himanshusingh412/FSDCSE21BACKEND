//create your own server using http module
const http=require('http');
const server=http.createServer((req,res)=>{
res.writeHead('Hello World');
    res.end();
});
server.listen(8000,()=>{
    console.log('Server running at http://localhost:8000/');
});