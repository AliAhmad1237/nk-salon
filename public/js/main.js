/**
 * NK SALON — Main Interactive JavaScript
 * Premium Editorial Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollspy();
  initCustomSelects();
  initCustomCalendar();
  initServiceSelection();
  initGallery();
  initLightbox();
  initAppointmentForm();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. Header Scroll State
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Accessible Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mainContent = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    drawer.removeAttribute('inert');
    if (mainContent) mainContent.setAttribute('inert', '');
    if (footer) footer.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('inert', '');
    if (mainContent) mainContent.removeAttribute('inert');
    if (footer) footer.removeAttribute('inert');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, .btn');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Scrollspy for Active Navigation State
   -------------------------------------------------------------------------- */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Custom Select Dropdowns
   -------------------------------------------------------------------------- */
function initCustomSelects() {
  const wrappers = document.querySelectorAll('.custom-select-wrapper');

  wrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const menu = wrapper.querySelector('.custom-select-menu');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
    const displayText = wrapper.querySelector('.custom-select-current-text');
    const options = wrapper.querySelectorAll('.custom-select-option');

    if (!trigger || !menu || !hiddenInput) return;

    const toggleMenu = () => {
      const isOpen = wrapper.classList.contains('open');
      closeAllPopovers(wrapper);
      if (isOpen) {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = opt.getAttribute('data-value');
        hiddenInput.value = value;
        if (displayText) displayText.textContent = value;

        options.forEach(o => {
          o.classList.remove('selected');
          o.setAttribute('aria-selected', 'false');
        });
        opt.classList.add('selected');
        opt.setAttribute('aria-selected', 'true');

        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      });
    });
  });

  // Global dismiss on click outside & Escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      wrappers.forEach(w => {
        w.classList.remove('open');
        w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrappers.forEach(w => {
        w.classList.remove('open');
        w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   5. Custom Calendar Date Picker
   -------------------------------------------------------------------------- */
function initCustomCalendar() {
  const wrapper = document.getElementById('date-calendar-wrapper');
  const trigger = document.getElementById('calendar-trigger-btn');
  const popover = document.getElementById('calendar-popover');
  const displayValue = document.getElementById('calendar-display-value');
  const hiddenInput = document.getElementById('enquiry-date');
  const monthTitle = document.getElementById('cal-month-title');
  const daysGrid = document.getElementById('cal-days-grid');
  const prevBtn = document.getElementById('cal-prev-month');
  const nextBtn = document.getElementById('cal-next-month');
  const quickBtns = document.querySelectorAll('.cal-quick-btn');

  if (!wrapper || !trigger || !popover || !hiddenInput || !daysGrid) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewDate = new Date(today);
  let selectedDate = null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    if (monthTitle) {
      monthTitle.textContent = `${monthNames[month]} ${year}`;
    }

    // Disable prev button if viewDate is current month/year
    const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
    if (prevBtn) {
      prevBtn.style.opacity = isCurrentMonth ? '0.35' : '1';
      prevBtn.style.pointerEvents = isCurrentMonth ? 'none' : 'auto';
    }

    daysGrid.innerHTML = '';

    // First day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust for Monday start (0=Mo, 1=Tu, ... 6=Su)
    const startOffset = (firstDayIndex === 0) ? 6 : (firstDayIndex - 1);

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Leading empty cells
    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day-cell empty';
      daysGrid.appendChild(emptyCell);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      cellDate.setHours(0, 0, 0, 0);

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-day-cell';
      cell.textContent = day;

      const isPast = cellDate < today;
      const isToday = cellDate.getTime() === today.getTime();
      const isSelected = selectedDate && (cellDate.getTime() === selectedDate.getTime());

      if (isPast) {
        cell.classList.add('disabled');
        cell.disabled = true;
      } else {
        if (isToday) cell.classList.add('today');
        if (isSelected) cell.classList.add('selected');

        cell.addEventListener('click', (e) => {
          e.stopPropagation();
          selectDate(cellDate);
        });
      }

      daysGrid.appendChild(cell);
    }
  }

  function selectDate(dateObj) {
    selectedDate = new Date(dateObj);
    selectedDate.setHours(0, 0, 0, 0);

    const isoDate = selectedDate.toISOString().split('T')[0];
    hiddenInput.value = isoDate;

    // Formatted display: e.g. "Sat, 10 Oct 2026"
    const formatted = selectedDate.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    if (displayValue) displayValue.textContent = formatted;

    wrapper.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    renderCalendar();
  }

  // Toggle calendar open/close
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.contains('open');
    closeAllPopovers(wrapper);
    if (isOpen) {
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      wrapper.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      renderCalendar();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // Quick picks
  quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetDays = btn.getAttribute('data-days');
      const target = new Date(today);

      if (targetDays === '0') {
        selectDate(target);
      } else if (targetDays === '1') {
        target.setDate(target.getDate() + 1);
        selectDate(target);
      } else if (targetDays === 'weekend') {
        const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
        let daysUntilSat = (6 - currentDay + 7) % 7;
        if (daysUntilSat === 0 && currentDay === 6) daysUntilSat = 0; // Today is Saturday
        target.setDate(today.getDate() + daysUntilSat);
        selectDate(target);
      }
    });
  });

  // Global dismiss for calendar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-calendar-wrapper')) {
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Initial render
  renderCalendar();
}

