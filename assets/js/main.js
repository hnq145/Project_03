document.addEventListener("DOMContentLoaded", function () {
  // ==================== Mobile Menu Logic ====================
  const navPC = document.querySelector("#navbar__list--pc");
  const navMobile = document.querySelector("#navbar__list--mobile");
  if (navPC && navMobile) {
    navMobile.innerHTML = navPC.innerHTML;
  }

  // ==================== Sticky Header ====================
  const headerTop = document.querySelector(".header-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      headerTop.classList.add("sticky");
    } else {
      headerTop.classList.remove("sticky");
    }
  });

  // ==================== Smooth Scroll & Active Link ====================
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar__link");

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#!") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const menuCheckbox = document.getElementById("menu-checkbox");
        if (menuCheckbox) menuCheckbox.checked = false;

        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighter
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("navbar__link--active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("navbar__link--active");
      }
    });
  });

  // ==================== Team Carousel ====================
  const teamList = document.querySelector(".team__list");
  const prevBtn = document.querySelector(
    ".control__btn:not(.control-icon--next)"
  ); // Assuming first button is prev
  const nextBtn = document.querySelector(".control__btn:last-child"); // Assuming last button is next

  // Find the buttons specifically within team section to avoid conflict
  const teamSection = document.querySelector(".team");
  if (teamSection) {
    const teamPrevBtn = teamSection.querySelector(
      ".control__btn:first-of-type"
    );
    const teamNextBtn = teamSection.querySelector(".control__btn:last-of-type");

    if (teamList && teamPrevBtn && teamNextBtn) {
      let scrollAmount = 0;
      const scrollStep = 300; // Adjust based on card width + gap

      teamNextBtn.addEventListener("click", () => {
        teamList.scrollBy({ left: scrollStep, behavior: "smooth" });
      });

      teamPrevBtn.addEventListener("click", () => {
        teamList.scrollBy({ left: -scrollStep, behavior: "smooth" });
      });
    }
  }
});
