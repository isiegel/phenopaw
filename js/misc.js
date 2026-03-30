// footer copyright year
document.getElementById('copyright-year').textContent =
  new Date().getFullYear();

// highlight active nav section
const navLinks = document.querySelectorAll('.nav-link[data-nav]');

// logo scroll shrink
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  // reset nav active state when scrolled to top
  if (window.scrollY === 0) {
    navLinks.forEach((link) => link.classList.remove('active'));
  }
});

const logo = document.getElementById('nav-logo');

// reset nav active state when clicking logo
logo.closest('a').addEventListener('click', () => {
  navLinks.forEach((link) => link.classList.remove('active'));
});
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.nav === entry.target.id);
        });
      }
    });
  },
  {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

// mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// also close mobile menu when logo is clicked
logo.closest('a').addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
});
