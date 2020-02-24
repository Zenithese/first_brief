function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.body.style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.body.style.marginLeft = "0";
}

var driveFileNum = 1;

function fillNav(file) {
    let item = document.createElement("a");
    item.innerHTML = `<a href=${file.webViewLink} target="_blank" style="overflow: hidden;">${file.name}</a> <button id="driveFile-${driveFileNum}" onclick="newFile('${file.name}', '${file.webViewLink}', '${file.id}')">&#x21e8;</button>`
    // item.href = file.webViewLink
    // item.target = "_blank"
    document.getElementById("mySidenav").appendChild(item)
    // driveDragElement(item);
    driveFileNum++
}