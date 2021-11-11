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
        console.log(element);
        element.addEventListener("change",()=>{
            console.log("changed");
            element.parentNode.classList.add("form-changed");
        });
    });
}