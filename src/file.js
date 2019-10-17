// blue_file_icon link: http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png

inputNum = 0;

function newFile(name, link) {
    var newFile = document.createElement("div");
    // newFile.id = "name"
    newFile.innerHTML = `<div id="name-itself" style="width: 100px;">
                            <img class="image" src="assets/images/blue_file_icon.png" style="max-width: 100%">
                         </div>
                         <div>
                            <input id="input-${inputNum}" type="text" value=${name}
                                style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                         </div>
                         <a href=${link} target="_blank">link</a>`
    newFile.style = `width: 100px;
                        flex-direction: column;
                        text-align: center;`
    document.body.appendChild(newFile);
    dragElement(newFile);
    var input = document.getElementById(`input-${inputNum}`);
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
    inputNum++
}