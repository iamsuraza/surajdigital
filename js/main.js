/**
 * Suraj Digital - Interactive Frontend Script
 * Author: Antigravity for Suraj Digital (Founded by Suraj Kumar Gupta)
 * Focus: High conversion, accessibility, smooth UX, WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Configuration ---
  const WHATSAPP_NUMBER = '9779703022143';
  const OFFICIAL_EMAIL = 'surazdigital@gmail.com';

  // --- Elements ---
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-item-link, .mobile-nav-links a');
  const backToTopBtn = document.getElementById('backToTop');
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  // --- Sticky Navigation & Scroll Effects ---
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Header elevation
    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy active link update
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.desktop-nav a[href*="${sectionId}"]`);

      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        if (activeLink) {
          document.querySelectorAll('.desktop-nav .nav-item-link').forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- Mobile Navigation Drawer ---
  if (menuToggle && mobileNavDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNavDrawer.classList.toggle('open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        mobileNavDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Toast Notification Helper ---
  let toastTimeout;
  const showToast = (message, duration = 3500) => {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('active');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, duration);
  };

  // --- Copy to Clipboard with Feedback ---
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`✓ Copied ${label} to clipboard!`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`✓ Copied ${label} to clipboard!`);
      }
    });
  });

  // --- Back to Top ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items for a clean single-open behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // --- Interactive Quote / Project Scope Estimator ---
  const calcButtons = document.querySelectorAll('.calc-service-btn');
  const calcSelectedTitle = document.getElementById('calcSelectedTitle');
  const calcSelectedPrice = document.getElementById('calcSelectedPrice');
  const calcSelectedDesc = document.getElementById('calcSelectedDesc');
  const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

  const servicesData = {
    'portfolio': {
      title: 'Personal Portfolio Website (Campaign Offer)',
      price: 'NPR 1,000 (Subject to agreed scope)',
      desc: 'Ideal for students, job seekers, freelancers, and professionals looking to showcase CV, skills, and projects online.',
      message: "Hi Suraj, I am interested in the Personal Portfolio Website campaign offer (NPR 1,000). Let's discuss the scope for my profile."
    },
    'business': {
      title: 'Business Website & Landing Page',
      price: 'Custom quote based on requirements',
      desc: 'Multi-page or single landing page for small businesses, retail shops, agencies, and service providers in Nepal.',
      message: "Hi Suraj, I need a professional Business Website / Landing Page for my business. Can we discuss requirements and pricing?"
    },
    'tasks': {
      title: 'Simple Digital Tasks',
      price: 'Starting from NPR 100',
      desc: 'Minor website updates, DNS setup, link fixes, social link additions, or simple digital troubleshooting.',
      message: "Hi Suraj, I have a simple digital task / quick website edit (starting from NPR 100). Can you help me with this?"
    },
    'gbp': {
      title: 'Google Business Profile Setup & Optimization',
      price: 'Custom quote based on work required',
      desc: 'Setup or enhancement of your Google Maps / Search business listing to help local customers discover your business.',
      message: "Hi Suraj, I'd like help setting up / optimizing my Google Business Profile so local customers can find me on Google Maps."
    },
    'maintenance': {
      title: 'Website Maintenance & Support',
      price: 'Pricing based on ongoing support needed',
      desc: 'Regular content updates, mobile responsiveness fixes, security checks, and technical support as agreed.',
      message: "Hi Suraj, I am looking for website maintenance and technical support for my existing website."
    }
  };

  if (calcButtons.length > 0) {
    calcButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        calcButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const serviceKey = btn.getAttribute('data-service');
        const data = servicesData[serviceKey];

        if (data) {
          if (calcSelectedTitle) calcSelectedTitle.textContent = data.title;
          if (calcSelectedPrice) calcSelectedPrice.textContent = data.price;
          if (calcSelectedDesc) calcSelectedDesc.textContent = data.desc;

          if (calcWhatsAppBtn) {
            const encoded = encodeURIComponent(data.message);
            calcWhatsAppBtn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`);
          }
        }
      });
    });
  }

  // --- Work Showcase / Portfolio Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Contact Form Submission & Validation ---
  const contactForm = document.getElementById('contactForm');
  const btnSubmitWhatsApp = document.getElementById('btnSubmitWhatsApp');
  const btnSubmitEmail = document.getElementById('btnSubmitEmail');
  const formFeedback = document.getElementById('formFeedback');

  const validateForm = () => {
    const name = document.getElementById('contactName').value.trim();
    const contact = document.getElementById('contactEmailOrPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name) {
      showFeedback('Please enter your full name.', 'error');
      document.getElementById('contactName').focus();
      return null;
    }

    if (!contact) {
      showFeedback('Please provide your phone number or email address.', 'error');
      document.getElementById('contactEmailOrPhone').focus();
      return null;
    }

    if (!service) {
      showFeedback('Please select the service you are interested in.', 'error');
      document.getElementById('contactService').focus();
      return null;
    }

    if (!message) {
      showFeedback('Please describe your project or requirements.', 'error');
      document.getElementById('contactMessage').focus();
      return null;
    }

    return { name, contact, service, message };
  };

  const showFeedback = (msg, type = 'error') => {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  if (contactForm && btnSubmitWhatsApp && btnSubmitEmail) {
    // 1. Send via WhatsApp (Instant, Primary for Nepal)
    btnSubmitWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const formData = validateForm();
      if (!formData) return;

      const formattedText = 
`*New Project Inquiry - Suraj Digital*
----------------------------------
*Name:* ${formData.name}
*Contact:* ${formData.contact}
*Service Requested:* ${formData.service}
*Project Details:*
${formData.message}
----------------------------------
Sent from https://surajkumargupta1.com.np/`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedText)}`;
      showFeedback('Opening WhatsApp with your project details...', 'success');
      showToast('✓ Redirecting to WhatsApp chat...');
      window.open(waUrl, '_blank');
    });

    // 2. Send via Email (mailto fallback with clipboard copy)
    btnSubmitEmail.addEventListener('click', (e) => {
      e.preventDefault();
      const formData = validateForm();
      if (!formData) return;

      const subject = `Website Project Inquiry: ${formData.service} - ${formData.name}`;
      const emailBody = 
`Hello Suraj,

I would like to inquire about digital services for my project.

Name: ${formData.name}
Contact Info: ${formData.contact}
Service Required: ${formData.service}

Project Details:
${formData.message}

Looking forward to hearing from you.
Best regards,
${formData.name}`;

      const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Also copy to clipboard for convenience if email client isn't configured
      try {
        navigator.clipboard.writeText(emailBody);
        showFeedback(`Opening your email client... (Message text has also been copied to your clipboard as a backup!)`, 'success');
        showToast('✓ Email opened & message copied to clipboard!');
      } catch (err) {
        showFeedback('Opening your default email app...', 'success');
      }

      window.location.href = mailtoUrl;
    });
  }

  // --- Company Banner Lightbox Modal ---
  const bannerModalTrigger = document.getElementById('openBannerModal');
  const bannerModal = document.getElementById('bannerModal');
  const bannerModalClose = document.getElementById('closeBannerModal');

  if (bannerModalTrigger && bannerModal) {
    bannerModalTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      bannerModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (bannerModalClose) {
      bannerModalClose.addEventListener('click', () => {
        bannerModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    bannerModal.addEventListener('click', (e) => {
      if (e.target === bannerModal) {
        bannerModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bannerModal.classList.contains('open')) {
        bannerModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Dynamic Year in Footer ---
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
