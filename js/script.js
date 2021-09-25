function closeMenu() {
    document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target) {
    document.querySelectorAll("#menu-formbox-div form").forEach(element => {
        element.classList.remove("form-visible");
    });
    document.getElementById(target).classList.add("form-visible");
    document.getElementById("menu-submit-button").innerHTML = document.getElementById(target).getAttribute("data-submit-label");
    document.getElementById("menu-submit-button").setAttribute("form",target);
    document.getElementById("main-wrapper-div").classList.add("menu-open");
}