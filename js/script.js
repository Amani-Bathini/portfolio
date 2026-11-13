/**
 * ==========================================================================
 * AMANI BATHINI - PREMIUM PERSONAL DEVELOPER PORTFOLIO
 * Vanilla JavaScript Core Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. TYPING ANIMATION FOR HERO SUBTITLE (TAILORED FOR FRESHER/ENTRY-LEVEL)
  // ------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  const prefixElement = document.querySelector('.typing-prefix');
  const roles = [
    { prefix: 'I am an ', title: 'Aspiring Software Developer' },
    { prefix: 'I am a ',  title: 'Python Developer' },
    { prefix: 'I am a ',  title: 'Computer Science Graduate (2026)' },
    { prefix: 'I am an ', title: 'AI & ML Enthusiast' },
    { prefix: 'I am a ',  title: 'GenAI & RAG Application Builder' }
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function typeEffect() {
    if (!typingElement) return;

    const currentItem = roles[roleIndex];
    if (prefixElement && prefixElement.textContent !== currentItem.prefix) {
      prefixElement.textContent = currentItem.prefix;
    }

    if (isDeleting) {
      typingElement.textContent = currentItem.title.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentItem.title.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentItem.title.length) {
      // Pause at complete word
      typingSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ------------------------------------------------------------------------
  // 2. STICKY NAVBAR & SCROLL-SPY ACTIVE HIGHLIGHTING
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Scroll progress bar update
    if (scrollProgressBar) {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollTotal > 0) {
        const progressPct = Math.min((scrollY / scrollTotal) * 100, 100);
        scrollProgressBar.style.width = `${progressPct}%`;
      }
    }

    // Sticky shadow class
    if (scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }

    // ScrollSpy active link detection
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}` || (currentSectionId === 'home' && href === '#top')) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // ------------------------------------------------------------------------
  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // 5. ANIMATED NUMBER COUNTERS FOR STATS
  // ------------------------------------------------------------------------
  const counterCards = document.querySelectorAll('[data-counter-card]');

  function animateCounter(element, target, decimals = 0, duration = 1600) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (target - startValue) * easeProgress;

      element.textContent = decimals > 0 ? currentValue.toFixed(decimals) : Math.floor(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
      }
    }

    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counterCards.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const numberEl = entry.target.querySelector('.stat-number');
            if (numberEl && !numberEl.dataset.animated) {
              const target = parseFloat(numberEl.getAttribute('data-target') || '0');
              const decimals = parseInt(numberEl.getAttribute('data-decimals') || '0', 10);
              animateCounter(numberEl, target, decimals);
              numberEl.dataset.animated = 'true';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterCards.forEach((card) => counterObserver.observe(card));
  }

  // ------------------------------------------------------------------------
  // 6. TECHNICAL SKILLS CATEGORY FILTER
  // ------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // Toggle active pill
      filterPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterValue = pill.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.display = 'flex';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. MODALS (PROJECT INSPECTION & RESUME PREVIEW)
  // ------------------------------------------------------------------------
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalOverlays = document.querySelectorAll('.modal-dialog-overlay');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  const previewResumeBtn = document.getElementById('previewResumeBtn');
  const resumeModal = document.getElementById('modal-resume-preview');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('open');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  if (previewResumeBtn) {
    previewResumeBtn.addEventListener('click', () => {
      openModal('modal-resume-preview');
    });
  }

  modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-dialog-overlay');
      if (parentModal) closeModal(parentModal);
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach((modal) => {
        if (modal.classList.contains('open')) {
          closeModal(modal);
        }
      });
      closeDrawer();
    }
  });

  // ------------------------------------------------------------------------
  // 8. ONE-CLICK COPY TO CLIPBOARD WITH TOAST
  // ------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback textarea method
          const tempArea = document.createElement('textarea');
          tempArea.value = textToCopy;
          tempArea.style.position = 'fixed';
          tempArea.style.left = '-9999px';
          document.body.appendChild(tempArea);
          tempArea.focus();
          tempArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempArea);
        }

        const tooltip = btn.querySelector('.copy-tooltip');
        if (tooltip) {
          const originalText = tooltip.textContent;
          tooltip.textContent = 'Copied!';
          setTimeout(() => {
            tooltip.textContent = originalText;
          }, 2000);
        }

        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 9. CLIENT-SIDE CONTACT FORM VALIDATION & DIRECT EMAIL BRIDGE
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  const successModal = document.getElementById('modal-form-success');
  const senderNameDisplay = document.getElementById('senderNameDisplay');
  const preparedEmailContent = document.getElementById('preparedEmailContent');
  const directMailtoTrigger = document.getElementById('directMailtoTrigger');

  function clearErrors() {
    [nameInput, emailInput, subjectInput, messageInput].forEach((el) => {
      el?.classList.remove('is-invalid');
    });
    [nameError, emailError, subjectError, messageError].forEach((el) => {
      if (el) el.textContent = '';
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Realtime clear on typing
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input?.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const errEl = document.getElementById(`${input.name}Error`);
      if (errEl) errEl.textContent = '';
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        nameInput.classList.add('is-invalid');
        nameError.textContent = 'Please enter your name.';
        hasError = true;
      } else if (nameVal.length < 2) {
        nameInput.classList.add('is-invalid');
        nameError.textContent = 'Name should be at least 2 characters long.';
        hasError = true;
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        emailInput.classList.add('is-invalid');
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!isValidEmail(emailVal)) {
        emailInput.classList.add('is-invalid');
        emailError.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
        hasError = true;
      }

      // Validate Subject
      const subjectVal = subjectInput.value.trim();
      if (!subjectVal) {
        subjectInput.classList.add('is-invalid');
        subjectError.textContent = 'Please enter a subject.';
        hasError = true;
      } else if (subjectVal.length < 3) {
        subjectInput.classList.add('is-invalid');
        subjectError.textContent = 'Subject must be at least 3 characters.';
        hasError = true;
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        messageInput.classList.add('is-invalid');
        messageError.textContent = 'Please enter your message.';
        hasError = true;
      } else if (messageVal.length < 10) {
        messageInput.classList.add('is-invalid');
        messageError.textContent = 'Message should be at least 10 characters long.';
        hasError = true;
      }

      if (hasError) {
        // Scroll first invalid element into view
        const firstInvalid = contactForm.querySelector('.is-invalid');
        firstInvalid?.focus();
        return;
      }

      // Format direct mailto URL
      const emailRecipient = 'amanibathini28@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectVal}`);
      const mailtoBody = encodeURIComponent(
        `From: ${nameVal} (${emailVal})\n\nSubject: ${subjectVal}\n\nMessage:\n${messageVal}\n\n---\nSent via Amani Bathini's Portfolio Website`
      );
      const mailtoUrl = `mailto:${emailRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Populate preview modal
      if (senderNameDisplay) senderNameDisplay.textContent = nameVal;
      if (preparedEmailContent) {
        preparedEmailContent.innerHTML = `<strong>To:</strong> ${emailRecipient}<br><strong>Subject:</strong> [Portfolio Inquiry] ${escapeHtml(
          subjectVal
        )}<br><strong>Sender:</strong> ${escapeHtml(nameVal)} &lt;${escapeHtml(
          emailVal
        )}&gt;<br><br>${escapeHtml(messageVal).replace(/\n/g, '<br>')}`;
      }
      if (directMailtoTrigger) {
        directMailtoTrigger.setAttribute('href', mailtoUrl);
      }

      // Open email client via window location
      window.location.href = mailtoUrl;

      // Show confirmation dialog
      openModal('modal-form-success');

      // Reset form fields
      contactForm.reset();
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ------------------------------------------------------------------------
  // 10. DYNAMIC COPYRIGHT YEAR
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear >= 2026 ? currentYear : '2026';
  }

  // ------------------------------------------------------------------------
  // 11. MODAL TABS SWITCHER & LIVE INTERACTIVE SIMULATORS
  // ------------------------------------------------------------------------
  // Modal Tab Switching
  const modalTabButtons = document.querySelectorAll('.modal-tab-btn');
  modalTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-card');
      if (!parentModal) return;

      const targetPaneSelector = btn.getAttribute('data-tab-target');
      const allBtns = parentModal.querySelectorAll('.modal-tab-btn');
      const allPanes = parentModal.querySelectorAll('.modal-tab-pane');

      allBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      allPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPane = parentModal.querySelector(targetPaneSelector);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Project 1: RAG Simulator
  const ragPresets = document.querySelectorAll('.sim-preset-chip');
  const ragInput = document.getElementById('ragQueryInput');
  const ragRunBtn = document.getElementById('ragRunBtn');
  const ragSynthesizedText = document.getElementById('ragSynthesizedText');
  const ragCitationFile = document.getElementById('ragCitationFile');
  const ragFlashcardText = document.getElementById('ragFlashcardText');

  const ragScenarios = {
    'How does hybrid TF-IDF + Cosine embedding retrieval reduce hallucinations?': {
      text: 'By pairing exact-keyword scoring (TF-IDF) with dense vector representations (Cosine Similarity), the system eliminates semantic drift and hallucination. Precise domain terminology is cross-referenced with exact chunk offsets and returned with verified source citations.',
      citation: '[Source: ML_Survey_RAG.pdf • Chunk #42 • Page 4]',
      flashcard: '"Q: Why does hybrid retrieval outperform single dense vector search? A: It balances semantic context with exact lexical keyword preservation."'
    },
    'What is the pipeline for ingesting OCR images and YouTube transcripts?': {
      text: 'Visual documents undergo Tesseract OCR text segmentation and noise filtering. YouTube audio streams are transcribed with word-level timestamps. All text streams are normalized into 300+ semantic chunks with sliding overlap before vector indexing.',
      citation: '[Source: Lecture_Notes_OCR.png • Chunk #19 • Audio Stream #3]',
      flashcard: '"Q: How are multimodal inputs unified? A: All streams are transformed into standardized text chunks with source provenance metadata."'
    },
    'How does bcrypt multi-user authentication secure the knowledge base?': {
      text: 'User credentials are salted and hashed using bcrypt with cost factor 12. PostgreSQL sessions enforce row-level security ensuring each user can only ingest, query, and generate flashcards within their authenticated organizational vault.',
      citation: '[Source: Security_Architecture.md • Auth Module v1.2]',
      flashcard: '"Q: Which hashing scheme protects user vaults? A: Bcrypt with adaptive salt and cost-factor scaling."'
    }
  };

  ragPresets.forEach((chip) => {
    chip.addEventListener('click', () => {
      ragPresets.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const query = chip.getAttribute('data-query');
      if (ragInput) ragInput.value = query;
      runRagSimulation(query);
    });
  });

  function runRagSimulation(query) {
    if (!ragSynthesizedText) return;
    ragSynthesizedText.textContent = 'Executing chunk retrieval and cosine similarity ranking across 300+ chunks...';
    setTimeout(() => {
      const match = ragScenarios[query] || {
        text: `Custom query processed successfully against 50+ knowledge base documents. Synthesized semantic response grounded with 91%+ top-3 accuracy and verified citations.`,
        citation: `[Source: Knowledge_Vault_Index.db • Matched Chunks: 3]`,
        flashcard: `"Q: Query Target: ${query.substring(0, 35)}... A: Verified accurate synthesis."`
      };
      ragSynthesizedText.textContent = match.text;
      if (ragCitationFile) ragCitationFile.textContent = match.citation;
      if (ragFlashcardText) ragFlashcardText.textContent = match.flashcard;
    }, 350);
  }

  if (ragRunBtn && ragInput) {
    ragRunBtn.addEventListener('click', () => {
      runRagSimulation(ragInput.value.trim());
    });
  }

  // Project 2: SLA & Queue Simulator
  const triggerSlaBtn = document.getElementById('triggerSlaBtn');
  const simPrioritySelect = document.getElementById('simPrioritySelect');
  const simIssueTitle = document.getElementById('simIssueTitle');
  const slaTicketId = document.getElementById('slaTicketId');
  const slaPriorityBadge = document.getElementById('slaPriorityBadge');
  const slaCountdown = document.getElementById('slaCountdown');
  const slaAssignedDetails = document.getElementById('slaAssignedDetails');

  const slaConfig = {
    P1: { badge: 'P1 - CRITICAL', time: '59m 59s remaining', color: '#8B3047', agent: 'Senior Infrastructure Specialist' },
    P2: { badge: 'P2 - HIGH', time: '3h 59m remaining', color: '#641E32', agent: 'Database Reliability Engineer' },
    P3: { badge: 'P3 - MEDIUM', time: '23h 59m remaining', color: '#3D1220', agent: 'IT Operations Analyst' },
    P4: { badge: 'P4 - LOW', time: '71h 59m remaining', color: '#2B101A', agent: 'Service Desk Associate' }
  };

  let mockTicketCounter = 8045;

  if (triggerSlaBtn && simPrioritySelect) {
    triggerSlaBtn.addEventListener('click', () => {
      const selected = simPrioritySelect.value;
      const conf = slaConfig[selected] || slaConfig.P1;
      const issue = simIssueTitle ? simIssueTitle.value : 'System Issue';

      mockTicketCounter++;
      if (slaTicketId) slaTicketId.textContent = `#TK-${mockTicketCounter}`;
      if (slaPriorityBadge) {
        slaPriorityBadge.textContent = conf.badge;
        slaPriorityBadge.style.backgroundColor = conf.color;
      }
      if (slaCountdown) slaCountdown.textContent = conf.time;
      if (slaAssignedDetails) {
        slaAssignedDetails.innerHTML = `<strong>Auto-Assigned Agent:</strong> ${conf.agent} (Lowest queue depth: 1 active ticket)<br><strong>Issue:</strong> ${escapeHtml(
          issue
        )}<br><strong>Audit Log:</strong> 4-tier engine assigned SLA compliance target with automated routing latency reduced by 40%.`;
      }
      showToast(`Dispatched Ticket #TK-${mockTicketCounter} [${conf.badge}]`);
    });
  }
});

