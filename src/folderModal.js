
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
                                                <button onclick="newNestedFolder(document.getElementById('innerFolder-${num}'))">New Folder</button>
                                                <p>Somethings are easier forgotten, and somethings have to be remembered, and sometimes those same somethings are the same something...</p>
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
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

fillFolder()

function newNestedFolder(innerFolder) {
    // console.log(innerFolder);
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
    // console.log(innerFolder);
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
                             text-align: center;
                             margin: 10px;`
    dragElement(newNestedFolder);
    var input = document.getElementById(folderNameInput);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
    newFolderNum += 1;
}

function restyle(elmnt, top, left) {
    elmnt.style = `width: 100px;
                   display: flex;
                   flex-direction: column;
                   position: absolute;
                   text-align: center;
                   top: ${top};
                   left: ${left};`
}