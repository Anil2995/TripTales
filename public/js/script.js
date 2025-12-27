/**
 * TripTales - Enhanced JavaScript
 * Modern, Interactive User Experience
 */

(() => {
  'use strict';

  // ==========================================
  // Bootstrap Form Validation
  // ==========================================
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollY = window.scrollY;
    });
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // Lazy Loading Images
  // ==========================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('animate-fade-in');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ==========================================
  // Listing Card Animations
  // ==========================================
  const listingCards = document.querySelectorAll('.listing-card');
  
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });
    
    listingCards.forEach(card => {
      card.style.opacity = '0';
      cardObserver.observe(card);
    });
  }

  // ==========================================
  // Category Filter Scroll
  // ==========================================
  const filtersContainer = document.getElementById('filters');
  
  if (filtersContainer) {
    // Scroll with mouse wheel
    filtersContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        filtersContainer.scrollLeft += e.deltaY;
      }
    }, { passive: false });
    
    // Add scroll arrows functionality
    const leftArrow = document.querySelector('.filter-arrow.left');
    const rightArrow = document.querySelector('.filter-arrow.right');
    
    if (leftArrow && rightArrow) {
      leftArrow.addEventListener('click', () => {
        filtersContainer.scrollBy({ left: -200, behavior: 'smooth' });
      });
      
      rightArrow.addEventListener('click', () => {
        filtersContainer.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }
  }

  // ==========================================
  // Toast Notification System
  // ==========================================
  window.showToast = function(message, type = 'default') {
    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info',
      default: 'fa-circle-info'
    };
    
    const colors = {
      success: '#008A05',
      error: '#FF385C',
      info: '#222222',
      default: '#222222'
    };
    
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-4 py-3 px-4 rounded-pill shadow-lg d-flex align-items-center gap-2';
    toast.style.cssText = `
      z-index: 9999;
      background: ${colors[type]};
      color: white;
      animation: fadeIn 0.3s ease;
      font-weight: 500;
    `;
    toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i> ${message}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ==========================================
  // Heart/Wishlist Animation
  // ==========================================
  document.querySelectorAll('.heart-icon').forEach(heart => {
    heart.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      this.classList.toggle('liked');
      
      // Heart animation
      this.style.transform = 'scale(1.3)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // Show toast
      if (this.classList.contains('liked')) {
        window.showToast('Added to wishlist! ❤️', 'success');
      } else {
        window.showToast('Removed from wishlist', 'default');
      }
    });
  });

  // ==========================================
  // Image Carousel (Simulated)
  // ==========================================
  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const container = this.closest('.card-image-container');
      const dots = container.querySelectorAll('.carousel-dot');
      
      dots.forEach(d => d.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ==========================================
  // Theme Toggle Persistence
  // ==========================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  };
  initTheme();

  // ==========================================
  // Keyboard Shortcuts
  // ==========================================
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-inp');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Escape to close modals/dropdowns
    if (e.key === 'Escape') {
      const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
      openDropdowns.forEach(dropdown => {
        const bsDropdown = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
        if (bsDropdown) bsDropdown.hide();
      });
    }
  });

  // ==========================================
  // Price Formatting
  // ==========================================
  window.formatPrice = function(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // ==========================================
  // Copy to Clipboard Utility
  // ==========================================
  window.copyToClipboard = async function(text) {
    try {
      await navigator.clipboard.writeText(text);
      window.showToast('Copied to clipboard! 📋', 'success');
    } catch (err) {
      console.error('Failed to copy:', err);
      window.showToast('Failed to copy', 'error');
    }
  };

  // ==========================================
  // Share Property Function
  // ==========================================
  window.shareProperty = async function() {
    const shareData = {
      title: document.title,
      text: 'Check out this amazing place on TripTales!',
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await window.copyToClipboard(window.location.href);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  // ==========================================
  // Loading State for Buttons
  // ==========================================
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.classList.contains('no-loading')) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Loading...';
        submitBtn.disabled = true;
        
        // Re-enable after 5 seconds as fallback
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
        }, 5000);
      }
    });
  });

  // ==========================================
  // Auto-dismiss Alerts
  // ==========================================
  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      if (bsAlert) bsAlert.close();
    }, 5000);
  });

  console.log('🏠 TripTales initialized successfully!');
})();