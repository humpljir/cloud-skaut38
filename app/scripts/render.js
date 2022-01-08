/*

************************************
render.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  File contains all funtions related to rendering content.
*/

function convertFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function generateSubmenu(scope, targettype, element, options) {
  let submenu = document.createElement("div");
  submenu.className = "submenu-wrapper";

  let submenuInfoBox = document.createElement("div");
  submenuInfoBox.className = "submenu-infobox fluent-bg";
  if (targettype == "file") {
    let submenuInfoBoxExtension = document.createElement("div");
    submenuInfoBoxExtension.className = "infobox-extension";
    submenuInfoBoxExtension.innerHTML = element.extension;
    let submenuInfoBoxTitle = document.createElement("div");
    submenuInfoBoxTitle.className = "infobox-title";
    submenuInfoBoxTitle.innerHTML = element.name;
    let submenuInfoBoxFilename = document.createElement("div");
    submenuInfoBoxFilename.className = "infobox-filename";
    submenuInfoBoxFilename.innerHTML = element.legacyLink;
    let submenuInfoBoxText = document.createElement("div");
    submenuInfoBoxText.className = "infobox-text";
    submenuInfoBoxText.innerHTML =
      '<div class="infobox-line"><div class="infobox-parameter">Size</div><div class="infobox-value">' +
      convertFileSizeString(element.size) +
      '</div></div><div class="infobox-line"><div class="infobox-parameter">Uploaded</div><div class="infobox-value">' +
      new Date(element.date * 1000).toLocaleDateString("cs-CZ") +
      '</div></div><div class="infobox-line"><div class="infobox-parameter">Author</div><div class="infobox-value"><div class="infobox-author-icon" style="background-image:url(' +
      linkToProfilePic +
      element.authorImg +
      ')"></div>' +
      element.author +
      "</div></div></div>";
    let submenuInfoBoxIcon = document.createElement("div");
    if (element.type == "image") {
      submenuInfoBoxIcon.className = "infobox-icon infobox-img";
      submenuInfoBoxIcon.style.backgroundImage =
        "url(" + linkToStorageThumbnails + element.link + ")";
    } else {
      submenuInfoBoxIcon.className = "infobox-icon infobox-fileicon";
    }
    submenuInfoBox.append(submenuInfoBoxExtension);
    submenuInfoBox.append(submenuInfoBoxTitle);
    submenuInfoBox.append(submenuInfoBoxFilename);
    submenuInfoBox.append(submenuInfoBoxText);
    submenuInfoBox.append(submenuInfoBoxIcon);
    submenu.append(submenuInfoBox);

  } else if (targettype == "dir") {
    let submenuInfoBox = document.createElement("div");
    submenuInfoBox.className = "submenu-infobox fluent-bg";
    let submenuInfoBoxTitle = document.createElement("div");
    submenuInfoBoxTitle.className = "infobox-title";
    submenuInfoBoxTitle.innerHTML = element.name;
    let submenuInfoBoxText = document.createElement("div");
    submenuInfoBoxText.className = "infobox-text";
    submenuInfoBoxText.innerHTML =
      '<div class="infobox-line"><div class="infobox-parameter">Size</div><div class="infobox-value">' +
      convertFileSizeString(element.size) +
      '</div></div><div class="infobox-line"><div class="infobox-parameter">Uploaded</div><div class="infobox-value">' +
      new Date(element.date * 1000).toLocaleDateString("cs-CZ") +
      '</div></div><div class="infobox-line"><div class="infobox-parameter">Author</div><div class="infobox-value"><div class="infobox-author-icon" style="background-image:url(' +
      linkToProfilePic +
      element.authorImg +
      ')"></div>' +
      element.author +
      "</div></div></div>";
    let submenuInfoBoxIcon = document.createElement("div");
    submenuInfoBoxIcon.className = "infobox-diricon";
    submenuInfoBoxIcon.innerHTML = element.name;
    submenuInfoBoxIcon.style.backgroundColor = element.color;
    submenuInfoBoxIcon.style.color = element.colorComplementary;

    submenuInfoBox.append(submenuInfoBoxTitle);
    submenuInfoBox.append(submenuInfoBoxText);
    submenuInfoBox.append(submenuInfoBoxIcon);
    submenu.append(submenuInfoBox);
  }

  let submenuBox = document.createElement("div");
  submenuBox.className = "submenu-box fluent-bg";
  options.forEach((option) => {
    let line = document.createElement("a");
    if (option.function == "default") {
      line.href =
        "?fileaction=" +
        option.label +
        "&typy=" +
        targettype +
        "&fileid=" +
        element.id;
    } else if (option.function == "download") {
      line.href = linkToStorage+element.link;
      line.setAttribute("download", element.legacyLink);
    } else {
      /*      line.setAttribute("onclick", "(event)=>{event.stopPropagation();"+option.function+";}");*/
      line.setAttribute("onclick", option.function);
      // line.addEventListener("click", option.function);
    }
    line.innerHTML = option.label;
    line.addEventListener("click", (event) => {
      event.stopPropagation();
      closeAllSubmenus();
    });
    submenuBox.append(line);
  });

  submenu.append(submenuBox);

  scope.addEventListener("contextmenu", (event) => {
    closeAllSubmenus();

    let rect = event.target.getBoundingClientRect();
    let x =
      normalizeValue(
        event.clientX,
        document.body.offsetWidth,
        submenu.offsetWidth
      ) - rect.left;
    let y =
      normalizeValue(
        event.clientY,
        document.body.offsetHeight,
        submenu.offsetHeight
      ) - rect.top;

    openSubmenu(x, y, submenu);
  });

  let submenuDots = document.createElement("div");
  submenuDots.className = "three-dots-icon-generate submenu-dots";
  submenuDots.addEventListener("click", (event) => {
    event.stopPropagation();
    closeAllSubmenus();
    let rect = event.target.parentNode.parentNode.getBoundingClientRect();
    let x =
      normalizeValue(
        event.clientX,
        document.body.offsetWidth,
        submenu.offsetWidth
      ) - rect.left;
    let y =
      normalizeValue(
        event.clientY,
        document.body.offsetHeight,
        submenu.offsetHeight
      ) - rect.top;
    openSubmenu(x, y, submenu);
  });
  scope.append(submenuDots);
  return submenu;
}

