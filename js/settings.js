function sideNotifications(val) {
    if (val) {
        initNotifications();
    }
}

function switchSessionVal(name, val) {
    session.settings[name] = val;
}

function toolbarEditOpen(target) {
    document.querySelectorAll(".icon-open").forEach(element => {
        element.classList.remove("icon-open");
    });
    target.classList.add("icon-open");
}

function toolbarEditColor(index,color,colorComplementary) {
    document.documentElement.style.setProperty('--toolbar-color-'+index, color);
    document.documentElement.style.setProperty('--toolbar-color-'+index+'-complementary', colorComplementary);
}

function toggleToolbarEditMode() {
    document.getElementById("toolbar-edit-mode-div").classList.toggle("toggle-edit");
}

function drawToolbarEditMode(target) {
    target.innerHTML = "";
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

        let toolbarIconOptionsSwapDOM = document.createElement("img");
        toolbarIconOptionsSwapDOM.className="side-icon-bar-edit-swap";
        toolbarIconOptionsSwapDOM.src = "img/swap-icon.svg";

        let toolbarIconOptionsDeleteDOM = document.createElement("img");
        toolbarIconOptionsDeleteDOM.className="side-icon-bar-edit-delete";
        toolbarIconOptionsDeleteDOM.src = "img/delete-icon.svg";

        let toolbarIconOptionsReorderDOM = document.createElement("img");
        toolbarIconOptionsReorderDOM.className="side-icon-bar-edit-reorder";
        toolbarIconOptionsReorderDOM.src = "img/reorder-icon.svg";

        let toolbarIconLineOptionsDOM = document.createElement("div");
        toolbarIconLineOptionsDOM.className = "side-icon-options";
        toolbarIconLineOptionsDOM.append(toolbarIconOptionsSwapDOM);
        toolbarIconLineOptionsDOM.append(toolbarIconOptionsDeleteDOM);
        toolbarIconLineOptionsDOM.append(toolbarIconOptionsReorderDOM);

        let toolbarIconLineWrapperDOM = document.createElement("div");
        toolbarIconLineWrapperDOM.className = "side-icon-line-wrapper";
        toolbarIconLineWrapperDOM.append(toolbarIconDOM);
        toolbarIconLineWrapperDOM.append(toolbarIconLineOptionsDOM);

        let toolbarIconPaletteDOM = document.createElement("div");
        toolbarIconPaletteDOM.className = "side-icon-palette";

        for (let index2 = 0; index2 < colorsInPalette; index2++) {
            let toolbarIconColorOptionDOM = document.createElement("label");
            toolbarIconColorOptionDOM.setAttribute("onclick","toolbarEditColor("+index+",'var(--theme-color-" + index2 + ")','var(--theme-color-" + index2 + "-complementary)')");
            let toolbarIconColorOptionInputDOM = document.createElement("input");
            toolbarIconColorOptionInputDOM.type = "radio";
            toolbarIconColorOptionInputDOM.id = "blabla" + index2;
            toolbarIconColorOptionInputDOM.name = "color";
            let toolbarIconColorOptionDivDOM = document.createElement("div");
            toolbarIconColorOptionDivDOM.style = "--circle-color:var(--theme-color-" + index2 + ");";

            toolbarIconColorOptionDOM.append(toolbarIconColorOptionInputDOM);
            toolbarIconColorOptionDOM.append(toolbarIconColorOptionDivDOM);

            toolbarIconPaletteDOM.append(toolbarIconColorOptionDOM);
        }

        let toolbarIconWrapperDOM = document.createElement("div");
        toolbarIconWrapperDOM.className = "side-icon-wrapper";
        toolbarIconWrapperDOM.append(toolbarIconLineWrapperDOM);
        toolbarIconWrapperDOM.append(toolbarIconPaletteDOM);
        target.append(toolbarIconWrapperDOM);
    }
}

function sideInit() {
    document.querySelectorAll(".side-form input").forEach(element => {
        element.addEventListener("input", () => {
            element.closest(".side-form").classList.add("form-changed");
        });
    });
    drawToolbarEditMode(document.getElementById("toolbar-edit-mode-div"));
}

function changePalette(nr) {
    for (let index = 0; index < colorsInPalette; index++) {
        document.documentElement.style.setProperty('--theme-color-' + index, session.style.palettes[nr].colors[index]);
        document.documentElement.style.setProperty('--theme-color-' + index + '-complementary', session.style.palettes[nr].colorComplementary[index]);
    }
}