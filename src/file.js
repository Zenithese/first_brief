// blue_file_icon link: http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png

fileNum = 0;

function newFile(name, link) {
    let top = event.clientY - 50;
    var newFile = document.createElement("div");
    newFile.id = `file-${fileNum}`
    newFile.innerHTML = `<div id="${newFile.id}-itself" style="width: 100px;" ondblclick="linkToDrive('${link}')">
                            <img class="image" src="assets/images/blue_file_icon.png" style="max-width: 100%">
                         </div>
                         <div>
                            <input id="input-${fileNum}" type="text" value=${name}
                                style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                         </div>`
    newFile.style = `width: 100px;
                     position: absolute;
                     top: ${top}px;
                     left: 270px;
                     flex-direction: column;
                     text-align: center;`
    // newFile.ondblclick = linkToDrive(link);
    document.body.appendChild(newFile);
    dragElement(newFile);
    var input = document.getElementById(`input-${fileNum}`);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    fileNum++
}

function linkToDrive(link) {
    window.open(link)
}