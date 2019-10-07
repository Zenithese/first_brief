BFO = {

};

// function newNestedFolder(innerFolder) {
//     // console.log(innerFolder);
//     newFolderClose = "close" + String(newFolderNum)
//     newFolderModal = "modal" + String(newFolderNum)
//     newFolderName = "folder" + String(newFolderNum)
//     newFolderNameItself = newFolderName + "-itself"
//     folderNameInput = "input" + String(newFolderNum)
//     var newNestedFolder = document.createElement("div");
//     innerFolder.appendChild(newNestedFolder);
//     newNestedFolder.innerHTML = `<style>
//                                     #${newFolderName}:hover {z-index: 1}
//                                  </style>
//                                  <div id=${newFolderNameItself} style="width: 100px;">
//                                     <img class="image" src="http://icon-park.com/imagefiles/folder_icon_yellow.png" style="max-width: 100%">
//                                  </div>
//                                  <div id="folder-name">
//                                     <input id=${folderNameInput} type="text" name=${newFolderModal} value="New Folder ${newFolderNum}" onchange="renameFolder(document.getElementById('${folderNameInput}'))" title=${newFolderNum}
//                                         style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
//                                  </div>`
//     newNestedFolder.id = newFolderName
//     // newNestedFolder.style = `display: flex;
//     //                          flex-direction: column;
//     //                          position: absolute;
//     //                          text-align: center;`

//     dragElement(document.getElementById(newFolderName));
//     var input = document.getElementById(folderNameInput);
//     input.addEventListener('input', resizeInput);
//     resizeInput.call(input);
//     fillFolder(document.getElementById(folderNameInput).value, newFolderName, newFolderModal, newFolderClose, newFolderNum)
//     newFolderNum += 1;
// }