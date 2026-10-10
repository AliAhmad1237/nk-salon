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

---

## 2. Visual Identity & Brand System

* **Deep Charcoal:** `#171715`
* **Warm Ivory:** `#F6F3ED`
* **Soft White:** `#FFFFFF`
* **Muted Taupe:** `#B8ADA0`
* **Restrained Copper Accent:** `#B8754B`
* **Body Text Gray:** `#77736D`
* **Typography:** *Cormorant Garamond* (Serif) & *Inter* (Sans-Serif)

---

## 3. Key Design Upgrades

1. **Clean, Minimalist Aesthetics (No Placeholders):**
   * All placeholder badges and notes have been removed.
   * Services are presented cleanly:
     * *Haircuts & Styling*
     * *Hair Treatments & Restoration*
     * *Beard Grooming & Sculpting*
     * *Facial & Skin Care*
     * *Full Grooming Package*
2. **Minimalist Architectural Photography:**
   * Curated and generated minimal photography showcasing arched back-lit mirrors, artisanal grooming tools, ergonomic dark stone wash basin, and precision hair styling.
3. **Custom Brand-Aligned Form Controls:**
   * **Custom Service Dropdown:** Styled to match the warm ivory and copper aesthetic, with smooth hover transitions, keyboard support, and direct link sync from service cards.
   * **Custom Calendar Date Picker:** Integrated calendar with month navigation, disabled past dates, quick buttons (*Today*, *Tomorrow*, *This Weekend*), and active date highlighting.
   * **Custom Time Slot Picker:** Matches the verified opening time starting at 12:00 PM.
4. **Instant WhatsApp Booking Flow:**
   * Submitting the enquiry form validates user input and immediately composes a pre-filled appointment message directly to **+92 343 4121421**, accompanied by an accessible on-page confirmation dialog.

---

## 4. How to Deploy

### Option A: Deploying via GitHub to Vercel (Recommended)

1. **Create a new repository on GitHub:**
   * Go to [github.com/new](https://github.com/new) and create a repository (e.g. `nk-salon`).

2. **Push this local repository to GitHub:**
   Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/nk-salon.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   * Log into [vercel.com](https://vercel.com).
   * Click **"Add New"** > **"Project"**.
   * Import your `nk-salon` repository.
   * Under **Framework Preset**, select **Other** (it's a static site).
   * Click **Deploy**. Vercel will immediately deploy the website using `vercel.json` with clean URLs and asset caching.

---

### Option B: Deploying Manually using Vercel CLI

1. Run:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   * Set up and deploy: **Yes**
   * Scope: Select your Vercel account
   * Link to existing project: **No**
   * Project name: `nk-salon`
   * Directory: `./`
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

---

## 5. Local Development Preview

The local server is pre-configured and can be run anytime:
```bash
node server.mjs
# or
npm start
```
Website runs locally at: `http://localhost:8080/`
