function sideNotifications(val) {
    if (val) {
        initNotifications();
    }
}

function switchSessionVal(name,val) {
    session.settings[name]=val;
}

function toolbarEditOpen(target) {
    document.querySelectorAll(".icon-open").forEach(element => {
        element.classList.remove("icon-open");
    });
    target.classList.add("icon-open");
}

function drawToolbarEditMode(target) {
    target.innerHTML="";
    for (let index = 0; index < toolbarIconCount; index++) {
        let indexReorder = session.toolbar.reorder[index];
        let toolbarIconDOM = document.createElement("div");
        toolbarIconDOM.className = "side-icon-bar-button";
        toolbarIconDOM.setAttribute("onclick", "toolbarEditOpen(this.parentNode)");
        toolbarIconDOM.setAttribute(
          "style",
          "background-color: var(--toolbar-color-" + indexReorder + ");"
        );
        toolbarIconDOM.innerHTML = session.toolbar["button" + indexReorder + "svg"];

        let toolbarIconOptionsSmallboxDOM = document.createElement("div");
        toolbarIconOptionsSmallboxDOM.className = "side-icon-options-smallbox";

        let toolbarIconOptionsBigboxDOM = document.createElement("div");
        toolbarIconOptionsBigboxDOM.className = "side-icon-options-bigbox";

        let toolbarIconOptionsWrapperDOM = document.createElement("div");
        toolbarIconOptionsWrapperDOM.className = "side-icon-options-wrapper";
        toolbarIconOptionsWrapperDOM.append(toolbarIconOptionsSmallboxDOM);
        toolbarIconOptionsWrapperDOM.append(toolbarIconOptionsBigboxDOM);

        let toolbarIconWrapperDOM=document.createElement("div");
        toolbarIconWrapperDOM.className = "side-icon-wrapper";
        toolbarIconWrapperDOM.append(toolbarIconOptionsWrapperDOM);
        toolbarIconWrapperDOM.append(toolbarIconDOM);
        target.append(toolbarIconWrapperDOM);
    }
  }

function sideInit() {
    document.querySelectorAll(".side-form input").forEach(element => {
        element.addEventListener("input",()=>{
            element.closest(".side-form").classList.add("form-changed");
        });
    });
    drawToolbarEditMode(document.getElementById("toolbar-edit-mode-div"));
}

function changePalette(nr) {
    for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty('--theme-color-'+index, session.style.palettes[nr].colors[index]);
    document.documentElement.style.setProperty('--theme-color-'+index+'-complementary', session.style.palettes[nr].colorComplementary[index]);
    }
}