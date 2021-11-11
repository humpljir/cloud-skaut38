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

function changePalette(nr) {
    for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty('--theme-color-'+index, session.style.palettes[nr].colors[index]);
    document.documentElement.style.setProperty('--theme-color-'+index+'-complementary', session.style.palettes[nr].colorComplementary[index]);
    }
}