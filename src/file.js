// blue_file_icon link: http://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png

function newFile(file) {
    var newFile = document.createElement("div");
    // newFile.id = "name"
    newFile.innerHTML = `<div id="name-itself" style="width: 100px;">
                            <img class="image" src="assets/images/blue_file_icon.png" style="max-width: 100%">
                        </div>
                        <div>
                            <input id="testInput" type="text" value=${file.name}
                                style="background-color: transparent; border: none; font-size: 12px; color: white; text-shadow: 1px 1px black;">
                        </div>
                        <a href=${file.webViewLink} target="_blank">Click</a>`
    newFile.style = `width: 100px;
                        flex-direction: column;
                        position: absolute;
                        text-align: center;`
    document.body.appendChild(newFile);
    dragElement(newFile);
    var input = document.getElementById('testInput');
    input.addEventListener('input', resizeInput);
    resizeInput.call(input);
}