// === Animasi & Ripple Effect (opsional) ===
document.addEventListener('DOMContentLoaded', () => {
    // IntersectionObserver untuk animasi "scale-in"
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-scale-in');
        }
      });
    }, { threshold: 0.1 });
  
    // Terapkan observer ke kontainer .container atau .z-1
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
      observer.observe(mainContainer);
    }
  
    // Ripple effect pada tombol
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });
  
  /*
  @keyframes ripple {
    0%   { transform: scale(0); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  Tambahkan di forgot.css atau inline style sesuai kebutuhan.
  */
  