function firstFolder(level = BFO['folders'], initial = true, parent) {
    console.log(level)
    let keys = Object.keys(level)
    if (keys.length) {
        console.log('if')
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
            if (initial) {
                console.log('inital')
                folder.style = `width: 100px;
                                flex-direction: column;
                                position: absolute;
                                text-align: center;
                                top: ${level[folderNum]['top']};
                                left: ${level[folderNum]['left']};`

                document.body.appendChild(folder)
                fillFolder(document.getElementById(folderNameInput).value, folderName, folderModal, folderClose, folderNum)
            } else {
                console.log('subsequent')
                // folder.style = `width: 100px;
                //                 flex-direction: column;
                //                 position: absolute;
                //                 text-align: center;
                //                 margin: 10px;`
                document.getElementById(`innerFolder-${parent}`).appendChild(folder)
                fillFolder(document.getElementById(folderNameInput).value, folderName, folderModal, folderClose, folderNum)
            }
            // folder.addEventListener()
            // initial ? document.body.appendChild(folder) : document.getElementById(`innerFolder-${folderNum}`).appendChild(folder)
            if (level[folderNum] && level[folderNum]['children']) firstFolder(level[folderNum]['children'], false, folderNum)

            dragElement(folder);
            var input = document.getElementById(folderNameInput);
            input.addEventListener('input', resizeInput);
            resizeInput.call(input);
            newFolderNum += 1;

            //delete folder
            let x = document.getElementById("deleteDD").style;
            let deleteFolderBtn = document.getElementById("deleteFolderBtn");
            let folderToDelete = null;

            deleteFolderBtn.addEventListener('click', function (e) {
                if (folderToDelete !== null) {
                    folderToDelete.remove();
                    delete level[folderToDelete.id.slice(6)]
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
    } else if (!keys.length && initial) {
        console.log('else')
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
                delete level[folderToDelete.id.slice(6)]
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
    if (initial) listFiles();
}

// firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));