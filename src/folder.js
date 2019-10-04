dragElement(document.getElementById("folder"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-itself")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "-itself").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var input = document.querySelector('input'); // get the input element
input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
    this.style.width = (this.value.length + 1) * 6 + 'px';
}

function renameFolder(e) {
    document.getElementById("folder-name").value = e
}

var i = document.getElementById("menu").style;
if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        var posX = e.clientX;
        var posY = e.clientY;
        menu(posX, posY);
        e.preventDefault();
    }, false);
    document.addEventListener('click', function (e) {
        i.opacity = "0";
        setTimeout(function () {
            i.visibility = "hidden";
        }, 501);
    }, false);
} else {
    document.attachEvent('oncontextmenu', function (e) {
        var posX = e.clientX;
        var posY = e.clientY;
        menu(posX, posY);
        e.preventDefault();
    });
    document.attachEvent('onclick', function (e) {
        i.opacity = "0";
        setTimeout(function () {
            i.visibility = "hidden";
        }, 501);
    });
}

function menu(x, y) {
    i.top = y + "px";
    i.left = x + "px";
    i.visibility = "visible";
    i.opacity = "1";
}

newFolderNum = 0

function newFolder() {
    newFolderName = "folder" + String(newFolderNum)
    newFolderNameItself = newFolderName + "-itself"
    console.log(newFolderNameItself);
    var newFolder = document.createElement("div");
    newFolder.innerHTML =  `<div id=${newFolderNameItself} style="width: 100px;">
                                <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
                            </div>
                            <form id="folder-name" onsubmit="renameFolder(e)">
                                <input type="text" name="new_folder" value="New Folder"
                                    style="background-color: transparent; border: none; font-size: 12px;">
                            </form>`
    newFolder.id = newFolderName
    newFolder.style =  `width: 100px;
                        height: 120px;
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        left: 10%;
                        top: 200px;
                        text-align: center;`
    document.body.appendChild(newFolder);
    dragElement(document.getElementById(newFolderName));
    newFolderNum += 1;
    console.log(newFolderNum)
}

// function component() {
//     const element = document.createElement('div');

//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     return element;
// }

// el = document.getElementById("folder-name");

// el.appendChild(component());