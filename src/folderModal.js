var modalStack = [];
var mod = document.getElementById("myModal")

function fillFolder(value = "New Folder", folder = "folder", modal = "myModal", close = "close", num = "0") {
    // console.log(modal)
    var newFolderContent = document.createElement("div");

    // for stack
    document.body.appendChild(newFolderContent);
    newFolderContent.innerHTML =   `<div id=${modal} class="modal">
                                        <div id="modal-content${num}" class="modal-content">
                                            <div id="modal-content${num}handle" class="modal-header">
                                                <div id="modal-header${num}" class="modal-header">
                                                    <button class="newNestedFolderBtn" onclick="newNestedFolder(document.getElementById('innerFolder-${num}'))">New Folder</button>
                                                    <span id=${close} class="close">&times;</span>
                                                    <h2 id=${String(num)}>${value}</h2>
                                                </div>
                                            </div>
                                            
                                            <div id="innerFolder-${num}" class="modal-body"></div>
                                            <div id="portal${num}" class="portal"></div>
                                        </div>
                                        <div class="modal-footer">
                                                <h3>
                                                    <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
                                                </h3>
                                            </div>
                                    </div>`

    // for separate windows
    // mod.appendChild(newFolderContent);
    // newFolderContent.innerHTML =   `<div id=${modal}>
    //                                     <div id="modal-content${num}" class="modal-content">
    //                                         <div id="modal-content${num}handle" class="modal-header">
    //                                             <div id="modal-header${num}" class="modal-header">
    //                                                 <button class="newNestedFolderBtn" onclick="newNestedFolder(document.getElementById('innerFolder-${num}'))">New Folder</button>
    //                                                 <span id=${close} class="close">&times;</span>
    //                                                 <h2 id=${String(num)}>${value}</h2>
    //                                             </div>
    //                                         </div>
                                            
    //                                         <div id="innerFolder-${num}" class="modal-body"></div>
    //                                         <div id="portal${num}" class="portal"></div>
    //                                     </div>
    //                                     <div class="modal-footer">
    //                                             <h3>
    //                                                 <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
    //                                                 <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
    //                                                 <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
    //                                             </h3>
    //                                         </div>
    //                                 </div>`

    // Get the modal
    var modal = document.getElementById(modal);

    // Get the button that opens the modal
    var btn = document.getElementById(folder);

    // Get the <span> element that closes the modal
    var span = document.getElementById(close);

    var modals = document.getElementsByClassName("modal")
    
    // When the user clicks the button, open the modal 
    btn.ondblclick = function () {
        modal.style.display = "block";
        modalStack.push(modal)
        for (let i = 0; i < modalStack.length; i++) {
            modalStack[i].style.zIndex = `${String(i + 2)}`
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.zIndex = "2"
        modal.style.display = "none";
        modalStack.pop(modal)
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        let close = false;
        for (let i = 0; i < modals.length; i++) {
            if (event.target == modals[i]) {
                close = true;
                break
            }
        }
        if (close) {
            for (let j = 0; j < modals.length; j++) {
                modals[j].style.display = "none";
            }
            modalStack = [];
        }
    }

    dragElement(document.getElementById(`modal-content${num}`))

}

function newNestedFolder(innerFolder) {
    BFO['folders'][newFolderNum] = {}
    BFO['folders'][newFolderNum]['top'] = null
    BFO['folders'][newFolderNum]['left'] = null
    BFO['folders'][newFolderNum]['parent'] = Number(innerFolder.id.slice(12))
    BFO['folders'][newFolderNum]['children'] = []
    console.log(BFO)
    let newFolderClose = "close" + String(newFolderNum)
    let newFolderModal = "modal" + String(newFolderNum)
    let newFolderName = "folder" + String(newFolderNum)
    let newFolderNameItself = newFolderName + "handle"
    let folderNameInput = "input" + String(newFolderNum)
    var newNestedFolder = document.createElement("div");
    innerFolder.appendChild(newNestedFolder);
    newNestedFolder.innerHTML = `<style>
                                    #${newFolderName}:hover {z-index: 1}
                                 </style>
                                 <div id=${newFolderNameItself} style="width: 100px;">
                                    <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
                                 </div>
                                 <div id="folder-name">
                                    <input id=${folderNameInput} type="text" name=${newFolderModal} value="New Folder ${newFolderNum}" onchange="renameFolder(document.getElementById('${folderNameInput}'))" title=${newFolderNum}
                                        style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                                 </div>`
    newNestedFolder.id = newFolderName
    newNestedFolder.className = "droppable"
    newNestedFolder.style = `width: 100px;
                             height: 100px;
                             text-align: center;
                             margin: 10px;`

    dragElement(newNestedFolder);
    var input = document.getElementById(folderNameInput);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
    newFolderNum += 1;

    // delete folder
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

    if (newNestedFolder.addEventListener) {
        newNestedFolder.addEventListener('contextmenu', function (e) {
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
        newNestedFolder.attachEvent('oncontextmenu', function (e) {
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

function restyle(elmnt, top, left) {
    
    elmnt.style = `opacity: .8;
                   flex-direction: column;
                   position: absolute;
                   text-align: center;
                   top: ${top};
                   left: ${left};`
                //    z-index: 10;`
                // width: 100px;

    if (elmnt.id.slice(0, 13) === 'modal-content') {
        let topPos = String(Number(top.slice(0, top.length - 2)) + 31) + 'px';
        document.getElementById('innerFolder-' + elmnt.id.slice(13)).style = 
        `top: ${topPos};
        left: ${left};`
    }
}

{/* <p>Some things are easier forgotten, and some things have to be remembered, and sometimes those same somethings are the same something...</p> */}