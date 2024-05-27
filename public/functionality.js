
// ---------------- hide or show all days (except #extended, check style.css) ---------------- //

function toggleall() {
    let arr = [...document.getElementsByClassName("day")]
    arr.forEach(e => {
        e.classList.toggle("hidden");
    });
}

