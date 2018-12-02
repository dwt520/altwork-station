// 1.引入模块
// const http=require('http');
// // 2.创建服务器
// const server=http.createServer();
// // 3,监听请求处理请求
// server.on('request',(req,res)=>{
//     // res.statusCode=404;
//     // res.statusMessage='bbb';
//     // res.setHeader('content-type','text/css');
//     // res.writeHead(状态码，状态文本，{响应头})
//     res.writeHead(404,'ccc',{'content-type':'text/html'});
//     res.end('ok');
// })
// // 4.设置端口，开启服务器
// server.listen(9999,()=>{
//     console.log('http://localhost:9999 服务器开启');
    
// });

// const http=require('http');
// const  server=http.createServer();
// server.on('request',(req,res)=>{
//     res.writeHead(404,'ccc',{'content-type':'text/html'});
//     res.end('ok');
// })
// server.listen(9999,()=>{
//     console.log('http://localhost:9999 服务器开启');
    
// })

// const http=require('http');
// const server=http.createServer();
// server.on('request',(req,res)=>{
//     res.writeHead(404,'ccc',{'content-type':'text/html'});
//     res.end('ok');
// })
// server.listen(9999,()=>{
//     console.log('http://localhost:9999 服务器开启');
    
// })


const http=require('http');
const server=http.createServer();
server.on('request',(req,res)=>{
    console.log(req.url);
    res.setHeader('content-type','text/html;charset=utf-8');
    if(req.url.startsWith('/index')){
        res.end('你访问了首页');
    }else if(req.url.startsWith('/list')){
        res.end('你访问了列表页');
    }else if(req.url.startsWith('/login')){
        res.end('你访问了登录页');
    }else{
        res.end('404-页面走丢了');
    }
})
server.listen(9999,()=>{
    console.log('http://localhost:9999 服务器开启');
    
})

const http=require('http');
const server=http.createServer();
server.on('request',(req,res)=>{
    res.setHeader('content-type','text/html;charset=utf-8');
    if(req.url.startsWith('/index')){
        res.end('你访问了首页');
    }else if(req.url.startsWith('/list')){
        res.end('你访问了列表页');

    }else if(req.url.startsWith('/login')){
        res.end('你访问了登录页');
    }else{
        res.end('404-页面走丢了');
    }
})
server.listen(9999,()=>{
    console.log('http://localhost:9999 服务器开启');
    
})