# NK Salon — Premium Website

A website for **NK Salon**, a local hair salon located in Raiwind, Pakistan.

## 1. Verified Business Details

* **Business Name:** NK Salon
* **Category:** Hair salon
* **Google Rating:** 4.6 / 5 (32 verified reviews)
* **Address:** Tipu Market, Shop #6, Jawa Jump, near Jazz Franchise, Raiwind, Pakistan
* **Google Maps Plus Code:** 66X9+QC Raiwind, Pakistan
* **Contact & WhatsApp:** +92 343 4121421
* **Opening Time:** Opens at 12:00 PM

> **Policy Compliance Note**: No history, staff names, qualifications, prices, service menu items, awards, customer statistics, or social accounts have been fabricated.

---

## 2. Visual Identity & Brand System

* **Deep Charcoal:** `#171715` (Used for contrasting sections, header scrolled background, and footer)
* **Warm Ivory:** `#F6F3ED` (Primary editorial background)
* **Soft White:** `#FFFFFF` (Surface cards and contrast panels)
* **Muted Taupe:** `#B8ADA0` (Subtle typography and metadata labels)
* **Restrained Copper Accent:** `#B8754B` (Buttons, focus rings, subtle badges)
* **Body Text Gray:** `#77736D`
* **Typography:**
  * Serif Headlines: *Cormorant Garamond*
  * Sans-Serif Body & UI: *Inter*

---

## 3. Project Architecture

```
d:\Projects\NK Salon\
├── index.html               # Main website with all required sections
├── 404.html                 # Custom luxury 404 error page
├── css/
│   └── style.css            # Complete responsive stylesheet & design system
├── js/
│   └── main.js              # Vanilla JS: Lightbox, WhatsApp routing, filters
├── assets/
│   └── images/
│       ├── favicon.svg      # Scalable vector monogram favicon
│       ├── hero-salon.jpg   # High-resolution salon interior hero photo
│       ├── about-salon.jpg  # Aesthetic styling station photo
│       ├── gallery-*.jpg    # Curated gallery images across 4 categories
│       └── og-image.jpg     # Open Graph social share image
└── README.md                # Project documentation
```

---

## 4. Key Features & Implementation Highlights

1. **Header & Navigation**:
   * Elegant "NK SALON" typographic wordmark (no fake logo image).
   * Transparent header that smoothly transitions to solid charcoal with backdrop blur on scroll.
   * Fully accessible mobile navigation drawer with keyboard focus trap (`inert` support).

2. **Editorial Hero Section**:
   * Large serif typography: *"Look Good. Feel Your Best."*
   * Verified Google rating badge (`★ 4.6 / 5 · 32 Reviews`).
   * Working Call CTA (`tel:+923434121421`) and Appointment booking CTA.

3. **Curated Services Section**:
   * Typography-led layout with hairline borders (no bulky cards).
   * Clear disclaimer: *“Service categories below are editable placeholders pending confirmation. Contact us for availability and pricing.”*
   * “Enquire Service” action connects directly with the booking form.

4. **Interactive Lightbox & Gallery**:
   * Filter tabs: *All Views*, *Salon Interior*, *Hair Styling*, *Grooming*, *Hair Care*.
   * Native HTML `<dialog>` Lightbox with Arrow keys navigation, Esc dismiss, background click dismiss, and touch swipe gestures.

5. **Customer Reviews Section**:
   * Prominently highlights the verified 4.6 / 5 rating from 32 Google reviews.
   * Direct link to Google Maps Business search for Raiwind.

6. **Contact & Appointment Form Flow**:
   * Call Now, WhatsApp, and Google Maps directions buttons.
   * Embedded interactive Google Map.
   * Functional Appointment Enquiry Form that formats a comprehensive request and opens a direct WhatsApp conversation to **+92 343 4121421**.
   * Accessible confirmation dialog providing immediate feedback and alternative direct phone call option.

7. **Technical & SEO Standards**:
   * Schema.org `HairSalon` LocalBusiness JSON-LD markup.
   * Open Graph & Twitter Card tags.
   * WCAG contrast and visible `:focus-visible` focus states.
   * `prefers-reduced-motion` compliance.

---

## 5. How to Launch & Host

The website is built with clean vanilla HTML5, CSS3, and modern JavaScript, requiring zero build steps or heavy dependencies:

* **Preview locally**: Open `index.html` directly in any web browser, or run a local static server:
  ```bash
  npx serve .
  ```
* **Production deployment**: Deploy directly to GitHub Pages, Netlify, Cloudflare Pages, or any standard web hosting provider by uploading the project files.
