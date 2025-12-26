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
  // ==================== Dark Mode Logic ====================
  const themeToggle = document.querySelector(".theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const currentTheme = savedTheme || systemTheme;

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        showToast("Switched to Dark Mode 🌙");
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        showToast("Switched to Light Mode ☀️");
      }
    });
  }

  // ==================== Back to Top ====================
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==================== Promo Bar & Layout Adjustment ====================
  const promoBar = document.querySelector(".promo-bar");
  const promoClose = document.querySelector(".promo-bar__close");

  function adjustLayout() {
    if (promoBar && !promoBar.classList.contains("hidden")) {
      // Force layout recalculation if needed or just get height
      const promoHeight = promoBar.offsetHeight || 0;

      // Set CSS Variable
      document.documentElement.style.setProperty(
        "--promo-height",
        `${promoHeight}px`
      );

      // Adjust body padding offset (Header Height ~60px + Promo)
      // Since header is fixed and pushed down by promoHeight,
      // content needs to be pushed down by Header Height + promoHeight.
      // Original padding was handled by header being fixed? No, Hero had padding.
      // Header 60px. Hero padding 76px.
      // If Header moves down, Hero padding needs to increase by promoHeight.
      // Let's add promoHeight to body padding?
      document.body.style.paddingTop = `${promoHeight}px`;
    } else {
      document.documentElement.style.setProperty("--promo-height", "0px");
      document.body.style.paddingTop = "0px";
    }
  }

  // Run on load, resize, and DOMReady
  window.addEventListener("load", adjustLayout);
  window.addEventListener("resize", adjustLayout);
  adjustLayout(); // Run immediately

  if (promoClose && promoBar) {
    promoClose.addEventListener("click", () => {
      promoBar.classList.add("hidden");
      // Update variables after transition or immediately?
      // Be responsive.
      document.documentElement.style.setProperty("--promo-height", "0px");
      document.body.style.paddingTop = "0px";
    });
  }

  // ==================== Cookie Consent ====================
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookie = document.querySelector(".cookie-banner__btn--accept");
  const declineCookie = document.querySelector(".cookie-banner__btn--decline");

  if (!localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 2000);
  }

  if (acceptCookie) {
    acceptCookie.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      cookieBanner.classList.remove("show");
      showToast("Cookies Accepted 🍪");
    });
  }

  if (declineCookie) {
    declineCookie.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      cookieBanner.classList.remove("show");
    });
  }

  // ==================== Toast Notification Helper ====================
  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease-in forwards";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
  // ==================== Pricing Toggle ====================
  const billingToggle = document.getElementById("billing-toggle");
  const amounts = document.querySelectorAll(".amount");
  const periods = document.querySelectorAll(".period");

  if (billingToggle) {
    billingToggle.addEventListener("change", () => {
      const isAnnual = billingToggle.checked;

      amounts.forEach((amount) => {
        if (isAnnual) {
          amount.textContent = amount.getAttribute("data-annual");
        } else {
          amount.textContent = amount.getAttribute("data-monthly");
        }
      });

      periods.forEach((period) => {
        period.textContent = isAnnual ? "/yr" : "/mo";
      });
    });
  }

  // ==================== FAQ Accordion ====================
  const faqQuestions = document.querySelectorAll(".faq-item__question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");

      // Close all others
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");
      });

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // ==================== Countdown Timer ====================
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) {
    // Set deadline to 2 days from now
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 2);

    function updateCountdown() {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        return;
      }

      const d = Math.floor(diff / 1000 / 60 / 60 / 24);
      const h = Math.floor(diff / 1000 / 60 / 60) % 24;
      const m = Math.floor(diff / 1000 / 60) % 60;
      const s = Math.floor(diff / 1000) % 60;

      daysEl.textContent = d < 10 ? "0" + d : d;
      hoursEl.textContent = h < 10 ? "0" + h : h;
      minutesEl.textContent = m < 10 ? "0" + m : m;
      secondsEl.textContent = s < 10 ? "0" + s : s;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
  }
  // ==================== Newsletter ====================
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[type='email']");
      if (emailInput.value) {
        showToast("Subscribed successfully! 📧");
        emailInput.value = "";
      } else {
        showToast("Please enter a valid email.", "error");
      }
    });
  }
});
