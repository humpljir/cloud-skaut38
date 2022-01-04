/*

************************************
render.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  File contains all funtions related to rendering content.
*/

function generateSubmenu(scope, targettype, fileid, options) {
    let submenu = document.createElement("div");
    submenu.className = "submenu-wrapper fluent-bg";
    options.forEach((option) => {
      let line = document.createElement("a");
      if (option.function == "default") {
        line.href =
          "?fileaction=" +
          option.label +
          "&typy=" +
          targettype +
          "&fileid=" +
          fileid;
      }
      else if (option.function == "download") {
        line.href = scope.parentNode.href;
        line.setAttribute("download",'');
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
      submenu.append(line);
    });
  
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
      let submenu = generateSubmenu(dir, "dir", element.id, [
        { label: "Share", function: "default" },
        { label: "Edit", function: "editDir("+element.id+",event)" },
        { label: "Duplicate", function: "default" },
        { label: "Convert", function: "default" },
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
      let fileboxflex = document.createElement("a");
  
      let filelabel = document.createElement("div");
      filelabel.className = "file-label";
      filelabel.innerHTML = element.name;
  
      let fileiconextension = document.createElement("div");
      fileiconextension.innerHTML = "." + element.extension;
      fileiconextension.className = "file-icon-extension";
  
      let fileicon = document.createElement("div");
      fileicon.className = "file-icon";
      fileicon.append(fileiconextension);
  
      let filebox = document.createElement("div");
      fileboxflex.href = linkToStorage+element.link;
      fileboxflex.setAttribute("download",'');
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
      filebox.append(
        generateSubmenu(filebox, "file", element.id, [
          {
            label: "Open",
            function:
              "openGallery(this.parentNode.parentNode);",
          },
          { label: "Download", function: "download" },
          { label: "Share", function: "default" },
          { label: "Edit", function: "editFile("+element.id+",event)" },
          { label: "Duplicate", function: "default" },
          { label: "Move", function: "default" },
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
    target.addEventListener("click",openToolbar);
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
        toolbarIconDOM.innerHTML =
          static.svg["button" + indexReorder + "svg"];
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