
// blue_file_icon link: http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png

fileNum = 0;

function newFile(name, link, id, top, left, parent) {
    if (top === undefined) top = String(event.clientY - 50) + 'px', left = '270px';
    var newFile = document.createElement("div");
    newFile.id = `file-${fileNum}`
    newFile.dataset.id = `${id}`
    newFile.innerHTML = `<div id="${newFile.id}handle" style="width: 100px;" ondblclick="linkToDrive('${link}')">
                            <img class="image" src="assets/images/blue_file_icon.png" style="max-width: 100%">
                         </div>
                         <div>
                            <textarea id="input-${fileNum}" type="text" value="${name}" onchange="renameDriveFile('${id}', document.getElementById('input-${fileNum}').value)"
                                style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">${name}</textarea>
                         </div>`
    
    newFile.style = `width: 100px;
                     position: absolute;
                     top: ${top};
                     left: ${left};
                     flex-direction: column;
                     text-align: center;`
    // newFile.ondblclick = linkToDrive(link);
    parent === null || parent === undefined ? document.body.appendChild(newFile) : document.getElementById(`innerFolder-${parent}`).appendChild(newFile)
    // document.body.appendChild(newFile); // to leave the nav
    dragElement(newFile);
    var input = document.getElementById(`input-${fileNum}`);
    input.addEventListener('textarea', resizeInput); // in progress: changing input to textarea
    resizeInput.call(input);
    fileNum++
    if (BFO['files'][id] === undefined) {
        BFO['files'][id] = {}
        BFO['files'][id]['top'] = `${top}`
        BFO['files'][id]['left'] = `${left}`
        BFO['files'][id]['parent'] = null
    }
    console.log(BFO)

    //delete file
    let x = document.getElementById("deleteFileDD").style;
    let deleteFileBtn = document.getElementById("deleteFileBtn");
    let fileToDelete = null;

    deleteFileBtn.addEventListener('click', function (e) {
        if (fileToDelete !== null) {
            fileToDelete.remove();
            recursiveDelete(fileToDelete.dataset.id)
            fileToDelete = null
        }
    });

    if (newFile.addEventListener) {
        newFile.addEventListener('contextmenu', function (e) {
            fileToDelete = e.path[2];
            let posX = e.clientX;
            let posY = e.clientY;
            deleteFileDD(posX, posY);
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
        newFile.attachEvent('oncontextmenu', function (e) {
            let posX = e.clientX;
            let posY = e.clientY;
            deleteFileDD(posX, posY);
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

    function deleteFileDD(xx, yy) {
        DDD = true;
        x.top = yy + "px";
        x.left = xx + "px";
        x.visibility = "visible";
        x.opacity = "1";
    }
}

function linkToDrive(link) {
    window.open(link)
}

function fillFirstFile(name, link, fileId) {
    let top = event.clientY - 50;
    var newFile = document.createElement("div");
    newFile.id = `file-${fileNum}`
    newFile.innerHTML = `<div id="${newFile.id}handle" style="width: 100px;" ondblclick="linkToDrive('${link}')">
                            <img class="image" src="assets/images/blue_file_icon.png" style="max-width: 100%">
                         </div>
                         <div>
                            <input id="input-${fileNum}" type="text" value=${name} onchange="renameDriveFile('${fileId}', document.getElementById('input-${fileNum}').value)"
                                style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                         </div>`
    newFile.style = `width: 100px;
                             height: 100px;
                             text-align: center;
                             margin: 10px;`
    // newFile.ondblclick = linkToDrive(link);
    document.getElementById("innerFolder-0").appendChild(newFile); // to fill the first (omni) file
    dragElement(newFile);
    var input = document.getElementById(`input-${fileNum}`);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fileNum++
}