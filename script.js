const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

const closeMobileNav = () => {
  if (!nav || !menuToggle) return;
  nav.style.display = "none";
  menuToggle.setAttribute("aria-expanded", "false");
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.style.display === "block";
    nav.style.display = isOpen ? "none" : "block";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      nav.style.display = "";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const section = document.querySelector(targetId);
    if (!section) return;

    event.preventDefault();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const y = section.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

    window.scrollTo({ top: y, behavior: "smooth" });
    if (window.innerWidth <= 760) closeMobileNav();
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const pricingCountry = document.getElementById("pricingCountry");
const priceLite = document.getElementById("priceLite");
const priceCore = document.getElementById("priceCore");
const pricePremium = document.getElementById("pricePremium");

const pricingByCountry = {
  oman: {
    lite: "OMR 150",
    core: "OMR 600 – 900",
    premium: "OMR 1,000 – 1,500",
  },
  uae: {
    lite: "AED 300 – 500",
    core: "AED 2,000 – 4,000",
    premium: "AED 4,500 – 7,500",
  },
  ksa: {
    lite: "SAR 300 – 500",
    core: "SAR 2,000 – 5,000",
    premium: "SAR 6,000 – 12,000",
  },
  eu: {
    lite: "EUR 100 – 150",
    core: "EUR 500 – 800",
    premium: "EUR 1,000 – 1,500",
  },
};

const updatePricing = (countryCode) => {
  const normalizedCountryCode = String(countryCode ?? "")
    .trim()
    .toLowerCase();
  const selected = pricingByCountry[normalizedCountryCode];
  if (!selected) return;

  if (priceLite) {
    priceLite.textContent = selected.lite;
  }
  if (priceCore) {
    priceCore.textContent = selected.core;
  }
  if (pricePremium) {
    pricePremium.textContent = selected.premium;
  }
};

if (pricingCountry instanceof HTMLSelectElement) {
  updatePricing(pricingCountry.value);
  ["change", "input"].forEach((eventName) => {
    pricingCountry.addEventListener(eventName, () => {
      updatePricing(pricingCountry.value);
    });
  });
}

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

if (form instanceof HTMLFormElement && statusEl) {
  form.addEventListener("submit", (event) => {
    const requiredFields = form.querySelectorAll("[required]");
    const emailField = form.querySelector('input[name="email"]');
    let hasError = false;

    requiredFields.forEach((field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
      if (!field.value.trim()) {
        hasError = true;
      }
    });

    if (hasError) {
      event.preventDefault();
      statusEl.textContent = "Please fill all required fields.";
      return;
    }

    if (emailField instanceof HTMLInputElement && !emailPattern.test(emailField.value.trim())) {
      event.preventDefault();
      statusEl.textContent = "Please enter a valid work email.";
      alert("Wrong email format. Please enter a valid email address.");
      emailField.focus();
      return;
    }

    statusEl.textContent = "Sending your request...";
  });
}