//all the classes accessed from the dom
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont")
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

//true -> show the tools , false-> hide tools
//used for the hamburger menu
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) {
        openTools();
    }
    else {
        closeTools();

    }


})
// we have added an event listenr in the above hamburger menu where we have created an toggling option which runs the below functions on the basis 
// whether the hamburger is selcected or not 
function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add(".fa-bars")
    toolsCont.style.display = "flex";

}
// we are just adding and removing add and remove from class list depending upon waht hamburger icon we want to show in both the above and 
//below functions
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove(".fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "None";
    pencilToolCont.style.display = "None";
    eraserToolCont.style.display = "None";

}
//this setes the pencil tool to become visible or invisble on the basis of wheter it is clicked or not.
//we are doing this for pencil as well as eraser tool
pencil.addEventListener("click", (e) => {
    //true will indicate show pencil tool,false ->Hide pencil tool.
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilToolCont.style.display = "block";
        eraserToolCont.style.display="none";
    }
    else {
        pencilToolCont.style.display = "none";

    }
})
eraser.addEventListener("click", (e) => {
    //true will indicate show eraser tool,false ->Hide erser tool.
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserToolCont.style.display = "flex";
        pencilToolCont.style.display = "none";
    }
    else {
        eraserToolCont.style.display = "none";

    }
})

//uploading is done when the upload image is clicked
//
upload.addEventListener("click", (e) => {
    //opening the file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let stickytemplateHTML = `  <div class="header-cont">
   <div class="minimize"></div>
   <div class="remove"></div>
</div>
<div class="note-cont">
   <img src= "${url}"/>
</div>`;
        createSticky(stickytemplateHTML);
    })
})

function createSticky(stickytemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickytemplateHTML;

    document.body.appendChild(stickyCont);
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event)
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}


sticky.addEventListener("click", (e) => {
    let stickytemplateHTML = `  
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="note-cont">
    <textarea spellcheck="false" ></textarea>
</div>`;
    createSticky(stickytemplateHTML);


})

//minimizing and closing the sticky notes



function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") {
            noteCont.style.display = "block";
        }
        else {
            noteCont.style.display = "none";
        }
    })
}


//drag and drop individual

function dragAndDrop(element, event) {


    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;


    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

    element.ondragstart = function () {
        return false;
    };
};




