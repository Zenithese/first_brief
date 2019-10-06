var wallpaper = document.getElementById("wallpaper");

wallpaper.addEventListener("change", function(e) {
    changeBackground(e.target.value);
});

function changeBackground(url) {
    document.body.style = `background: url(${url}) no-repeat center center fixed; 
                           -webkit-background-size: cover;
                           -moz-background-size: cover;
                           -o-background-size: cover;
                           background-size: cover;`
}