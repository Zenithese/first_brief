var wallpaper = document.getElementById("wallpaper");

wallpaper.addEventListener("change", function(e) {
    changeBackground(e.target.value);
});

function changeBackground(url) {
    // console.log(url)
    // document.body.style = `background-image: url(${url})`
    document.body.style = `background-color: transparent;
                           background-image: url(${url})`
}