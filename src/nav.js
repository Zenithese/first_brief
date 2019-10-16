function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.body.style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.body.style.marginLeft = "0";
}

function fillNav(file) {
    let item = document.createElement("a");
    item.innerHTML = `${file.name}`
    item.href = file.webViewLink
    item.target = "_blank"
    document.getElementById("mySidenav").appendChild(item)
    // dragElement(item);
}