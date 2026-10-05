/* =========================================================
   NIKHIL KUMAR — PORTFOLIO JAVASCRIPT
   ========================================================= */

/* ================= MOBILE NAV ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu after clicking a navigation link

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");

      menuToggle.textContent = "☰";
    });
  });
}

/* ================= CURSOR GLOW ================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .flip-card, .skill-card, .interest-card, .contact-flip-card",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorGlow.style.width = "380px";
      cursorGlow.style.height = "380px";
    });

    element.addEventListener("mouseleave", () => {
      cursorGlow.style.width = "280px";
      cursorGlow.style.height = "280px";
    });
  });
}

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ================= MOBILE / TOUCH FLIP CARDS ================= */

/*
   Desktop:
   CSS handles hover.

   Mobile:
   User taps a card.
*/

const flipCards = document.querySelectorAll(
  ".flip-card, .skill-card, .contact-flip-card",
);

flipCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    /*
      Don't interfere with links inside the card.
    */

    if (event.target.closest("a")) {
      return;
    }

    card.classList.toggle("is-flipped");
  });
});

/* ================= PREVENT FLIP WHEN CONTACT LINK IS CLICKED ================= */

document.querySelectorAll(".contact-details a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

/* ================= ACTIVE NAV SECTION ================= */

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-links a");

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navItems.forEach((link) => {
          link.classList.remove("active");

          const href = link.getAttribute("href");

          if (href === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.35,
  },
);

sections.forEach((section) => {
  activeSectionObserver.observe(section);
});

/* ================= NAV ACTIVE STYLE ================= */

const activeStyle = document.createElement("style");

activeStyle.textContent = `

  .nav-links a.active {
    color: var(--green);
  }

  .nav-links a.active::after {
    width: 100%;
  }

`;

document.head.appendChild(activeStyle);

/* ================= RESUME FILE CHECK ================= */

/*
   This checks whether the resume file can be reached.

   If the file is missing, the browser will still show
   the normal link, but a warning appears in console.
*/

window.addEventListener("load", async () => {
  const resumeLinks = document.querySelectorAll(
    'a[href="Nikhil_Kumar_Resume.pdf"]',
  );

  if (!resumeLinks.length) return;

  try {
    const response = await fetch("Nikhil_Kumar_Resume.pdf", {
      method: "HEAD",
    });

    if (!response.ok) {
      console.warn(
        "Resume PDF was not found. Make sure Nikhil_Kumar_Resume.pdf is in the same folder as index.html.",
      );
    }
  } catch (error) {
    console.warn(
      "Could not check the resume file. If the portfolio is opened directly from your computer, this is normal.",
    );
  }
});

/* ================= SMOOTH INTERNAL LINKS ================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ================= YEAR ================= */

const footerYear = document.querySelector(".footer-right");

if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} Nikhil Kumar`;
}
