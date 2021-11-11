function sideNotifications(val) {
    if (val) {
        initNotifications();
    }
}

function switchSessionVal(name,val) {
    session.settings[name]=val;
}

function sideInit() {
    document.querySelectorAll(".side-form input").forEach(element => {
        element.addEventListener("input",()=>{
            element.closest(".side-form").classList.add("form-changed");
        });
    });
}