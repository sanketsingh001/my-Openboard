const express= require("express");
// const { supportsPropertyIndex } = require("jsdom/lib/jsdom/living/generated/utils");
const socket=require("socket.io")

const app=express();//initializing the application and making the server ready
//this is used for dsiplaying index.html file 
app.use(express.static("docs"));


let port=process.env.PORT || 5000;
let server=app.listen(port,()=>{
console.log("Listening to port"+port);
})

let io=socket(server);
io.on("connection", (socket)=>{
    console.log("Made socket Connection")
    // console.log(socket);
    socket.on("beginPath",(data)=>{
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("beginPath",data);
    
        
    })
    socket.on("drawstroke",(data)=>{
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("drawstroke",data);
    
        
    })
    socket.on("pointermove",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("pointermove",data);
    
        
    })

    socket.on("redoUndo",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("redoUndo",data);
    
        
    })
    socket.on("drawrect",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("drawrect",data);
    
        
    })
    socket.on("drawLine",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("drawLine",data);
    
        
    })
    socket.on("createSticky",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("createSticky",data);
    
        
    })


    socket.on("dragging",(data)=>{
        // console.log("Hi2")
        //data from front end
        //Now transfer data to all connected computers
        io.sockets.emit("dragging",data);
    
        
    })


    // socket.on("penColor",(data)=>{
    //     // console.log("Hi2")
    //     //data from front end
    //     //Now transfer data to all connected computers
    //     io.sockets.emit("penColor",data);
    
        
    // })

    // socket.on("eraserProp",(data)=>{
    //     // console.log("Hi2")
    //     //data from front end
    //     //Now transfer data to all connected computers
    //     io.sockets.emit("eraserProp",data);
    
        
    // })
})


