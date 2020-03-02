var readyToDrop = false;
var droppableBelow = null;
var elmntBelow = null;
var appended = false;
var aboveOpenFolder = false;
var xIntersection = 0;
var yIntersection = 0;
var key, key2

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "handle")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "handle").onmousedown = dragMouseDown;
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
        // screenPos3 = e.screenX;
        // screenPos4 = e.screenY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    let currentDroppable = null;

    function elementDrag(e) {
        console.log('dragging')
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
        
        if (elmnt.id[1] === 'o') {
            key = 'folders';
            key2 = elmnt.id.slice(elmnt.id.length - 1) === "r" ? 0 : elmnt.id.slice(6);
        } else {
            key = 'files';
            key2 = elmnt.dataset.id;
        }
        if (BFO[key][key2] === undefined) BFO[key][key2] = {}
        BFO[key][key2]['top'] = elmnt.style.top
        BFO[key][key2]['left'] = elmnt.style.left
        console.log(BFO)
        
        elmnt.hidden = true;
        elmntBelow = document.elementFromPoint(event.clientX, event.clientY);
        // console.log(elmntBelow, e.clientX)
        elmnt.hidden = false;

        if (!elmntBelow) return;

        droppableBelow = elmntBelow.closest(".droppable");

        // logic for moving folder outside of another folder 
        if (elmntBelow.className === "modal" || elmntBelow.className === "modal-header" || elmntBelow.className === "modal-body") { /**/
        // if (elmntBelow.className === "modal") {
            droppableBelow = document.body
            let number = elmntBelow.id.slice(elmntBelow.id.length - 1) === "l" ? 0 : elmntBelow.id.slice(elmntBelow.id.length - 1);
            let modalContent = document.getElementById(`modal-content${number}`);
            // let modalHeader = document.getElementById(`modal-header${number}`)
            yIntersection = (modalContent.offsetTop + elmnt.offsetTop + 28 - pos2) + "px"; // 28 is the height of #modal-header
            xIntersection = (modalContent.offsetLeft + elmnt.offsetLeft - pos1) + "px";

            if (elmnt.id.slice(0, 13) === 'modal-content') return;

            if (!appended) {
                let portal = document.getElementById(`portal${number}`)
                portal.appendChild(elmnt)
                appended = true;
            }
        }
        

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
    }

    function enterDroppable(droppableBelow) {
        if (droppableBelow !== document.body) {
            droppableBelow.style.background = 'rgba(102, 255, 255, 0.5)';
            droppableBelow.style.borderRadius = '8px';
            droppableBelow.style.boxShadow = "0px 0px 0px 2px darkslategray";
        }
        readyToDrop = true;
    }

    function leaveDroppable(droppableBelow) {
        if (droppableBelow !== document.body) {
            droppableBelow.style.background = '';
            droppableBelow.style.border = '';
            droppableBelow.style.boxShadow = '';
        }
        readyToDrop = false;
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.opacity = '1';

        if (elmnt.id.slice(0, 13) === 'modal-content') return;

        if (readyToDrop && droppableBelow !== document.body && droppableBelow !== null) {
            // nest folder in folder below
            console.log('a')
            dropIn(elmnt, droppableBelow.id.slice(droppableBelow.id.length - 1))
            leaveDroppable(droppableBelow)
        }

        if (readyToDrop && droppableBelow === document.body && elmntBelow.className !== "modal-body") { /**/
        // if (readyToDrop && droppableBelow === document.body) {
            console.log('b')
            dropOut(elmnt)
            console.log(BFO)
        }

        // for separate windows
        // if (elmntBelow.id.slice(0, 11) === "innerFolder") {
        //     console.log('c')
        //     elmntBelow.appendChild(elmnt)
        //     console.log(event.clientX - Number(elmntBelow.style.top.slice(0, elmntBelow.style.top.length - 2)), event.clientY - Number(elmntBelow.style.left.slice(0, elmntBelow.style.left.length - 2)))
        //     elmnt.style.top = (event.clientY - Number(elmntBelow.style.top.slice(0, elmntBelow.style.top.length - 2)) - 5) + "px";
        //     elmnt.style.left = (event.clientX - Number(elmntBelow.style.left.slice(0, elmntBelow.style.left.length - 2)) - 55) + "px";
        //     leaveDroppable(droppableBelow)
        // }

        appended = false;
        // if (elmntBelow && elmntBelow.className === "modal-body" && elmntBelow !== null) { /**/
        //     console.log('c')
        //     elmntBelow.appendChild(elmnt);
        // }
    }
}

function dropIn(topFolder, bottomFolderNumber) {
    if (bottomFolderNumber === "r") {
        bottomFolderNumber = 0;
    };
    innerFolder = 'innerFolder-' + bottomFolderNumber;
    document.getElementById(innerFolder).appendChild(topFolder);
    BFO[key][key2]['parent'] = Number(bottomFolderNumber)
    BFO[key][key2]['top'] = null
    BFO[key][key2]['left'] = null
    topFolder.style.position = '';
    topFolder.style.margin = '10px';
    topFolder.style.height = '100px';

    console.log(key)
    key === 'folders' ? BFO[key][bottomFolderNumber]['children'].push(Number(topFolder.id.slice(6)))
    : BFO[key][bottomFolderNumber]['children'].push(topFolder.dataset.id)
}

function dropOut(topFolder) {
    document.body.appendChild(topFolder)
    topFolder.style.left = xIntersection;
    topFolder.style.top = yIntersection;
    BFO[key][key2]['top'] = yIntersection
    BFO[key][key2]['left'] = xIntersection

    let children = [];
    for (let index in BFO[key][BFO[key][key2]['parent']]['children']) {
        let child = BFO[key][BFO[key][key2]['parent']]['children'][index]
        if (child != key2) children.push(child);
    }
    BFO[key][BFO[key][key2]['parent']]['children'] = children;

    BFO[key][key2]['parent'] = null
    console.log(BFO)
    droppableBelow = null;
}

// var input = document.querySelector('input'); // get the input element
// input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
// resizeInput.call(input); // immediately call the function

function resizeInput() {
    this.style.width = (this.value.length + 1) * 6 + 'px';
}

function renameFolder(name) {
    document.getElementById(name.title).innerHTML = name.value
}

let xXx = 0;
let yYy = 0;
let newFolderNum = 0;

let i = document.getElementById("menu").style;
let folderBtn = document.getElementById("newFolderBtn");
let fileBtn = document.getElementById("newFileBtn");

folderBtn.addEventListener('click', function() {
    if (accessToken) {
        newFolder(xXx, yYy)
    } else {
        alert('Authorize first')
    }
});

fileBtn.addEventListener('click', function () {
    if (accessToken) {
        createNewFile(`${yYy}px`, `${xXx}px`);
    } else {
        alert('Authorize first')
    }
});

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
    BFO['folders'][newFolderNum] = {}
    BFO['folders'][newFolderNum]['top'] = `${yYy}px`
    BFO['folders'][newFolderNum]['left'] = `${xXx}px`
    BFO['folders'][newFolderNum]['parent'] = null
    BFO['folders'][newFolderNum]['children'] = []
    console.log(BFO)
    newFolderClose = "close" + String(newFolderNum)
    newFolderModal = "modal" + String(newFolderNum)
    newFolderName = "folder" + String(newFolderNum)
    newFolderNameItself = newFolderName + "handle"
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
    newFolder.id = newFolderName
    newFolder.className = "droppable"
    newFolder.style = `width: 100px;
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
            recursiveDelete(folderToDelete.id.slice(6)) // delete BFO['folders'][folderToDelete.id.slice(6)]
            folderToDelete = null
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