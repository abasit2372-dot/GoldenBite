# 🍕 Golden Bite Pizza Hut - Digital Menu & WhatsApp Ordering System

A high-speed, mobile-first digital restaurant menu web application with **instant WhatsApp direct ordering**, built with pure **HTML5, CSS3, and modern Vanilla JavaScript** (Zero frameworks, Zero database, Zero backend needed).

Designed specifically for **visiting cards, flyers, and table QR codes**:
1. Customer scans the QR code on the visiting card with their phone camera.
2. Opens the digital menu instantly.
3. Selects their favorite deals, pizzas, zinger burgers, or shawarmas.
4. Taps **"Order via WhatsApp"**.
5. Automatically opens WhatsApp chat with the restaurant (+92 321 1345410) with the order items, address, and total prefilled!

---

## 🌟 Key Features

- 📱 **Mobile-First App Experience**: Styled like a food delivery app (Foodpanda, UberEats) with dark luxury aesthetic, golden yellow & crimson accents.
- ⚡ **Zero Backend / No Database Required**: Runs 100% on the client's phone/browser. Completely static, hyper-fast load times.
- 💬 **One-Tap WhatsApp Ordering**:
  - Automatically formats items, quantities, pizza sizes, special instructions, and customer address into a neat WhatsApp message with emojis.
  - Automatically calculates grand total and delivery status (100% Free Home Delivery).
  - Encoded with `https://wa.me/923211345410?text=...` to launch WhatsApp app or WhatsApp Web directly.
- 📇 **Built-in Visiting Card & QR Studio**:
  - Contains a live QR code generator and 2-sided visiting card preview (Front & Back).
  - Print button (`Ctrl + P`) formatted for 3.5" x 2" standard business cards.
  - "Save QR Image" button to give high-resolution PNG to the printing press.
- 🛵 **GPS Location Auto-Detect**: Customers can tap "📍 GPS" to auto-detect their delivery location and attach Google Maps coordinates.
- 🕒 **Live Store Timing Indicator**: Real-time status badge (2:00 PM to 2:00 AM) that shows whether the kitchen is open or opening soon.
- 📞 **Direct Call Integration**: Modal with direct dial links for 0321-1345410, 0302-0640556, and 0303-7422473.

---

## 📂 Project Structure

```
Golden Bite/
├── index.html            # Main mobile digital menu application
├── visiting_card.html    # Dedicated print-ready visiting card template with QR
├── css/
│   └── style.css         # Complete responsive mobile design system
├── js/
│   ├── menu-data.js      # Structured menu items, deals, prices, and restaurant info
│   ├── qrcode.min.js     # Standalone offline QR code generator
│   └── app.js            # Cart logic, WhatsApp message generator, and UI events
├── assets/
│   └── images/           # High-resolution food assets, logo & hero banner
├── server.js             # Optional lightweight local development server
└── README.md             # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

You can run this project locally without installing anything:
1. Simply double-click `index.html` to open it in any web browser.
2. OR, if you have Node.js installed, run:
   ```bash
   node server.js
   ```
   and visit `http://localhost:3000`.

---

## 🌐 How to Deploy Online (100% FREE in 2 Minutes)

Because this project is built with static HTML, CSS, and JS, you can deploy it to any free static host:

### Option 1: GitHub Pages (Recommended)
1. Push this folder to a GitHub repository (e.g. `golden-bite-menu`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
4. In ~30 seconds, your website will be live at `https://your-username.github.io/golden-bite-menu/`.
5. Enter this live URL into the QR Studio to generate the final visiting card QR code!

### Option 2: Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `Golden Bite` folder into the browser window.
3. Your site is live instantly with an HTTPS URL.

### Option 3: Vercel
1. Install Vercel CLI (`npx vercel`) or connect the GitHub repository on [vercel.com](https://vercel.com).
2. Click **Deploy**.

---

## ✏️ How to Update Menu Items & Prices

All restaurant details, deals, and prices are neatly organized in `js/menu-data.js`:

```javascript
const RESTAURANT_INFO = {
  name: "Golden Bite Pizza Hut",
  whatsappNumber: "923211345410", // Change WhatsApp number here
  phoneNumbers: ["0321-1345410", "0302-0640556", "0303-7422473"],
  address: "30 Feet Bazar Nishatabad, Faisalabad",
  timings: "2:00 PM to 2:00 AM"
};
```

To add or change items, simply update the `MENU_ITEMS` array in `js/menu-data.js`. No code changes required!

---

## 🖨️ Printing the Visiting Cards

1. Open `visiting_card.html` in your browser.
2. Enter your live website URL in the top input box (the QR code will automatically update).
3. Click **"Print Visiting Cards"** or press `Ctrl + P`.
4. Hand the exported PDF or printed file to the print press!
