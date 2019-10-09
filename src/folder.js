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

    let currentDroppable = null;

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
        restyle(elmnt, elmnt.style.top, elmnt.style.left)

        elmnt.hidden = true;
        let elmntBelow = document.elementFromPoint(event.clientX, event.clientY);
        elmnt.hidden = false;

        if (!elmntBelow) return;

        let droppableBelow = elmntBelow.closest(".droppable");
        

        if (currentDroppable != droppableBelow) {
            // we're flying in or out...
            // note: both values can be null
            //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
            //   droppableBelow=null if we're not over a droppable now, during this event

            if (currentDroppable) {
                // the logic to process "flying out" of the droppable (remove highlight)
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                // the logic to process "flying in" of the droppable
                enterDroppable(currentDroppable);
            }
        }

        function enterDroppable(elmnt) {
            elmnt.style.background = 'darkturquoise';
            elmnt.style.border = '2px solid black';
            elmnt.style.borderRadius = '8px';
        }

        function leaveDroppable(elmnt) {
            elmnt.style.background = '';
            elmnt.style.border = '';
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.opacity = '1';
    }
}

var input = document.querySelector('input'); // get the input element
input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
    this.style.width = (this.value.length + 1) * 6 + 'px';
}

function renameFolder(name) {
    document.getElementById(name.title).innerHTML = name.value
}

let xXx = 0;
let yYy = 0;
newFolderNum = 1;

let i = document.getElementById("menu").style;
let folderBtn = document.getElementById("newFolderBtn");

folderBtn.addEventListener('click', function() {
    newFolder(xXx, yYy);
});
// folderBtn.onclick = newFolder(top, left);

if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        let posX = e.clientX;
        let posY = e.clientY;
        xXx = posX;
        yYy = posY;
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
        let posX = e.clientX;
        let posY = e.clientY;
        menu(posX, posY);
        // xXx = posX;
        // yYy = posY;
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
    if (!DDD) {
        i.top = y + "px";
        i.left = x + "px";
        i.visibility = "visible";
        i.opacity = "1";
    }
}

var DDD = false;

function newFolder(xXx, yYy) {
    newFolderClose = "close" + String(newFolderNum)
    newFolderModal = "modal" + String(newFolderNum)
    newFolderName = "folder" + String(newFolderNum)
    newFolderNameItself = newFolderName + "-itself"
    folderNameInput = "input" + String(newFolderNum)
    var newFolder = document.createElement("div");
    newFolder.innerHTML =  `<style>
                                #${newFolderName}:hover {z-index: 1}
                            </style>
                            <div id=${newFolderNameItself} style="width: 100px;">
                                <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
                            </div>
                            <div id="folder-name">
                                <input id=${folderNameInput} type="text" name=${newFolderModal} value="New Folder ${newFolderNum}" onchange="renameFolder(document.getElementById('${folderNameInput}'))" title=${newFolderNum}
                                    style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                            </div>`
    // document.getElementById(folderNameInput).dataset.close = newFolderClose
    newFolder.id = newFolderName
    newFolder.className = "droppable"
    newFolder.style =  `width: 100px;
                        height: 120px;
                        
                        flex-direction: column;
                        position: absolute;
                        text-align: center;
                        top: ${yYy}px;
                        left: ${xXx}px;`
    // newFolder.addEventListener()
    document.body.appendChild(newFolder);

    dragElement(newFolder);
    var input = document.getElementById(folderNameInput); 
    input.addEventListener('input', resizeInput); 
    resizeInput.call(input);
    fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
    newFolderNum += 1;

    //delete folder
    let x = document.getElementById("deleteDD").style;
    let deleteFolderBtn = document.getElementById("deleteFolderBtn");
    let folderToDelete = null;

    deleteFolderBtn.addEventListener('click', function (e) {
        if (folderToDelete !== null) {
            folderToDelete.remove();
        }
    });

    if (newFolder.addEventListener) {
        newFolder.addEventListener('contextmenu', function (e) {
            folderToDelete = e.path[2];
            let posX = e.clientX;
            let posY = e.clientY;
            deleteDD(posX, posY);
            e.preventDefault();
        }, false);
        document.addEventListener('click', function (e) {
            DDD = false;
            x.opacity = "0";
            setTimeout(function () {
                x.visibility = "hidden";
            }, 501);
        }, false);
    } else {
        newFolder.attachEvent('oncontextmenu', function (e) {
            let posX = e.clientX;
            let posY = e.clientY;
            deleteDD(posX, posY);
            e.preventDefault();
        });
        document.attachEvent('onclick', function (e) {
            DDD = false;
            x.opacity = "0";
            setTimeout(function () {
                x.visibility = "hidden";
            }, 501);
        });
    }

    function deleteDD(xx, yy) {
        DDD = true;
        x.top = yy + "px";
        x.left = xx + "px";
        x.visibility = "visible";
        x.opacity = "1";
    }
}

//delete functionality for automatic folder

function firstFolder() {
    let firstFolder = document.getElementById("folder")
    let x = document.getElementById("deleteDD").style;
    let deleteFolderBtn = document.getElementById("deleteFolderBtn");
    let folderToDelete = null;

    deleteFolderBtn.addEventListener('click', function (e) {
        if (folderToDelete !== null) {
            folderToDelete.remove();
        }
    });

    if (firstFolder.addEventListener) {
        firstFolder.addEventListener('contextmenu', function (e) {
            folderToDelete = e.path[2];
            let posX = e.clientX;
            let posY = e.clientY;
            deleteDD(posX, posY);
            e.preventDefault();
        }, false);
        document.addEventListener('click', function (e) {
            DDD = false;
            x.opacity = "0";
            setTimeout(function () {
                x.visibility = "hidden";
            }, 501);
        }, false);
    } else {
        firstFolder.attachEvent('oncontextmenu', function (e) {
            let posX = e.clientX;
            let posY = e.clientY;
            deleteDD(posX, posY);
            e.preventDefault();
        });
        document.attachEvent('onclick', function (e) {
            DDD = false;
            x.opacity = "0";
            setTimeout(function () {
                x.visibility = "hidden";
            }, 501);
        });
    }

    function deleteDD(xx, yy) {
        DDD = true;
        x.top = yy + "px";
        x.left = xx + "px";
        x.visibility = "visible";
        x.opacity = "1";
    }
}

firstFolder();