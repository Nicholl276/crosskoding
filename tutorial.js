

// 3. Animasi on-scroll (IntersectionObserver)
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
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
