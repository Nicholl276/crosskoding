// 1. Butterfly Smooth Animation
const butterfly = document.getElementById('butterfly');
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
const smoothingFactor = 0.1;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateButterfly() {
  currentX += (targetX - currentX) * smoothingFactor;
  currentY += (targetY - currentY) * smoothingFactor;
  butterfly.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateButterfly);
}
animateButterfly();

// 2. Animasi on-scroll (IntersectionObserver)
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(element => observer.observe(element));

    const navbar = document.getElementById('navbar');
  setTimeout(() => {
    navbar.style.opacity = '1';
    navbar.style.transform = 'translateY(0)';
  }, 200);

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;
  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open');
    } else {
      mobileMenu.classList.remove('open');
    }
    const topLine = menuBtn.children[0];
    const middleLine = menuBtn.children[1];
    const bottomLine = menuBtn.children[2];
    if (menuOpen) {
      topLine.style.transform = 'translateY(0.500rem) rotate(45deg)';
      middleLine.style.opacity = '0';
      bottomLine.style.transform = 'translateY(-0.500rem) rotate(-45deg)';
    } else {
      topLine.style.transform = 'none';
      middleLine.style.opacity = '1';
      bottomLine.style.transform = 'none';
    }
  });
});

// 3. Toggle Hamburger Menu (Mobile)
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  if (mobileMenu.style.display === 'block') {
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'block';
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.add('open');
    } else {
      mobileMenu.classList.remove('open');
    }

    const topLine = menuBtn.children[0];
    const middleLine = menuBtn.children[1];
    const bottomLine = menuBtn.children[2];

    if (menuOpen) {
      topLine.style.transform = 'translateY(0.375rem) rotate(45deg)';
      middleLine.style.opacity = '0';
      bottomLine.style.transform = 'translateY(-0.375rem) rotate(-45deg)';
    } else {
      topLine.style.transform = 'none';
      middleLine.style.opacity = '1';
      bottomLine.style.transform = 'none';
    }
  });
});