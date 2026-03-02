// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.style.display === 'block';
    nav.style.display = open ? 'none' : 'block';
    menuToggle.setAttribute('aria-expanded', (!open).toString());
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth < 720 && nav) nav.style.display = 'none';
    }
  });
});

// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form UX (client-side)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    // simple inline validation
    const required = form.querySelectorAll('[required]');
    for (const field of required) {
      if (!field.value.trim()) {
        e.preventDefault();
        statusEl.textContent = 'Please complete required fields.';
        statusEl.style.color = '#fca5a5';
        return;
      }
    }
    statusEl.textContent = 'Sending…';
    statusEl.style.color = '#9ca3af';
  });
}