// 根据不同的请求，返回对应的静态页面
const http=require('http');
const fs=require('fs');
const path=require('path');
const mime=require('mime');
// 创建服务器
const server=http.createServer();
// 处理请求
server.on('request',(req,res)=>{
    console.log(req.url);
    if(req.url.startsWith('/index')||req.url=='/'){
        fs.readFile(path.join(__dirname,'views','index.html'),(err,data)=>{
            if(err){
                return console.log('读取是被',err);
            }
            res.end(data);
        });
    }else if(req.url.startsWith('/details')){
        fs.readFile(path.join(__dirname,'views','details.html'),(err,data)=>{
            if(err){
                return console.log('读取失败',err);
            }
            res.end(data);
        })
    }else if(req.url.startsWith('/submit')){
        fs.readFile(path.join(__dirname,'views','submit.html'),(err,data)=>{
            if(err){
                return console.log('读取失败',err);
                
            }
            res.end(data);
        })
    }else if(req.url.startsWith('/assets')){
        fs.readFile(path.join(__dirname,req.url),(err,data)=>{
            if(err){
                return console.log('读取失败',err);
            }
            res.setHeader('content-type',mime.getType(req.url));
            res.end(data);
        })
    }else{
        res.writeHead(404,{'content-type':'text/html;charset=utf-8'});
        console.log('404');
        
    }
    
});
server.listen(9999,()=>console.log('http://localhost:9999 服务器已开启'));

