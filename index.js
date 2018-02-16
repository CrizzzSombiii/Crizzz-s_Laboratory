app=require("express")()
net=require("http").createServer(app)
app.get("*",(req,res)=>{
res.sendFile(__dirname+"/docs/index.htm")
})
app.use("/docs",require("express").static(__dirname+"/public"))
net.listen(process.env.PORT||3000,()=>{console.log("Ready!")})
require("socket.io")(net,{}).sockets.on("connection",(socket)=>{

})
