document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("load", resizeEvents);
window.addEventListener("resize", resizeEvents);
document.querySelector(".social-card").addEventListener("mouseleave", socialCardHover);
document.querySelector(".social-card").addEventListener("blur", socialCardHover);

function handleMouseMove(event) {
  // Get the mouse position relative to the screen center
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = event.clientX - centerX;
  const offsetY = event.clientY - centerY;

  // Normalize the values to the range [-1, 1]
  const normalizedX = offsetX / centerX;
  const normalizedY = offsetY / centerY;

  document.body.style.setProperty('--mouse-position-x', `${normalizedX}rem`);
  document.body.style.setProperty('--mouse-position-y', `${normalizedY}rem`);
//   document.querySelectorAll('.background').forEach((e) => {
//     e.style.transform = `translate(calc(-50% + ${normalizedX}rem), calc(-50% + ${normalizedY}rem))`;
//   });
}

function setFooter(event) {
  const footer = document.querySelector(".footer");
  const mainGrid = document.querySelector(".box-wrapper");
  const areaLeftBottom = distanceFromBottom(mainGrid);
  document.body.style.setProperty('--footer-size', `${areaLeftBottom}px`);
  if (areaLeftBottom > parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size')) * 3) {
    footer.classList.add("absolute-footer");
    footer.classList.remove("normal-footer");
  } else {
    footer.classList.remove("absolute-footer");
    footer.classList.add("normal-footer");
  }
  // console.log(areaLeftBottom, parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size')) * 2.5);
}

function distanceFromBottom(element) {
  const rect = element.getBoundingClientRect();
  const elementLowestPoint = rect.top + rect.height;
  const viewportHeight = window.innerHeight;
  const distanceFromBottom = viewportHeight - elementLowestPoint;
  return distanceFromBottom;
}

function socialCardHover(event) {
  const socialCard = document.querySelector(".social-card");
  if (event.type == "mouseleave" || event.type == "mouseout") {
    socialCard.classList.add("less");
    setTimeout(() => {
      socialCard.classList.remove("less");
    }, 1000);
  }
}

function setResponsive() {
  const socialCards = document.querySelector(".box-wrapper");
  const screenWidth = window.innerWidth;
  if (screenWidth - socialCards.getBoundingClientRect().width < 5 * 16 * 1.5) {
    const footer = document.querySelector(".footer");
    document.body.classList.add("small-screen");
    footer.classList.remove("absolute-footer");
    footer.classList.add("normal-footer");
  } else {
    document.body.classList.remove("small-screen");
  }
  console.log(screenWidth - socialCards.getBoundingClientRect().width);
  console.log(screenWidth, socialCards.offsetWidth);
}

function resizeEvents() {
  setFooter();
  setResponsive();
}

resizeEvents();