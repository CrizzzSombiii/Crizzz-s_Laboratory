obj={}
require("socket.io").listen(
require("http").createServer((req,res)=>{
res.writeHead(200,{"content-type":"text/html"})
res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>')
res.write('<script>socket=io()</script>')
res.write('<script>socket.on("msg",(e)=>{eval(e.script)})</script>')
res.end()
}).listen(process.env.PORT||3000,()=>{console.log("Здравствуйте!")})
).on("connection",(socket)=>{
socket.i=Math.random()
obj[socket.i]={x:0,y:0,xs:0,ys:0}
socket.emit("msg",{script:'k=[]'})
socket.emit("msg",{script:'document.body.style.margin="0"'})
socket.emit("msg",{script:'c=document.createElement("canvas")'})
socket.emit("msg",{script:'document.body.appendChild(c)'})
socket.emit("msg",{script:'ctx=c.getContext("2d")'})
socket.emit("msg",{script:'onkeydown=onkeyup=(e)=>{k[e.keyCode]=e.type=="keydown"}'})
socket.emit("msg",{script:'setInterval(()=>{for(i=0;i<400;i++){if(k[i]){socket.emit("key",{code:i})}}},25)'},1)
socket.on("key",(e)=>{
console.log(e.code+" from "+socket.i)
if(e.code==37){obj[socket.i].xs-=0.01}
if(e.code==38){obj[socket.i].ys-=0.01}
if(e.code==39){obj[socket.i].xs+=0.01}
if(e.code==40){obj[socket.i].ys+=0.01}
})
setInterval(()=>{
socket.emit("msg",{script:'c.width=innerWidth'})
socket.emit("msg",{script:'c.height=innerHeight'})
for(i in obj){
socket.emit("msg",{script:'ctx.fillStyle="rgba(0,0,0,1)"'})
socket.emit("msg",{script:'ctx.fillRect('+obj[i].x+','+obj[i].y+',32,32)'})
}},50)
})
setInterval(()=>{
for(i in obj){
obj[i].x+=obj[i].xs
obj[i].y+=obj[i].ys
if(obj[i].x+32<){obj[i].x=innerWidth+32}
if(innerWidth+32<obj[i].x){obj[i].x=-32}
if(obj[i].y+32<){obj[i].y=innerHeight+32}
if(innerHeight+32<obj[i].y){obj[i].y=-32}
}},1)
