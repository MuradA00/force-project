// import './_functions';
// import './_components';
import tippy, {followCursor} from 'tippy.js';
import "./_timer";

const bonusesHiddenContent = document.querySelector(".bonuses-hidden--main");
const bonusesHoverButton = document.querySelector(".bonuses-cta");
const menuButton = document.querySelector('.header-menu');
const menu = document.querySelector('.nav');
const closeMenuButton = document.querySelector('.nav-close');
const projectsTabContainer = document.querySelector(".projects-tabs");
const projectsDisplayContainer = document.querySelector(".projects-displays");
const eventsTabContainer = document.querySelector(".events-tabs");
const eventsDisplayContainer = document.querySelector(".events-displays");
const availableProjectsVideos =  document.querySelectorAll(".projects-item");
const infoTabContainer = document.querySelector(".info-nav__list");
const infoTabContentContainer = document.querySelector(".info-contents");
const singlePageDropdowns = document.querySelectorAll(".text-dropdowns__item");
const infoSidebarCollapseButton = document.querySelector(".info-collapse");
const infoSidebar = document.querySelector(".info-nav");
const infoControlsButtons = document.querySelectorAll(".info-buttons button");
const kitDisplayContainer = document.querySelector(".kit-body");
const kitTabContainer = document.querySelector(".kit-tabs");
const projectsSection = document.querySelector(".projects");
// const gallery = document.querySelector(".gallery-top");
const streamSlider = document.querySelector(".projects-slider:nth-child(1)");
const serverItems = document.querySelectorAll(".servers-list__item");
const serverRevealBlocks = document.querySelectorAll(".hidden");
const filesDisplayContainer = document.querySelector(".files-displays");
const filesButtonsContainer = document.querySelector(".files-controllers");
const kitCards = document.querySelectorAll(".kit-cards__item");
const ratesMainDisplays = document.querySelectorAll(".rates-displays__item");
const ratesMainTabControllers = document.querySelectorAll(".rates-tabs__button");
const ratesInnerDisplays = document.querySelectorAll(".rates-table");
const ratesInnerControllers = document.querySelectorAll(".rates-flex__button");

if (ratesMainDisplays.length) {
  ratesMainTabControllers[0].classList.add("tabs-button--selected");
  ratesInnerControllers[0].classList.add("rates-flex__button--selected");
  ratesMainDisplays[0].classList.add("tabs-display--selected");
  ratesInnerDisplays[0].classList.add("tabs-display--selected");

  ratesMainTabControllers.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      ratesMainTabControllers.forEach(btn => btn.classList.remove("tabs-button--selected"));
      ratesMainDisplays.forEach(display => display.classList.remove("tabs-display--selected"));

      btn.classList.add("tabs-button--selected");
      ratesMainDisplays[i].classList.add("tabs-display--selected");

      const activeMainDisplay = ratesMainDisplays[i];
      const firstInnerTable = activeMainDisplay.querySelector(".rates-table");
      const firstInnerButton = activeMainDisplay.querySelector(".rates-flex__button");

      if (firstInnerTable) {
        const innerTables = activeMainDisplay.querySelectorAll(".rates-table");
        innerTables.forEach(table => table.classList.remove("tabs-display--selected"));
        firstInnerTable.classList.add("tabs-display--selected");
      }

      if (firstInnerButton) {
        const innerButtons = activeMainDisplay.querySelectorAll(".rates-flex__button");
        innerButtons.forEach(innerButton => innerButton.classList.remove("rates-flex__button--selected"));
        firstInnerButton.classList.add("rates-flex__button--selected");
      }
    });
  });

  ratesInnerControllers.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      ratesInnerControllers.forEach(btn => btn.classList.remove("rates-flex__button--selected"));
      btn.classList.add("rates-flex__button--selected");
      ratesInnerDisplays
        .forEach(
          display => display.classList.remove("tabs-display--selected"
        ));
        ratesInnerDisplays[i].classList.add("tabs-display--selected");
    })
  })
}

if (kitCards.length && tippy) {
  console.log(cardContents.length)
  kitCards.forEach((card, i) => {
    tippy(card, {
      theme: "custom",
      content: cardContents[i],
      followCursor: true,
      placement: "right",
      plugins: [followCursor],
      allowHTML: true,
    })
  })
}

if (serverItems.length) {
  serverItems.forEach((server, i) => {
    server.addEventListener("mouseover", () => {
      serverRevealBlocks.forEach(block => block.classList.toggle("hidden--visible", false));
      serverRevealBlocks[i]?.classList.add("hidden--visible");
    });

    server.addEventListener("mouseleave", () => {
      serverRevealBlocks.forEach(block => block.classList.toggle("hidden--visible", false));
    });
  });
}

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

filesDisplayContainer && handleTabs(filesButtonsContainer, filesDisplayContainer);

window.addEventListener("DOMContentLoaded", () => {
  kitDisplayContainer && handleTabs(kitTabContainer, kitDisplayContainer);
  projectsTabContainer && handleTabs(projectsTabContainer, projectsDisplayContainer);
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
  if (projectsSection) {
    const initializeGallerySlider = (sliderSelector, thumbsSelector) => {
      const thumbs = new Swiper(thumbsSelector, {
        spaceBetween: 5,
        slidesPerView: 2,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }
      });
      new Swiper(sliderSelector, {
        spaceBetween: 10,
        slidesPerView: 1,
        thumbs: {
          swiper: thumbs
        },
      });
    };

    initializeGallerySlider(
      '.projects-slider:nth-child(2) .gallery-top',
      '.projects-slider:nth-child(2) .gallery-thumbs',
    );
    initializeGallerySlider(
      '.projects-slider:nth-child(3) .gallery-top',
      '.projects-slider:nth-child(3) .gallery-thumbs',
    );

    new Swiper(streamSlider, {
      slidesPerView: "auto",
      spaceBetween: 20,
      observeParents: true,
      observer: true,
      scrollbar: {
        el: '.projects-slider:nth-child(1) .swiper-scrollbar',
        draggable: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        1200: {
          spaceBetween: 32,
          slidesPerView: 4,
        }
      }
    });
  }
}
