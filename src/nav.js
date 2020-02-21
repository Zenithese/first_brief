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

// var tentativeTop = 0;
// var tentativeLeft = 0;

// function driveDragElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//     if (document.getElementById(elmnt.id + "-header")) {
//         /* if present, the header is where you move the DIV from:*/
//         document.getElementById(elmnt.id + "-header").onmousedown = driveDragMouseDown;
//     } else {
//         /* otherwise, move the DIV from anywhere inside the DIV:*/
//         elmnt.onmousedown = driveDragMouseDown;
//     }

//     function driveDragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // get the mouse cursor position at startup:
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = driveCloseDragElement;
//         // call a function whenever the cursor moves:
//         document.onmousemove = driveElementDrag;
//     }

//     function driveElementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         // set the element's new position:
//         tentativeTop = (elmnt.offsetTop - pos2) + "px";
//         tentativeLeft = (elmnt.offsetLeft - pos1) + "px";
//         elmnt.style.top = tentativeTop;
//         elmnt.style.left = tentativeLeft;
//     }

//     function driveCloseDragElement() {
//         elmnt.style = `width: 100px;
//                        flex-direction: column;
//                        position: absolute;
//                        text-align: center;`
//         // document.body.appendChild(elmnt)
//         newFile(elmnt.innerHTML, elmnt.href)
//         elmnt.style.top = tentativeTop;
//         elmnt.style.left = tentativeLeft;
//         /* stop moving when mouse button is released:*/
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }