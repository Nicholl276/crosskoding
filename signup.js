// === Toggle Password Visibility ===
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const eyeSlashIcon = document.getElementById('eyeSlashIcon');

let showPassword = false;

togglePassword.addEventListener('click', () => {
  showPassword = !showPassword;
  if (showPassword) {
    passwordField.type = 'text';
    eyeIcon.classList.add('hidden');
    eyeSlashIcon.classList.remove('hidden');
  } else {
    passwordField.type = 'password';
    eyeIcon.classList.remove('hidden');
    eyeSlashIcon.classList.add('hidden');
  }
});

// === Optional: Ripple Effect on Buttons ===
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Buat elemen ripple
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
Jika Anda ingin animasi on-scroll:
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-scale-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.container').forEach(el => {
    observer.observe(el);
  });
});
*/

/* 
Tambahkan keyframes ripple di CSS, atau inline style:
@keyframes ripple {
  0%   { transform: scale(0); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}
*/
