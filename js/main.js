// Navigation mobile burger
const burger = document.querySelector('.nav-burger');
const mobileNav = document.querySelector('.nav-mobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Fermer le menu mobile au clic extérieur
document.addEventListener('click', (e) => {
  if (mobileNav && !mobileNav.contains(e.target) && !burger.contains(e.target)) {
    mobileNav.classList.remove('open');
  }
});

// Formulaire de réservation — message de confirmation simple
const form = document.querySelector('.rdv-form');
if (form) {
  const submitBtn = form.querySelector('.btn-primary');
  submitBtn.addEventListener('click', () => {
    const prenom = form.querySelector('input[type="text"]').value;
    if (prenom.trim()) {
      submitBtn.textContent = `Merci ${prenom} ! Nous vous confirmons par SMS.`;
      submitBtn.style.background = '#3a6b3a';
      submitBtn.disabled = true;
    } else {
      submitBtn.textContent = 'Veuillez remplir votre prénom';
      setTimeout(() => { submitBtn.textContent = 'Confirmer ma réservation'; }, 2000);
    }
  });
}

// Animation légère des service-cards à l'entrée dans le viewport
const cards = document.querySelectorAll('.service-card, .testi-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}
