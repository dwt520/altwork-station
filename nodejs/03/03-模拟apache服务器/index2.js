const http=require('http');
const fs=require('fs');
const path=require('path');
const server=http.createServer();
server.on('request',(req,res)=>{
    console.log(req.url);
    fs.readFile(path.join(__dirname,'pages',req.url),(err,data)=>{
        if(err){
            return console.log('读取失败',err);
            
        }
        res.end(data);
    });

})
server.listen(9999,()=>{
    console.log('http://localhost:9999/index.html 服务器已启动');
    
})

server.on('request',(req,res)=>{
    console.log(req.url);
    fs.readFile(path.join(__diename,'pages',req.url),(err,data)=>{
        if(err){
            return console.log('读取失败',err);
            
        }
        res.end(data);
    })
})
server.listen(9999,()=>{
    console.log('http://localhost:9999/index.html 服务器已开启');
    
})