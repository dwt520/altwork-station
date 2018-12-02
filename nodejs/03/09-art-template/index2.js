// 1.引入模块引擎
const http=require('http');
const fs=require('fs');
const path=require('path');
const template=require('art-template');
let data={
    title:'大前端',
    list:['前端1','前端2','前端3','前端4']
}
const server=http.createServer();
server.on('request',(req,res)=>{
    let str=tempalte(path.join(__dirname,'index.html'),data);
    res.end(str);
});
server.listen(9999,()=>console.log('http://localhost:9999 服务器已启动')
);