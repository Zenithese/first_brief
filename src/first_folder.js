function firstFolder() {
    
    let keys = Object.keys(BFO['folders'])
    if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
            let folderNum = keys[i]
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
                                    <input id=${folderNameInput} type="text" name=${folderModal} value="New Folder${folderNum > 0 ? ` ${folderNum}` : ''}" onchange="renameFolder(document.getElementById('${folderNameInput}'))" title=${folderNum}
                                        style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                                </div>`
            folder.id = folderName
            folder.className = "droppable"
            console.log(folderNum)
            folder.style = `width: 100px;
                        flex-direction: column;
                        position: absolute;
                        text-align: center;
                        top: ${BFO['folders'][folderNum]['top']};
                        left: ${BFO['folders'][folderNum]['left']};`
            // folder.addEventListener()
            document.body.appendChild(folder);

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
                    delete BFO['folders'][folderToDelete.id.slice(6)]
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
    } else {
        newFolderNum += 1;
        let firstFolder = document.createElement("div");
        firstFolder.id = "folder"
        firstFolder.innerHTML = `<style>
                                    #folder:hover {z-index: 1}
                                </style>
                                <div id="folderhandle">
                                    <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
                                </div>
                                <div id="folder-name">
                                    <input id="input" type="text" name="modal" value="New Folder" onchange="renameFolder(document.getElementById('input'))" title = "0"
                                        style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                                </div>`
        document.body.appendChild(firstFolder)
        var input = document.getElementById('input');
        input.addEventListener('input', resizeInput);
        resizeInput.call(input);
        let x = document.getElementById("deleteDD").style;
        let deleteFolderBtn = document.getElementById("deleteFolderBtn");
        let folderToDelete = null;

        deleteFolderBtn.addEventListener('click', function (e) {
            if (folderToDelete !== null) {
                folderToDelete.remove();
                delete BFO['folders'][folderToDelete.id.slice(6)]
                folderToDelete = null
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
    listFiles();
}

// firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));