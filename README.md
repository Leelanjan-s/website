# 🚀 OBLIQUE Creative Studio Website

Oblique is a premium, single-page creative product studio showcase website built with a modern React, Vite, and Tailwind CSS tech stack. It features momentum smooth-scrolling, dark/light theme switching, filterable work grids, and dynamically bound inquiry forms.

---

## 🛠️ Tech Stack & Features
* **Core Framework**: React 18 & Vite
* **Styling**: Tailwind CSS (v3) & Vanilla CSS for custom typography effects
* **Animations**: Framer Motion (for staggered scroll reveals) & Lenis (for smooth momentum scrolling)
* **Form Logic & Validation**: React Hook Form with Zod schema verification
* **Icons**: Lucide React
* **Assets & Docs**: Clean directory structure with all assets/docs organized in designated directories.

---

## 💻 Local Setup Instructions

These instructions work for both **macOS** and **Windows** laptops.

### Prerequisites
Make sure you have **Node.js** installed on your system:
* Recommended version: **Node.js v18.0.0 or higher**
* You can check if you have Node installed by opening your terminal (or Command Prompt/PowerShell on Windows) and running:
  ```bash
  node -v
  ```
  If Node is not installed, download it from [nodejs.org](https://nodejs.org/).

---

### Step 1: Clone the Repository
Open your terminal (macOS) or Command Prompt/PowerShell (Windows) and clone the repository:
```bash
git clone https://github.com/Leelanjan-s/website.git
cd website
```

### Step 2: Install Dependencies
Install all required Node modules:
```bash
npm install
```

### Step 3: Configure Environment Variables (Optional)
To set up email notifications for contact form submissions:
1. Copy `.env.example` to create a `.env` file:
   * **macOS**: `cp .env.example .env`
   * **Windows**: `copy .env.example .env`
2. Open `.env` and set your Formspree ID:
   ```env
   VITE_FORMSPREE_ENDPOINT_ID=your_formspree_id_here
   ```
*(If left empty, the contact form runs in a mock simulation mode locally.)*

### Step 4: Run the Development Server
Start the local server to run the site on your machine:
```bash
npm run dev
```
* Once started, Vite will display a local address (usually `http://localhost:5173/`).
* Open that address in your web browser to view the site live.
* Any code changes you make will automatically update in the browser (Hot Module Replacement).

### Step 5: Build for Production
To build a production-optimized version of the website:
```bash
npm run build
```
The compiled, ready-to-deploy static assets will be outputted to the `dist/` directory.

### Step 6: Preview Production Build
To test the built production assets locally before deploying:
```bash
npm run preview
```

---

## 📂 Project Directory Structure

Here is how the project's codebase is organized after refactoring:

```text
website/
├── docs/                      # Specification papers, blueprint plans & copy decks
├── public/
│   └── images/                # Local graphic templates & jpeg files
├── src/
│   ├── components/            # Modular React components
│   │   ├── Contact.jsx        # Zod verification validation schema & form hooks
│   │   ├── Footer.jsx         # Navigation sitemap & contact list
│   │   ├── Header.jsx         # Top navbar & dark-mode visual theme toggler
│   │   ├── Hero.jsx           # Welcome section headlines
│   │   ├── Industries.jsx     # Segment cards with preloading event callback binding
│   │   ├── Marquee.jsx        # Floating continuous text track
│   │   ├── Process.jsx        # Methodology timeline
│   │   ├── Reveal.jsx         # Motion trigger viewport transitions
│   │   ├── Services.jsx       # Capability description blocks
│   │   ├── Students.jsx       # Mentor lane callouts
│   │   ├── Studio.jsx         # Core team values
│   │   ├── Technology.jsx     # Architecture developer list
│   │   └── Work.jsx           # Portfolio showcase list with filter categories
│   ├── constants/
│   │   └── projects.js        # Static metadata objects (Project list)
│   ├── App.jsx                # Layout orchestrator and theme state coordinator
│   ├── index.css              # CSS custom variables & utilities (Swiss Grid system)
│   └── main.jsx               # Application DOM entry initialization mount
├── .env.example               # Example configurations for environment variables
├── .gitignore                 # Excludes node_modules/ & build outputs from Git
├── package.json               # Dependencies list & run scripts configurations
├── tailwind.config.js         # Tailwind theme styling parameters
└── vite.config.js             # Vite build bundler options
```

---

## 🔧 Troubleshooting

### 1. Port Conflict
If port `5173` is already in use, Vite will automatically select another port (e.g. `5174`). Check the terminal output for the correct URL.

### 2. Node Modules Errors
If you run into compilation errors after updating the code, try deleting the cache and reinstalling:
```bash
# On macOS:
rm -rf node_modules package-lock.json
npm install

# On Windows (PowerShell):
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```