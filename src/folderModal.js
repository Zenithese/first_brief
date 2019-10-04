
// document.getElementById("modal-container").innerHTML = `<div id="myModal" class="modal">
//                                                             <div class="modal-content">
//                                                                 <div class="modal-header">
//                                                                     <span class="close">&times;</span>
//                                                                     <h2>${folder}</h2>
//                                                                 </div>
//                                                                 <div class="modal-body">
                                                                    
//                                                                 </div>
//                                                                 <div class="modal-footer">
//                                                                     <h3>
//                                                                         <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
//                                                                         <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
//                                                                         <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
//                                                                     </h3>
//                                                                 </div>
//                                                             </div>
//                                                         </div>`

function fillFolder(folder = "folder", modal = "myModal", close = "close") {
    console.log(folder);
    var newFolderContent = document.createElement("div");
    document.body.appendChild(newFolderContent);
    newFolderContent.innerHTML =   `<div id=${modal} class="modal">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <span id=${close} class="close">&times;</span>
                                                <h2>${folder}</h2>
                                            </div>
                                            <div class="modal-body">
                                                <p>Somethings are easier forgotten, and somethings have to be remembered, and sometimes thoes same somethings are the same something...</p>
                                            </div>
                                            <div class="modal-footer">
                                                <h3>
                                                    <a href="https://angel.co/justin-andersen-1" class="fab fa-angellist" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://github.com/Zenithese" class="fab fa-github" style="text-decoration: none; color: white;"></a>
                                                    <a href="https://www.linkedin.com/in/justin-andersen-54750b75/" class="fab fa-linkedin-in" style="text-decoration: none; color: white;"></a>
                                                </h3>
                                            </div>
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