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

firstFolder(); fillFolder(); dragElement(document.getElementById("folder"));