function closeAllPopovers(exceptElement) {
  document.querySelectorAll('.custom-select-wrapper, .custom-calendar-wrapper').forEach(el => {
    if (el !== exceptElement) {
      el.classList.remove('open');
      el.querySelector('.custom-select-trigger, .custom-calendar-trigger')?.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   6. Service Selection from List to Appointment Form
   -------------------------------------------------------------------------- */
function initServiceSelection() {
  const serviceButtons = document.querySelectorAll('[data-select-service]');
  const serviceWrapper = document.getElementById('service-select-wrapper');
  const appointmentSection = document.getElementById('contact');

  if (!serviceButtons.length || !serviceWrapper) return;

  const hiddenInput = serviceWrapper.querySelector('input[type="hidden"]');
  const displayText = serviceWrapper.querySelector('.custom-select-current-text');
  const options = serviceWrapper.querySelectorAll('.custom-select-option');

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceName = button.getAttribute('data-select-service');
      if (serviceName) {
        hiddenInput.value = serviceName;
        if (displayText) displayText.textContent = serviceName;

        options.forEach(opt => {
          if (opt.getAttribute('data-value') === serviceName) {
            opt.classList.add('selected');
            opt.setAttribute('aria-selected', 'true');
          } else {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
          }
        });
      }

      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('enquiry-name');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Gallery Filtering
   -------------------------------------------------------------------------- */
let activeGalleryItems = [];

function initGallery() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  if (!filterButtons.length || !galleryItems.length) return;

  activeGalleryItems = galleryItems;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      activeGalleryItems = galleryItems.filter(item => item.style.display !== 'none');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Native <dialog> Lightbox
   -------------------------------------------------------------------------- */
function initLightbox() {
  const dialog = document.getElementById('lightbox-dialog');
  const imgElement = document.getElementById('lightbox-image');
  const captionElement = document.getElementById('lightbox-caption');
  const counterElement = document.getElementById('lightbox-counter');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');

  if (!dialog || !imgElement) return;

  let currentIndex = 0;

  const updateLightboxContent = () => {
    if (!activeGalleryItems.length) return;
    const currentItem = activeGalleryItems[currentIndex];
    const img = currentItem.querySelector('.gallery-img');
    const title = currentItem.querySelector('.gallery-caption')?.textContent || '';
    const category = currentItem.querySelector('.gallery-category-badge')?.textContent || '';

    imgElement.src = img.currentSrc || img.src;
    imgElement.alt = img.alt;
    captionElement.textContent = title ? `${title} — ${category}` : category;
    counterElement.textContent = `${currentIndex + 1} / ${activeGalleryItems.length}`;
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightboxContent();
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    dialog.close();
    document.body.style.overflow = '';
  };

  const showNext = () => {
    if (!activeGalleryItems.length) return;
    currentIndex = (currentIndex + 1) % activeGalleryItems.length;
    updateLightboxContent();
  };

  const showPrev = () => {
    if (!activeGalleryItems.length) return;
    currentIndex = (currentIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    updateLightboxContent();
  };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const visibleIndex = activeGalleryItems.indexOf(item);
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visibleIndex = activeGalleryItems.indexOf(item);
        if (visibleIndex !== -1) {
          openLightbox(visibleIndex);
        }
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isClickInside = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
    if (!isClickInside) {
      closeLightbox();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
  });

  window.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  dialog.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  dialog.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   9. Appointment Enquiry Form with WhatsApp routing & Confirmation Dialog
   -------------------------------------------------------------------------- */
function initAppointmentForm() {
  const form = document.getElementById('appointment-enquiry-form');
  const confirmDialog = document.getElementById('confirmation-dialog');
  const confirmCloseBtn = document.getElementById('confirm-close-btn');
  const confirmDetailsDiv = document.getElementById('confirm-summary-content');
  const confirmWhatsappBtn = document.getElementById('confirm-whatsapp-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.notes ? form.notes.value.trim() : '';

    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible';

    let text = `Hello NK Salon! I would like to enquire about an appointment:\n`;
    text += `• Name: ${name}\n`;
    text += `• Phone: ${phone}\n`;
    text += `• Service: ${service || "Men's Haircuts & Styling"}\n`;
    text += `• Date: ${formattedDate}\n`;
    text += `• Preferred Time: ${time || '12:00 PM - 02:00 PM'}\n`;
    if (message) {
      text += `• Note: ${message}\n`;
    }
    text += `\nPlease let me know your availability. Thank you!`;

    const salonPhone = '923434121421';
    const whatsappUrl = `https://wa.me/${salonPhone}?text=${encodeURIComponent(text)}`;

    if (confirmDetailsDiv) {
      confirmDetailsDiv.innerHTML = `
        <div><strong>Name:</strong> ${escapeHtml(name)}</div>
        <div><strong>Contact:</strong> ${escapeHtml(phone)}</div>
        <div><strong>Service:</strong> ${escapeHtml(service || "Men's Haircuts & Styling")}</div>
        <div><strong>Requested Date:</strong> ${escapeHtml(formattedDate)}</div>
        <div><strong>Requested Time:</strong> ${escapeHtml(time || '12:00 PM - 02:00 PM')}</div>
        ${message ? `<div><strong>Notes:</strong> ${escapeHtml(message)}</div>` : ''}
      `;
    }

    if (confirmWhatsappBtn) {
      confirmWhatsappBtn.href = whatsappUrl;
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (confirmDialog && typeof confirmDialog.showModal === 'function') {
      confirmDialog.showModal();
    }
  });

  if (confirmCloseBtn && confirmDialog) {
    confirmCloseBtn.addEventListener('click', () => {
      confirmDialog.close();
      form.reset();
      const calendarDisplay = document.getElementById('calendar-display-value');
      if (calendarDisplay) calendarDisplay.textContent = 'Select date';
    });
  }
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   10. Dynamic Copyright Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
