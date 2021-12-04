/*

************************************
gallery.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Generating and using gallery for image previews.
*/

galleryTarget=""

function openGallery(target) {
    galleryTarget=target;

    let galleryBg = document.createElement("div");
    galleryBg.className = "gallery-bg";
    let galleryImg=document.createElement("img");
    galleryImg.src=target.getAttribute("data-image");
    let galleryCloseWrapper = document.createElement("div");
    galleryCloseWrapper.className = "gallery-close-wrapper";
    galleryCloseWrapper.setAttribute("onclick","closeGallery()");
  
    let galleryToolbar = document.createElement("div");
    galleryToolbar.className = "gallery-toolar-wrapper fluent-bg";
    let galleryToolbarTitle = document.createElement("div");
    galleryToolbarTitle.className = "gallery-title";
    galleryToolbarTitle.innerHTML = target.getAttribute("data-name");
    let galleryToolbarArrowRight = document.createElement("div");
    galleryToolbarArrowRight.className = "arrow-icon-generate gallery-arrow-right gallery-arrow";
    galleryToolbarArrowRight.addEventListener("click",()=>{nextGallery(galleryTarget,true)});
    let galleryToolbarArrowLeft = document.createElement("div");
    galleryToolbarArrowLeft.className = "arrow-icon-generate gallery-arrow-left gallery-arrow";
    galleryToolbarArrowLeft.addEventListener("click",()=>{nextGallery(galleryTarget,false)});
    galleryToolbar.append(galleryToolbarArrowLeft);
    galleryToolbar.append(galleryToolbarTitle);
    galleryToolbar.append(galleryToolbarArrowRight);
  
    let galleryWrapper=document.createElement("div");
    galleryWrapper.className="gallery-wrapper gallery-wrapper-packed";
    galleryWrapper.append(galleryBg);
    galleryWrapper.append(galleryImg);
    galleryWrapper.append(galleryToolbar);
    galleryWrapper.append(galleryCloseWrapper);
    //document.getElementById("blank-canvas").append(galleryWrapper);
    document.querySelector("body").append(galleryWrapper);
    drawSVGAll();
  
    setTimeout(()=>{
      galleryWrapper.classList.remove("gallery-wrapper-packed");
    },0);
  }
  
  function closeGallery() {
    document.querySelectorAll(".gallery-wrapper").forEach(element => {
      element.classList.add("gallery-wrapper-packed");
      setTimeout(()=>{
        try {
        element.remove();
        }
        catch {
          errorHandler(2,false);
        }
      },400);
    });
  }
  
  function nextGallery(target,direction) {
    let targetNext = target.closest(".file-box-flex").querySelector(".file-box");
    if(direction) {
      targetNext = target.closest(".file-box-flex").nextElementSibling.querySelector(".file-box");
    }
    else {
      targetNext = target.closest(".file-box-flex").previousElementSibling.querySelector(".file-box");
    }
    if(document.querySelector(".gallery-wrapper")) {
      document.querySelector(".gallery-wrapper img").src=targetNext.getAttribute("data-image");
      galleryTarget=targetNext;
  } else {
      openGallery(targetNext);
  }
  }

console.log("✅ gallery.js successfully loaded!");