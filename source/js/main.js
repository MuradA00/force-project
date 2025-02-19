import Swiper from 'swiper';
import './_vendor';
// import './_functions';
// import './_components';


const bonusesHiddenContent = document.querySelector(".bonuses-hidden");
const bonusesHoverButton = document.querySelector(".bonuses-cta");
const menuButton = document.querySelector('.header-menu');
const menu = document.querySelector('.nav');
const closeMenuButton = document.querySelector('.nav-close');
const timerInterval = setInterval(updateTimer, 1000);
const projectsTabContainer = document.querySelector(".projects-tabs");
const projectsDisplayContainer = document.querySelector(".projects-displays");
const ratesTabContainer = document.querySelector(".rates-tabs");
const ratesDisplayContainer = document.querySelector(".rates-displays")
const eventsTabContainer = document.querySelector(".events-tabs");
const eventsDisplayContainer = document.querySelector(".events-displays");
const availableProjectsVideos =  document.querySelectorAll(".projects-item");
const infoTabContainer = document.querySelector(".info-nav__list");
const infoTabContentContainer = document.querySelector(".info-contents");
const ratesButtons = document.querySelectorAll(".rates-flex__button");
const singlePageDropdowns = document.querySelectorAll(".text-dropdowns__item");
const infoSidebarCollapseButton = document.querySelector(".info-collapse");
const infoSidebar = document.querySelector(".info-nav");
const infoControlsButtons = document.querySelectorAll(".info-buttons button");

if (infoControlsButtons.length) {
  infoControlsButtons.forEach(button => {
    button.addEventListener("click", () => {
      infoControlsButtons.forEach(btn => btn.classList.remove("button--hl"))
      button.classList.add("button--hl")
    })
  })
}

if (infoSidebarCollapseButton) {
  infoSidebarCollapseButton.addEventListener("click", () => {
    infoSidebar.classList.toggle("info-nav--collapsed");
    infoSidebarCollapseButton.classList.toggle("info-collapse--active");
  })
}

if (singlePageDropdowns.length) {
  singlePageDropdowns.forEach((dropdown) => {
    const hiddenContent = dropdown.querySelector(".text-dropdowns__hidden");

    dropdown.addEventListener("click", () => {
      const isExpanded = dropdown.classList.contains(
        "text-dropdowns__item--expanded"
      );

      singlePageDropdowns.forEach((otherDropdown) => {
        const otherHiddenContent = otherDropdown.querySelector(
          ".text-dropdowns__hidden"
        );
        otherDropdown.classList.remove("text-dropdowns__item--expanded");
        otherHiddenContent.style.maxHeight = null;
      });

      if (!isExpanded) {
        dropdown.classList.add("text-dropdowns__item--expanded");
        hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
      }
    });
  });
}

if (ratesButtons.length) {
  ratesButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      ratesButtons.forEach(btn => btn.classList.remove("rates-flex__button--selected"));

      btn.classList.add("rates-flex__button--selected");
    })
  })
}

if (availableProjectsVideos.length) {
  availableProjectsVideos.forEach(video => {
    const playButton = video.querySelector(".projects-controller");
    playButton.addEventListener("click", () => {
      const videoPlayer = video.querySelector(".projects-video");
      video.classList.add("projects-item--active")
      playButton.style.opacity = 0;
      playButton.style.pointerEvents = "none";
      videoPlayer.classList.add("projects-video--revealed");
    })
  })
}

const handleTabs = (
  controllerContainer,
  displayContainer,
  tabButtonClassList = ".tabs-button",
  tabDisplayClassList = ".tabs-display",
  buttonActiveClassList = "tabs-button--selected",
  displayActiveClassList = "tabs-display--selected"
) => {
  const controllers = controllerContainer.querySelectorAll(tabButtonClassList);
  const displays = displayContainer.querySelectorAll(tabDisplayClassList);

  controllers.forEach((button, i) => {
    button.addEventListener("click", () => {
      controllers.forEach(button => button.classList.remove(buttonActiveClassList));
      button.classList.add(buttonActiveClassList);

      displays.forEach(display => display.classList.remove(displayActiveClassList));
      displays[i].classList.add(displayActiveClassList);
    })
  })
}

window.addEventListener("load", () => {
  projectsTabContainer && handleTabs(projectsTabContainer, projectsDisplayContainer);
  ratesDisplayContainer && handleTabs(ratesTabContainer, ratesDisplayContainer);
  eventsTabContainer && handleTabs(eventsTabContainer, eventsDisplayContainer);
  infoTabContentContainer && handleTabs(
    infoTabContainer,
    infoTabContentContainer,
    ".info-nav__item",
    ".text",
    "info-nav__item--selected",
    "fade-in"
  );
})

if (bonusesHoverButton) {
  bonusesHoverButton.addEventListener("mouseover", () => {
    bonusesHiddenContent.classList.add("bonuses-hidden--revealed");
  });

  bonusesHoverButton.addEventListener("mouseleave", () => {
    bonusesHiddenContent.classList.remove("bonuses-hidden--revealed");
  })
}

const o = document.querySelector(".bonuses-counter__item:nth-child(1) .bonuses-counter__value"),
    l = document.querySelector(".bonuses-counter__item:nth-child(2) .bonuses-counter__value"),
    c = document.querySelector(".bonuses-counter__item:nth-child(3) .bonuses-counter__value"),
    h = document.querySelector(".bonuses-counter__item:nth-child(4) .bonuses-counter__value");

const startDateUTC = new Date("2025-02-21T00:00:00Z");

function updateTimer() {
    if (!o) return;

    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - localOffset);
    const remaining = startDateUTC.getTime() - localTime.getTime();

    if (remaining > 0) {
        const totalSeconds = Math.floor(remaining / 1000);
        const d = Math.floor(totalSeconds / 86400);
        const hVal = Math.floor((totalSeconds % 86400) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        o.textContent = String(d).padStart(2, "0");
        l.textContent = String(hVal).padStart(2, "0");
        c.textContent = String(m).padStart(2, "0");
        h.textContent = String(s).padStart(2, "0");
    } else {
        clearInterval(timerInterval);
        o.textContent = "00";
        l.textContent = "00";
        c.textContent = "00";
        h.textContent = "00";
    }
}

updateTimer();

const menuHandler = () => {
  menuButton.classList.toggle('header-menu--active');
  if (menuButton.classList.contains('header-menu--active')) {
    menu.classList.add('nav--active')
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden'
  } else {
    menu.classList.remove('nav--active')
    document.documentElement.style.overflow = '';
    document.body.style.overflow = ''
  }
}

if (menuButton) {
  menuButton.addEventListener('click', menuHandler);

  closeMenuButton.addEventListener('click', () => {
    menuButton.classList.remove('header-menu--active');
    menu.classList.remove('nav--active')
    document.documentElement.style.overflow = '';
    document.body.style.overflow = ''
  })
}


if (Swiper) {
  new Swiper(".projects-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      1200: {
        spaceBetween: 32,
        slidesPerView: 4,
      }
    }
  })
}