function drawDirectories() {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";
  storage.forEach((element) => {
    let dir = document.createElement("button");
    dir.id = "dir-box-" + element.id;
    dir.className = "dir-box resize-hover searchable";
    dir.setAttribute("data-name", element.name);
    dir.setAttribute("data-date", element.date);
    dir.setAttribute("data-size", element.size);
    dir.setAttribute("data-keyword", "");
    dir.style =
      "--dir-bg-color:" +
      element.color +
      "; --dir-color:" +
      element.colorComplementary +
      ";";
    dir.setAttribute("data-dir-id", element.id);
    // dir.setAttribute("onclick", "openDir(this)");
    dir.addEventListener("click", () => {
      openDir(dir);
    });
    dir.innerHTML = element.name;
    let submenu = generateSubmenu(dir, "dir", element, [
      { label: "Share", function: "generateLink('dir=" + element.id + "')" },
      {
        label: "Edit",
        function:
          "editDir('" +
          element.id +
          "','" +
          element.name +
          "','" +
          element.color +
          "',event)",
      },
      { label: "Delete", function: "default" },
    ]);

    dir.append(submenu);
    canvas.append(dir);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
  drawSVGAll();
}

function drawFiles(dirID) {
  const canvas = document.getElementById("blank-canvas");
  canvas.innerHTML = "";

  let filesList = storage.find(function (post, index) {
    if (post.id == dirID) return true;
  });

  filesList.content.forEach((element) => {
    let fileboxflex = document.createElement("div");

    let filelabel = document.createElement("div");
    filelabel.className = "file-label";
    filelabel.innerHTML = element.name;

    let fileiconextension = document.createElement("div");
    fileiconextension.innerHTML = "." + element.extension;
    fileiconextension.className = "file-icon-extension";

    let fileicon = document.createElement("div");
    fileicon.className = "file-icon";
    fileicon.append(fileiconextension);

    let filebox = document.createElement("a");
    filebox.id = "filehref"+element.id;
    filebox.href = linkToStorage + element.link;
    filebox.setAttribute("download", element.legacyLink);
    fileboxflex.className = "file-box-flex resize-hover searchable";
    fileboxflex.setAttribute("data-name", element.name);
    fileboxflex.setAttribute("data-date", element.date);
    fileboxflex.setAttribute("data-size", element.size);
    fileboxflex.setAttribute("data-keyword", element.link);
    fileboxflex.append(filebox);
    // filebox.setAttribute("onclick","window.location.href='"+linkToStorage+element.link+"'");

    if (element.type == "image") {
      fileicon.style.background =
        "url(" + linkToStorageThumbnails + element.link + ")";
      fileicon.classList.add("icon-thumbnail");
      filebox.setAttribute("data-image", linkToStorage + element.link);
      filebox.setAttribute("data-name", element.name);
      // filebox.setAttribute("onclick","openGallery(this)");
      filebox.addEventListener("click", (e) => {
        e.preventDefault();
        openGallery(filebox);
      });
    }
    filebox.className = "file-box";
    filebox.append(fileicon);
    filebox.append(filelabel);
    fileboxflex.append(
      generateSubmenu(fileboxflex, "file", element, [
        {
          label: "Open",
          function: "openGallery(document.querySelector('#filehref"+element.id+"'));",
        },
        { label: "Download", function: "download" },
        {
          label: "Edit",
          function:
            "editFile('" + element.id + "','" + element.name + "',event)",
        },
        {
          label: "Move",
          function:
            "editFile('" + element.id + "','" + element.name + "',event)",
        },
        { label: "Delete", function: "default" },
      ])
    );

    canvas.append(fileboxflex);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "file-box");
  drawSVGAll();
}

function drawToolbar() {
  target = document.getElementById("toolbar-div");
  target.innerHTML = "";
  // target.setAttribute("onclick", "openToolbar()");
  target.addEventListener("click", openToolbar);
  let toolbarAutohideArrow = document.createElement("div");
  toolbarAutohideArrow.className = "arrow-toolbar-autohide arrow-icon-generate";
  let toolbarAutohideBar = document.createElement("div");
  toolbarAutohideBar.className = "toolbar-autohide-bar";
  toolbarAutohideBar.append(toolbarAutohideArrow);
  target.append(toolbarAutohideBar);

  let toolbarIconWrapper = document.createElement("div");
  toolbarIconWrapper.className = "toolbar-icon-wrapper";
  target.append(toolbarIconWrapper);

  for (let index = 0; index < toolbarIconCount; index++) {
    let indexReorder = session.settings.toolbarReorder[index];
    if (session.settings.toolbarDisplayIcon[indexReorder]) {
      let toolbarIconDOM = document.createElement("button");
      toolbarIconDOM.className = "toolbar-button highlight-hover";
      toolbarIconDOM.setAttribute("type", "button");
      toolbarIconDOM.setAttribute(
        "onclick",
        static.toolbarOnclick[indexReorder]
      );
      toolbarIconDOM.setAttribute(
        "style",
        "background-color: var(--toolbar-color-" + indexReorder + ");"
      );
      toolbarIconDOM.innerHTML = static.svg["button" + indexReorder + "svg"];
      toolbarIconWrapper.append(toolbarIconDOM);
    }
  }
}

function drawSVGAll() {
  static.svg.svgAll.forEach((svg) => {
    document.querySelectorAll("." + svg[0]).forEach((element) => {
      element.innerHTML = svg[1];
      element.classList.remove(svg[0]);
    });
  });
}

console.log("✅ render.js successfully loaded!");
