(function() {
  "use strict";

  // ----- Mobile Navigation Toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // ----- Active Nav Link on Scroll -----
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ----- Smooth Scroll for Nav Links -----
  navItems.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav
        if (navLinks) {
          navLinks.classList.remove('active');
          const icon = navToggle?.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      }
    });
  });

  // ----- Toast Notification System -----
  function showNotification(message, type = 'info') {
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#ffffff',
      padding: '0.8rem 2rem',
      borderRadius: '60px',
      fontWeight: '500',
      boxShadow: '0 0 60px rgba(255, 255, 255, 0.05), 0 0 120px rgba(255, 255, 255, 0.02)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.95rem',
      zIndex: '9999',
      opacity: '0',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      letterSpacing: '0.3px'
    });
    
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ----- Contact Buttons - Let them navigate naturally! -----
  // REMOVED: The old code that was blocking navigation
  // Now buttons with href will work normally

  // ----- Project Card Click Interaction (for demo) -----
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on tags
      if (e.target.closest('.project-tags')) return;
      const title = this.querySelector('h3')?.textContent || 'Project';
      showNotification(`📂 Opening "${title}" details (demo)`);
    });
  });

  // ----- Research Card Click Interaction -----
  document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h3')?.textContent || 'Research';
      showNotification(`🔬 Exploring "${title}" research area`);
    });
  });

  // ----- Skill Tag Click Interaction -----
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
      const skill = this.textContent.trim();
      showNotification(`💻 ${skill} - Clicked for details (demo)`);
    });
  });

  // ----- Scroll to Top Button -----
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  Object.assign(scrollBtn.style, {
    position: 'fixed',
    bottom: '5rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#888',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.2rem',
    zIndex: '1000',
    opacity: '0',
    transition: 'all 0.3s ease',
    transform: 'scale(0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.transform = 'scale(1)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.transform = 'scale(0.8)';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.background = 'rgba(255, 255, 255, 0.08)';
    scrollBtn.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.05)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.background = 'rgba(255, 255, 255, 0.05)';
    scrollBtn.style.boxShadow = 'none';
  });

  // ----- Console Greeting -----
  console.log('%c🔥 Alif Riasat · Portfolio', 'color: #ffffff; font-size: 24px; font-weight: bold;');
  console.log('%c📚 3rd Year · 2nd Semester · ICE Major', 'color: #888; font-size: 16px;');
  console.log('%c💻 Codeforces: 1100 | ICPC Dhaka 2025', 'color: #888; font-size: 14px;');
  console.log('%c📄 2 Ongoing Research Papers (Green AI & AI in Healthcare)', 'color: #888; font-size: 14px;');
  console.log('%c✨ Built with ❤️ using pure HTML, CSS & JavaScript', 'color: #888; font-size: 14px;');

  // ----- Paper Item Click Interaction -----
  document.querySelectorAll('.paper-item').forEach(item => {
    item.addEventListener('click', function() {
      const title = this.querySelector('p')?.textContent || 'Research paper';
      showNotification(`📄 "${title.trim()}" - Clicked for details (demo)`);
    });
  });

  // ----- Scroll Indicator Click -----
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const nextSection = document.querySelector('#skills');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ----- Dynamic Year in Footer -----
  const footerYear = document.querySelector('.footer-bottom p');
  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2024', year);
  }

  // ----- Academic Item Click -----
  document.querySelectorAll('.academic-item').forEach(item => {
    item.addEventListener('click', function() {
      const title = this.querySelector('h3')?.textContent || 'Academic';
      showNotification(`🎓 Viewing "${title}" details (demo)`);
    });
    item.style.cursor = 'pointer';
  });

  console.log('🚀 Portfolio ready!');
})();