// 1.引入模块
const http=require('http');
const fs=require('fs');
const path=require('path');
const mime=require('mime');
const template=require('art-template');
const url=require('url');
const queryString=require('querystring');
// 创建服务器
const server=http.createServer();
// 监听请求，处理请求
server.on('request',(req,res)=>{
    res.setHeader('content-type','text/html;charset=utf-8');
    console.log(req.url);
    console.log(req.method);
    if(req.url.startsWith('/index')||req.url=='/'){//首页
        // 先读取数据库中所有数据，再读取模板
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',(err,data)=>{
            if(err){
                return console.log('读取失败',err);
            }
            // 将json数据转成js对象
            data=JSON.parse(data);
            console.log(data);
            // 将数据和模板进行绑定，生成结构
            let str=template(path.join(__dirname,'views','index.html'),data);
            // 返回给浏览器进行解析
            res.end(str);
        })
    }else if(req.url.startsWith('/details')){//详情页面
        let id=url.parse(req.url,true).query.id;
        console.log(id);
        readData(data=>{
            data=data.list.find(v=>v.id==id);
            let str=template(path.join(__dirname,'views','datails.html'),data);
            res.end(str);
        });
        // fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',(err,data)=>{
        //     if(err){
        //         return console.log('读取失败',err);
        //     }
        //     data=JSON.parse(data);
        //     console.log(data);
        //     data=data.list.find(v=>v.id==id);
        //     // console.log(data);
            
        //     let str=template(path.join(__dirname,'views','datails.html'),data);
        //     res.end(str);
        // })
        // res.end('详情页');
    }else if(req.url.startsWith('/submit')){//提交页面
        // 此页面不需要动态渲染，读取内容直接返回即可
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
    }else if(req.url.startsWith('/add')&&req.method=='GET'){
        // console.log(req.url,true);
        console.log(url.parse(req.url,true).query);
        // 1.获取前端表单提交的数据
        let info=url.parse(req.url,true).query;
        // 读取数据库的数据
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',(err,data)=>{
            if(err){
                return console.log('读取失败',err);
            }
            data=JSON.parse(data);
            console.log(data);
            info.id=data.list[data.list.length-1].id+1;
            console.log(info);
            data.list.push(info);
            data=JSON.stringify(data,null,2);
            fs.writeFile(path.join(__dirname,'data','data.json'),data,(err)=>{
                if(err){
                    return console.log('写入失败',err);   
                }
                res.statusCode=302;
                res.setHeader('location','/index');
                res.end();
            })
        })
        
        
    }else if(req.url.startsWith('/add')&&req.method=='POST'){
        // 获取数据去哪获取
        // 只要I前端以post向后台提交数据，都会触发data事件，并且data事件可能会触发多次，将获取的数据拼接起来
        // 如果浏览器数据传递完毕，会触发end事件，在end事件中使用接受的数据
        let info='';
        // let n=1
        req.on('data',(chunk)=>{
            info+=chunk;
        });
        req.on('end',()=>{
            console.log(info);
            info=queryString.parse(info);
            
            // 读取数据库的数据
            fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',(err,data)=>{
                if(err){
                    return console.log('读取失败',err);
                }
                data=JSON.parse(data);
                console.log(data);
                info.id=data.list[data.list.length-1].id+1;
                console.log(info);
                data.list.push(info);
                data=JSON.stringify(data,null,2);
                fs.writeFile(path.join(__dirname,'data','data.json'),data,(err)=>{
                    if(err){
                        return console.log('写入失败',err);   
                    }
                    res.statusCode=302;
                    res.setHeader('location','/index');
                    res.end();
                })
            })
        })   
    }else{
        res.end('404');
    }
    
})
// 设置端口，开启服务器
server.listen(9999,()=>console.log('http://localhost:9999 服务器已开启'));


function readData(callback){
    fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',(err,data)=>{
        if (err) {
            return console.log('读取失败', err);
        }
        data=JSON.parse(data);
        callback&&callback(data); 
    });
}

function writeData(data,callback){
    fs.writeFile(path.join(__dirname,'data','data.json'),data,(err)=>{
        if (err) {
            return console.log('写入失败', err);                    
        } 
        callback&&callback();
    })
}