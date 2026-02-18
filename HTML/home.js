document.addEventListener('DOMContentLoaded', () => {
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

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const icon = sidebarToggle.querySelector('i');
    if (sidebar.classList.contains('open')) {
      icon.classList.remove('fa-arrow-right');
      icon.classList.add('fa-arrow-left');
    } else {
      icon.classList.remove('fa-arrow-left');
      icon.classList.add('fa-arrow-right');
    }
  });
});

function copyCode() {
  const codeToCopy = document.getElementById('exampleCode').innerText;
  navigator.clipboard.writeText(codeToCopy)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch(err => {
      console.error("Could not copy text: ", err);
    });
}