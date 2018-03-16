function Responsive() {
    var x = document.getElementById("NavBar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
