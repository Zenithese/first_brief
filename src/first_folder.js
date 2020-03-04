var skip = new Object

function firstFolder() {
    
    let keys = Object.entries(BFO['folders'])
    keys = sortParents(keys)
    if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
            let folderNum = keys[i]
            let title = BFO["folders"][folderNum]["title"]
            if (title.slice(0, 11) === "New Folder ") skip[title.slice(11)] = true
            let parent = BFO['folders'][folderNum]['parent']
            let folderClose = "close" + String(folderNum)
            let folderModal = "modal" + String(folderNum)
            let folderName = "folder" + String(folderNum)
            let folderNameItself = folderName + "handle"
            let folderNameInput = "input" + String(folderNum)
            var folder = document.createElement("div");
            folder.innerHTML = `<style>
                                    #${folderName}:hover {z-index: 1}
                                </style>
                                <div id=${folderNameItself} style="width: 100px;">
                                    <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
                                </div>
                                <div id="folder-name">
                                    <input id=${folderNameInput} type="text" name=${folderModal} value="${title}" onchange="renameFolder(document.getElementById('${folderNameInput}'))" title=${folderNum}
                                        style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                                </div>`

            // value = "New Folder${folderNum > 0 ? ` ${folderNum}` : ''}"
            folder.id = folderName
            folder.className = "droppable"
            parent !== null ?
                folder.style = `width: 100px;
                                height: 100px;
                                text-align: center;
                                margin: 10px;`
            :
                folder.style = `width: 100px;
                                flex-direction: column;
                                position: absolute;
                                text-align: center;
                                top: ${BFO['folders'][folderNum]['top']};
                                left: ${BFO['folders'][folderNum]['left']};`
            // folder.addEventListener()
            parent === null ? 
                document.body.appendChild(folder) 
                : document.getElementById(`innerFolder-${parent}`).appendChild(folder)

            dragElement(folder);
            var input = document.getElementById(folderNameInput);
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
            fillFolder(document.getElementById(folderNameInput).value, folderName, folderModal, folderClose, folderNum)
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

            if (folder.addEventListener) {
                folder.addEventListener('contextmenu', function (e) {
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
                folder.attachEvent('oncontextmenu', function (e) {
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
    } 
    // else {
        // pop-up modal to explain how to use the application
    //     greeting();
    // }
    listFiles();
}

function sortParents(array) {
    let sorted = new Array
    let parentObject = new Object
    parentObject[null] = true

    while (array.length) {
        let temp = new Array
        let revisedArray = new Array

        for (let i = 0; i < array.length; i++) {

            if (parentObject[array[i][1]['parent']]) {
                sorted.push(array[i][0])
                temp.push(array[i][0])
            } else {
                revisedArray.push(array[i])
            }

        }

        for (let i = 0; i < temp.length; i++) {
            parentObject[temp[i]] = true
        }

        array = revisedArray.slice()
    }

    return sorted
}

function greeting() {
    let welcomeModal = document.getElementById("welcome-modal")
    welcomeModal.style.display = "block"
    window.onclick = function (event) {
        welcomeModal.style.display = "none"
    }
}

// firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));