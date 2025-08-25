// Counter animation for the stats
function animateCounter() {
  const counter = document.getElementById('counter');
  const target = 500;
  let current = 0;
  const increment = target / 100; // Slower animation
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current) + '+';
  }, 30); // 30ms interval for smooth animation
}

// Smooth scroll animation observer
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter();
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

// FAQ Accordion functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const faqAnswer = faqItem.querySelector('.faq-answer');
  const faqIcon = element.querySelector('.faq-icon');
  
  // Toggle active class
  faqItem.classList.toggle('active');
  
  // Change icon
  if (faqItem.classList.contains('active')) {
    faqIcon.textContent = '−';
  } else {
    faqIcon.textContent = '+';
  }
}

// Enhanced smooth scrolling for navigation links
function smoothScrollTo(targetId) {
  if (targetId === 'home') {
    // For home, scroll to the very top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// Initialize animations and observers
document.addEventListener('DOMContentLoaded', () => {
  // Observe counter element
  const counter = document.getElementById('counter');
  if (counter) {
    counterObserver.observe(counter);
  }

  // Add animation classes to elements and observe them
  const animateElements = [
    { selector: '.hero-content', classes: ['animate-on-scroll', 'fade-up'] },
    { selector: '.hero-image', classes: ['animate-on-scroll', 'fade-right'] },
    { selector: '.service-card', classes: ['animate-on-scroll', 'fade-up'] },
    { selector: '.case-study', classes: ['animate-on-scroll', 'scale-in'] },
    { selector: '.pricing-card', classes: ['animate-on-scroll', 'fade-up'] },
    { selector: '.blog-card', classes: ['animate-on-scroll', 'fade-up'] },
    { selector: '.section-title', classes: ['animate-on-scroll', 'fade-up'] },
    { selector: '.section-description', classes: ['animate-on-scroll', 'fade-up'] }
  ];

  animateElements.forEach(({ selector, classes }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      classes.forEach(className => element.classList.add(className));
      // Add staggered delay for multiple elements
      element.style.transitionDelay = `${index * 0.1}s`;
      scrollObserver.observe(element);
    });
  });

  // Enhanced navigation link handling
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
      
      // Close mobile menu if open
      const headerCenter = document.querySelector('.header-center');
      const mobileOverlay = document.querySelector('.mobile-menu-overlay');
      if (headerCenter.classList.contains('active')) {
        headerCenter.classList.remove('active');
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const headerCenter = document.querySelector('.header-center');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');

  if (mobileMenuToggle && headerCenter && mobileOverlay) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = headerCenter.classList.contains('active');
      
      if (isActive) {
        // Close menu
        headerCenter.classList.remove('active');
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = '';
        mobileMenuToggle.classList.remove('active');
      } else {
        // Open menu
        headerCenter.classList.add('active');
        mobileOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        mobileMenuToggle.classList.add('active');
      }
    });

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', () => {
      headerCenter.classList.remove('active');
      mobileOverlay.style.display = 'none';
      document.body.style.overflow = '';
      mobileMenuToggle.classList.remove('active');
    });

    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        headerCenter.classList.remove('active');
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = '';
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
});
