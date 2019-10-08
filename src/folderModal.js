
function fillFolder(value = "New Folder", folder = "folder", modal = "myModal", close = "close", num = "0") {
    var newFolderContent = document.createElement("div");
    document.body.appendChild(newFolderContent);
    newFolderContent.innerHTML =   `<div id=${modal} class="modal">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <span id=${close} class="close">&times;</span>
                                                <h2 id=${String(num)}>${value}</h2>
                                            </div>
                                            <div id="innerFolder-${num}" class="modal-body">
                                                <button class="newNestedFolderBtn" onclick="newNestedFolder(document.getElementById('innerFolder-${num}'))">New Folder</button>
                                            </div> 
                                        </div>
                                        <div class="modal-footer">
                                                <h3>
                                                    <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
                                                </h3>
                                            </div>
                                    </div>`

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
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        // if (event.target == modal) {
        //     modal.style.display = "none";
        // }
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
        }
    }

}

fillFolder()

function newNestedFolder(innerFolder) {
    newFolderClose = "close" + String(newFolderNum)
    newFolderModal = "modal" + String(newFolderNum)
    newFolderName = "folder" + String(newFolderNum)
    newFolderNameItself = newFolderName + "-itself"
    folderNameInput = "input" + String(newFolderNum)
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
    // newNestedFolder.style = `display: flex;
    //                          flex-direction: column;
    //                          position: absolute;
    //                          text-align: center;`
    
    dragElement(document.getElementById(newFolderName));
    var input = document.getElementById(folderNameInput);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
    newFolderNum += 1;
}

function newNestedFolder(innerFolder) {
    newFolderClose = "close" + String(newFolderNum)
    newFolderModal = "modal" + String(newFolderNum)
    newFolderName = "folder" + String(newFolderNum)
    newFolderNameItself = newFolderName + "-itself"
    folderNameInput = "input" + String(newFolderNum)
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
    newNestedFolder.style = `width: 100px;
                             height: 100px;
                             text-align: center;
                             margin: 10px;`

    let x = document.getElementById("deleteDD").style;
    let deleteFolderBtn = document.getElementById("deleteFolderBtn");

    deleteFolderBtn.addEventListener('click', function () {
        console.log('delete me already sexy');
    });

    if (newNestedFolder.addEventListener) {
        newNestedFolder.addEventListener('contextmenu', function (e) {
            let posX = e.clientX;
            let posY = e.clientY;
            deleteDD(posX, posY);
            e.preventDefault();
        }, false);
        document.addEventListener('click', function (e) {
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
            x.opacity = "0";
            setTimeout(function () {
                x.visibility = "hidden";
            }, 501);
        });
    }

    function deleteDD(xx, yy) {
        console.log('that\'s it')
        x.top = yy + "px";
        x.left = xx + "px";
        x.visibility = "visible";
        x.opacity = "1";
    }

    dragElement(newNestedFolder);
    var input = document.getElementById(folderNameInput);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
    newFolderNum += 1;
}

function restyle(elmnt, top, left) {
    elmnt.style = `width: 100px;
                   height: 100px;
                   display: flex;
                   flex-direction: column;
                   position: absolute;
                   text-align: center;
                   top: ${top};
                   left: ${left};`
}

// let x = document.getElementById("deleteDD").style;
// let deleteFolderBtn = document.getElementById("deleteFolderBtn");

// deleteFolderBtn.addEventListener('click', function () {
//     console.log('delete me already sexy');
// });

// if (newNestedFolder.addEventListener) {
//     newNestedFolder.addEventListener('contextmenu', function (e) {
//         let posX = e.clientX;
//         let posY = e.clientY;
//         deleteDD(posX, posY);
//         e.preventDefault();
//     }, false);
//     newNestedFolder.addEventListener('click', function (e) {
//         x.opacity = "0";
//         setTimeout(function () {
//             x.visibility = "hidden";
//         }, 501);
//     }, false);
// } else {
//     newNestedFolder.attachEvent('oncontextmenu', function (e) {
//         let posX = e.clientX;
//         let posY = e.clientY;
//         deleteDD(posX, posY);
//         e.preventDefault();
//     });
//     newNestedFolder.attachEvent('onclick', function (e) {
//         x.opacity = "0";
//         setTimeout(function () {
//             x.visibility = "hidden";
//         }, 501);
//     });
// }

// function deleteDD(xx, yy) {
//     console.log('that\'s it')
//     x.top = yy + "px";
//     x.left = xx + "px";
//     x.visibility = "visible";
//     x.opacity = "1";
// }

{/* <p>Some things are easier forgotten, and some things have to be remembered, and sometimes those same somethings are the same something...</p> */}