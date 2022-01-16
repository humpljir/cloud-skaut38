/*

************************************
gallery.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Generating and using gallery for image previews.
*/

let galleryTarget = "";

function openGallery(target) {
  // open gallery for given target div

  galleryTarget = target;

  let galleryBg = document.createElement("div");
  galleryBg.className = "gallery-bg";
  let galleryImg = document.createElement("img");
  galleryImg.id = "gallery-img";
  galleryImg.src = target.getAttribute("data-image");
  let galleryCloseWrapper = document.createElement("div");
  galleryCloseWrapper.className = "bright-hover gallery-close-wrapper";
  //galleryCloseWrapper.setAttribute("onclick", "closeGallery()");
  galleryCloseWrapper.addEventListener("click",closeGallery);

  let galleryToolbar = document.createElement("div");
  galleryToolbar.className = "gallery-toolar-wrapper fluent-bg";
  let galleryToolbarTitle = document.createElement("div");
  galleryToolbarTitle.id = "gallery-title-div";
  galleryToolbarTitle.className = "gallery-title";
  galleryToolbarTitle.innerHTML = target.getAttribute("data-name");
  let galleryToolbarArrowRight = document.createElement("div");
  galleryToolbarArrowRight.className =
    "arrow-icon-generate gallery-arrow-right bright-hover gallery-arrow";
  galleryToolbarArrowRight.addEventListener("click", () => {
    nextGallery(galleryTarget, true);
  });
  let galleryToolbarArrowLeft = document.createElement("div");
  galleryToolbarArrowLeft.className =
    "arrow-icon-generate gallery-arrow-left bright-hover gallery-arrow";
  galleryToolbarArrowLeft.addEventListener("click", () => {
    nextGallery(galleryTarget, false);
  });
  galleryToolbar.append(galleryToolbarArrowLeft);
  galleryToolbar.append(galleryToolbarTitle);
  galleryToolbar.append(galleryToolbarArrowRight);

  let galleryWrapper = document.createElement("div");
  galleryWrapper.className = "gallery-wrapper gallery-wrapper-packed";
  galleryWrapper.append(galleryBg);
  galleryWrapper.append(galleryImg);
  galleryWrapper.append(galleryToolbar);
  galleryWrapper.append(galleryCloseWrapper);
  //document.getElementById("blank-canvas").append(galleryWrapper);
  document.querySelector("body").append(galleryWrapper);
  drawSVGAll();

  setTimeout(() => {
    galleryWrapper.classList.remove("gallery-wrapper-packed");
  }, 0);
}

function closeGallery() {
  // close gallery - delete all gallery divs

  document.querySelectorAll(".gallery-wrapper").forEach((element) => {
    element.classList.add("gallery-wrapper-packed");
    setTimeout(() => {
      try {
        element.remove();
      } catch {
        errorHandler(2, false);
      }
    }, 400);
  });
}

function nextGallery(target, direction) {
  // open next/previous image in gallery view

  let targetNext = target;
  if (direction) {
    targetNext = target
      .closest(".file-box-flex")
      .nextElementSibling.querySelector(".file-box");
  } else {
    targetNext = target
      .closest(".file-box-flex")
      .previousElementSibling.querySelector(".file-box");
  }

  if (!targetNext) {
    closeGallery();
    return;
  }

  if (targetNext.hasAttribute("data-image")) {
        galleryTarget = targetNext;
      let galleryTitle = document.getElementById("gallery-title-div");
      let oldGalleryImg = document.getElementById("gallery-img");
      let newGalleryImg = document.createElement("img");
      oldGalleryImg.id="";
      newGalleryImg.id="gallery-img";

      if (direction) {
        oldGalleryImg.after(newGalleryImg);
        oldGalleryImg.style.animation="galleryBack 0.6s";
        newGalleryImg.style.animation="galleryFront 0.6s";
      } else {
        oldGalleryImg.before(newGalleryImg);
        newGalleryImg.style.animation="galleryBack 0.6s reverse";
        oldGalleryImg.style.animation="galleryFront 0.6s reverse";
      }

      newGalleryImg.src = targetNext.getAttribute("data-image");
      
      setTimeout(() => {
          // chnaging picture label in the middle of transition
        galleryTitle.innerHTML = targetNext.getAttribute("data-name");
        setTimeout(() => {
            oldGalleryImg.remove();
        }, 300);
      }, 300);
  } else {
    nextGallery(targetNext, direction);
  }
}

console.log("✅ gallery.js successfully loaded!");
