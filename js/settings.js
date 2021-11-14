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

        let toolbarIconOptionsDeleteDOM = document.createElement("img");
        toolbarIconOptionsDeleteDOM.src = "img/delete-icon.svg";

        let toolbarIconOptionsReorderDOM = document.createElement("img");
        toolbarIconOptionsReorderDOM.src = "img/reorder-icon.svg";

        let toolbarIconLineOptionsDOM = document.createElement("div");
        toolbarIconLineOptionsDOM.className = "side-icon-options";
        toolbarIconLineOptionsDOM.append(toolbarIconOptionsDeleteDOM);
        toolbarIconLineOptionsDOM.append(toolbarIconOptionsReorderDOM);

        let toolbarIconLineWrapperDOM = document.createElement("div");
        toolbarIconLineWrapperDOM.className = "side-icon-line-wrapper";
        toolbarIconLineWrapperDOM.append(toolbarIconDOM);
        toolbarIconLineWrapperDOM.append(toolbarIconLineOptionsDOM);

        let toolbarIconPaletteDOM = document.createElement("div");
        toolbarIconPaletteDOM.className = "side-icon-palette";

        for (let index2 = 0; index2 < colorsInPalette; index2++) {
            let toolbarIconColorBoxDOM = document.createElement("div");
            toolbarIconColorBoxDOM.className = "side-icon-palette-box";

            let toolbarIconColorOptionDOM = document.createElement("label");
            let toolbarIconColorOptionInputDOM = document.createElement("input");
            toolbarIconColorOptionInputDOM.type = "radio";
            toolbarIconColorOptionInputDOM.id = "blabla" + index2;
            toolbarIconColorOptionInputDOM.name = "color";
            let toolbarIconColorOptionDivDOM = document.createElement("div");
            toolbarIconColorOptionDivDOM.style = "--circle-color:var(--theme-color-" + index2 + ");";

            toolbarIconColorOptionDOM.append(toolbarIconColorOptionInputDOM);
            toolbarIconColorOptionDOM.append(toolbarIconColorOptionDivDOM);

            let toolbarIconColorOptionComplementaryDOM = document.createElement("label");
            let toolbarIconColorOptionInputComplementaryDOM = document.createElement("input");
            toolbarIconColorOptionInputComplementaryDOM.type = "radio";
            toolbarIconColorOptionInputComplementaryDOM.id = "blabla" + index2;
            toolbarIconColorOptionInputComplementaryDOM.name = "color";
            let toolbarIconColorOptionDivComplementaryDOM = document.createElement("div");
            toolbarIconColorOptionDivComplementaryDOM.style = "--circle-color:var(--theme-color-" + index2 + "-complementary);";

            toolbarIconColorOptionComplementaryDOM.append(toolbarIconColorOptionInputComplementaryDOM);
            toolbarIconColorOptionComplementaryDOM.append(toolbarIconColorOptionDivComplementaryDOM);

            toolbarIconColorBoxDOM.append(toolbarIconColorOptionDOM);
            toolbarIconColorBoxDOM.append(toolbarIconColorOptionComplementaryDOM);
            toolbarIconPaletteDOM.append(toolbarIconColorBoxDOM);
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