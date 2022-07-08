

let canvas = document.querySelector("canvas");
let Pencil = document.querySelector(".pencil")
let PencilColor = document.querySelectorAll(".pencil-color");
let PencilWidthElem = document.querySelector(".pencil-width");
let EraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let line=document.querySelector(".line")
let body = document.querySelector("body");
let rect=document.querySelector(".rect");
let penColor = "red";
let eraserColor = "white";
let penWidth = PencilWidthElem.value;

let eraserWidth = EraserWidthElem.value;

let undoRedoTracker = [];//Data
let track = 0;//Represent which action from tracker array




canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let tool = canvas.getContext("2d");




let cTool = "pencil";
Pencil.addEventListener("click", function () {
    cTool = "pencil";
})
rect.addEventListener("click", function () {
    cTool = "rect";
})
line.addEventListener("click", function () {
    cTool = "line";
})


console.log(canvas.getBoundingClientRect())
let boardtop = (canvas.getBoundingClientRect().top);
let boardleft = (canvas.getBoundingClientRect().left);
let iX, iY, fX, fY;
let drawingmode = false;










canvas.addEventListener("touchstart", function (e) {
    console.log(e);
    iX = e.changedTouches[0].clientX;
    iY = e.changedTouches[0].clientY - boardtop;
    console.log("this is ix"+iX);
//     let data={
//   iX = e.clientX,
//     iY = e.clientY - boardtop

//     }
//    socket.emit("beginPath",data);
    if (cTool == "pencil") {
        drawingmode = true;
        tool.beginPath();
        tool.moveTo(iX, iY);
    }

})
canvas.addEventListener("click",function(e){
    pencilToolCont.style.display = "none";
        eraserToolCont.style.display="none";

})

canvas.addEventListener("touchend", function (e) {
    console.log(e);
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;

    if (cTool == "pencil") {
        drawingmode = false;


    }

    else if (cTool == "line" || cTool == "rect") {

        fX = e.changedTouches[0].clientX;
        fY = e.changedTouches[0].clientY - boardtop;
        width = fX - iX;
        height = fY - iY;
        if (cTool == "rect") {

            tool.strokeRect(iX, iY, width, height)
        } else if (cTool == "line") {
           
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
        }
    }
})
canvas.addEventListener("touchmove", function (e) {
    if (drawingmode == false) {
        return;
    }
    if (cTool == "pencil") {

        fX = e.changedTouches[0].clientX-boardleft;
        fY = e.changedTouches[0].clientY + boardtop;

        tool.lineTo(fX, fY);
        tool.stroke();
        iX = fX;
        iY = fY;
    }



})









function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawstroke(strokeObj){
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
    tool.moveTo(strokeObj.x, strokeObj.y);

}

let mousedown=false;

canvas.addEventListener("mousedown", function (e) {
    // console.log(e);
    // iX = e.clientX;
    // iY = e.clientY - boardtop;
    // console.log("this is ix"+iX);
    let data={
  x: e.clientX,
    y: e.clientY - boardtop

    }
   socket.emit("beginPath",data);
    if (cTool == "pencil") {
        drawingmode = true;
      beginPath(data);
    }

})
canvas.addEventListener("click",function(e){
    pencilToolCont.style.display = "none";
        eraserToolCont.style.display="none";

})

canvas.addEventListener("mouseup", function (e) {
    
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;

    if (cTool == "pencil") {
        drawingmode = false;


    }

    else if (cTool == "line" || cTool == "rect") {

        fX = e.clientX;
        fY = e.clientY - boardtop;
        width = fX - iX;
        height = fY - iY;
        
        if (cTool == "rect") {

            tool.strokeRect(iX, iY, width, height)
        } else if (cTool == "line") {
           
            tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(fX, fY);
            tool.stroke();
        }
    }
})
canvas.addEventListener("mousemove", function (e) {
    if (drawingmode == false) {
        return;
    }
    if (cTool == "pencil") {
        let data={
            x: e.clientX,
              y: e.clientY - boardtop
          
              }
             socket.emit("drawstroke",data);

        fX = e.clientX-boardleft;
        fY = e.clientY + boardtop;

        drawstroke(data);
        
    }



})

























PencilColor.forEach(colorElem => {
    colorElem.addEventListener("click", (e) => {
        cTool = "pencil";
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
        
    }
    )

});


PencilWidthElem.addEventListener("change", (e) => {
    tool.strokeStyle = PencilColor;
    penWidth = PencilWidthElem.value;
    tool.lineWidth = penWidth;
})
EraserWidthElem.addEventListener("change", (e) => {
    tool.strokeStyle = eraserColor;
    eraserWidth = EraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else {
        tool.strokeStyle = PencilColor;
        tool.lineWidth = penWidth;
    }
})



download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }

    undoRedoCanvas(trackObj);
})
redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length - 1) {
        track++;
    }

    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
   

    undoRedoCanvas(trackObj);
})


function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
   
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image(); // new image refrence element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }


}



socket.on("beginpath",(data)=>{
    //data-> data from server
    beginPath(data);

})
socket.on("drawstroke",(data)=>{
    //data-> data from server
    drawstroke(data);

})