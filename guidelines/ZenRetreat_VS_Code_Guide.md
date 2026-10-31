# Shiva Yoga Niketan — Complete Developer & Deployment Guide

> **Who is this for?**
> Anyone who needs to edit the website in VS Code, push it to GitHub, and publish
> it live on Netlify with a custom domain. Every single step is written out — even
> the ones that feel obvious — so you never have to guess.

---

# PART A — DEPLOYMENT GUIDE

### (Read this first. Do these steps in order.)

---

## STEP 1 — Install the Tools You Need

Before anything else, make sure these three programs are installed on your computer.

### 1a. Install Node.js

Node.js is the engine that runs the website code on your computer.

1. Open your web browser and go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (it may say something like "20.x.x LTS").
3. The download will start automatically. When it finishes, open the downloaded file.
4. Click **Next → Next → Install** all the way through. Leave everything on its default settings.
5. When it says "Finish", click it.

**How to check it worked:**

- On Mac: Open the **Terminal** app (search "Terminal" in Spotlight).
- On Windows: Open the **Command Prompt** app (search "cmd" in the Start menu).
- Type this and press Enter:
  ```
  node --version
  ```
- You should see something like `v20.11.0`. Any number is fine. If you see it, Node.js is installed. ✅

---

### 1b. Install Git

Git is the tool that saves your code and sends it to GitHub.

1. Go to: **https://git-scm.com/downloads**
2. Click your operating system (Mac or Windows).
3. Download and install it. Click **Next** through every screen — the defaults are all correct.

**How to check it worked:**

- In Terminal / Command Prompt, type:
  ```
  git --version
  ```
- You should see something like `git version 2.44.0`. ✅

---

### 1c. Install VS Code

VS Code is where you will edit the website files.

1. Go to: **https://code.visualstudio.com**
2. Click the big **Download** button for your system.
3. Install it the same way — Next, Next, Install.

---

## STEP 2 — Get the Project Files onto Your Computer

### 2a. Export the project from Figma Make

1. Inside Figma Make, look for the **Export** or **Download** button (usually top-right area).
2. It will give you a `.zip` file. Download it.
3. Find the `.zip` file on your computer (usually in your **Downloads** folder).
4. **Unzip it:**
   - On Mac: Double-click the `.zip` file. A new folder appears next to it.
   - On Windows: Right-click the `.zip` file → click **"Extract All"** → click **Extract**.
5. You now have a folder — something like `shiva-yoga-niketan` or `zen-retreat`.
   Move this folder somewhere easy to find, like your **Desktop** or **Documents**.

> **Important:** Remember exactly where you put this folder. You will need to navigate to it.

---

### 2b. Open the project in VS Code

1. Open VS Code.
2. Click **File** in the top menu bar.
3. Click **"Open Folder..."**
4. Navigate to the folder you unzipped in Step 2a. Click on it once to select it.
5. Click **"Open"**.
6. VS Code will open. On the left side you should see a list of files and folders
   like `src`, `public`, `package.json`, etc. ✅

---

### 2c. Open the built-in Terminal inside VS Code

You will type most commands here — it is easier than switching between windows.

1. In VS Code, click **Terminal** in the top menu bar.
2. Click **"New Terminal"**.
3. A panel opens at the bottom of VS Code. This is your terminal.

> **Mac users:** The terminal starts in your home folder. You need to navigate to the project.
> **Windows users:** Same thing.

**Navigate to your project folder:**
Type this command and press Enter (replace the path with YOUR folder's location):

```bash
# Example on Mac:
cd ~/Desktop/shiva-yoga-niketan

# Example on Windows:
cd C:\Users\YourName\Desktop\shiva-yoga-niketan
```

> **Tip:** You can drag the folder from Finder/Explorer and drop it into the Terminal
> after typing `cd ` — it will paste the full path automatically.

**Confirm you are in the right place** by typing:

```bash
ls
```

(or `dir` on Windows)

You should see files listed like `package.json`, `src`, `vite.config.ts`, etc. ✅

---

### 2d. Install the project's dependencies

The project needs a set of helper code packages (libraries). Install them by typing:

```bash
npm install
```

Press Enter. Wait. You will see a lot of text scrolling past. This is normal.
When it finishes and you see the `$` prompt again, it is done. This can take 1–3 minutes.

**Test the site runs locally:**

```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

You should see the Shiva Yoga Niketan website! ✅

Press **Ctrl + C** in the terminal when you want to stop the local server.

---

## TROUBLESHOOTING — Images Not Loading / "Failed to resolve import" Error

If you open the project in VS Code and see a wall of errors like:

```
[vite] Failed to resolve import "figma:asset/35e46892457e99c63e18e383f342a45b912e12f7.png"
```

**This is the most common export issue and has a one-line fix that is already built into the project.**

### Why it happens

Inside Figma Make, `figma:asset/hash.png` is a virtual module handled by Figma's private Vite plugin.  
When you export the code, that plugin is gone — but the import statements in every component still say `figma:asset/…`.  
Meanwhile, the export drops all the actual image files into an **`assets/` folder at the project root** (the same location Figma's own plugin uses). Some exports/re-organisations instead use `src/assets/`.

**The original bug:** the exported `figmaAssetPlugin()` only looked in `src/assets/`, so when the export placed the binaries in the root `assets/` folder, *every* image failed to resolve. That mismatch is what caused "the images do not read."

### The fix (already applied)

The `vite.config.ts` `figmaAssetPlugin()` now checks **both** locations for each image and resolves to whichever exists:

1. `assets/<hash>.png` (project root — the default export layout)
2. `src/assets/<hash>.png` (alternative layout)

**You do not need to change any component file.** Just make sure ONE of those folders exists and contains the `.png` files with long hash names:

1. Open your exported project folder.
2. Look for an `assets/` folder at the root **or** inside `src/`. It should contain `.png` files named with long hashes.
3. If either is present → run `npm run dev` and the images will load.
4. If **both are missing / incomplete** → re-export from Figma Make using the official "Download / Export code" action, which bundles the full `assets/` folder. (A partial copy/paste of files will not include the image binaries, since they are stored by Figma, not in the visible source tree.)

### Quick checklist if you still see errors

| Check | How |
|---|---|
| Is an `assets/` folder present (root **or** `src/`)? | Look in the file explorer on the left side of VS Code |
| Did you run `npm install`? | Run it in the terminal if you haven't |
| Is Node.js installed? | `node --version` in terminal should print a version number |
| Are you in the right folder? | `ls` (Mac) or `dir` (Windows) should show `package.json` |

---

## STEP 3 — Create a GitHub Account and Repository

GitHub is the place on the internet where your code will be stored.
Netlify will connect to GitHub and pull your code from there every time you publish.

### 3a. Create a free GitHub account (skip if you already have one)

1. Go to: **https://github.com**
2. Click **"Sign up"** in the top-right corner.
3. Enter your email address, create a password, choose a username.
4. Follow the steps to verify your email.
5. When you reach the dashboard (a page with a dark header and GitHub logo), you are in. ✅

---

### 3b. Create a new repository (your code's "home" on GitHub)

A repository (or "repo") is like a folder on GitHub that stores your project.

1. Make sure you are logged into GitHub.
2. Click the **"+"** icon in the top-right corner of any GitHub page.
3. Click **"New repository"**.
4. Fill in the form:
   - **Repository name:** `shiva-yoga-niketan` (or any name you like — no spaces)
   - **Description:** `Shiva Yoga Niketan website` (optional, but helpful)
   - **Visibility:** Select **"Public"** (Netlify can deploy public repos for free)
   - **Do NOT tick** "Add a README file"
   - **Do NOT tick** "Add .gitignore"
   - **Do NOT tick** "Choose a license"
5. Click the green **"Create repository"** button.
6. GitHub shows you a page with setup instructions. **Leave this page open** — you will need the URL shown there (it looks like `https://github.com/yourusername/shiva-yoga-niketan.git`). ✅

---

### 3c. Connect your local project to GitHub and push the code

Go back to VS Code and the terminal inside it.

**Tell Git who you are** (only need to do this once per computer):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Replace "Your Name" and "your@email.com" with your actual name and the email you used for GitHub.

**Set up Git in your project folder:**

```bash
git init
```

You will see: `Initialized empty Git repository in .../your-folder/.git/`

**Stage all the project files for saving:**

```bash
git add .
```

(The dot `.` means "everything in this folder". This command has no visible output — that is normal.)

**Save a snapshot of the code (called a "commit"):**

```bash
git commit -m "Initial commit — Shiva Yoga Niketan website"
```

You will see a list of files scrolling past. That is Git confirming it saved them. ✅

**Connect your local project to the GitHub repository you just created:**

Go back to the GitHub page from Step 3b. Copy the URL that ends in `.git`.
It looks like: `https://github.com/yourusername/shiva-yoga-niketan.git`

In the terminal, type (paste YOUR url after `origin`):

```bash
git remote add origin https://github.com/yourusername/shiva-yoga-niketan.git
```

**Rename the main branch and push your code to GitHub:**

```bash
git branch -M main
git push -u origin main
```

GitHub may ask for your username and password.

> **Important:** GitHub no longer accepts your account password here.
> You need to use a **Personal Access Token** instead. Here is how:
>
> 1. On GitHub, click your profile picture (top-right) → **Settings**
> 2. Scroll all the way down in the left sidebar → click **"Developer settings"**
> 3. Click **"Personal access tokens"** → **"Tokens (classic)"**
> 4. Click **"Generate new token"** → **"Generate new token (classic)"**
> 5. Give it a name like "Netlify deploy", set **Expiration** to "No expiration"
> 6. Tick the box next to **"repo"** (this gives access to your repositories)
> 7. Scroll down and click **"Generate token"**
> 8. **Copy the token immediately** — you can only see it once! It starts with `ghp_...`
> 9. When the terminal asks for your password, paste this token instead.

After the push completes, refresh your GitHub repository page in the browser.
You should now see all your project files listed there. ✅

---

## STEP 4 — Deploy on Netlify

Netlify is the service that takes your code from GitHub and publishes it as a live website.

### 4a. Create a free Netlify account (skip if you already have one)

1. Go to: **https://netlify.com**
2. Click **"Sign up"** — choose **"Sign up with GitHub"** (this makes linking easier).
3. GitHub will ask you to authorize Netlify. Click **"Authorize netlify"**.
4. Netlify will create your account and take you to your dashboard. ✅

---

### 4b. Create a new site on Netlify

1. On your Netlify dashboard, click the **"Add new site"** button.
   (It may also say **"Import an existing project"** — click that.)
2. Click **"Import from Git"**.
3. Click **"GitHub"**.
4. Netlify will ask for permission to access your GitHub. Click **"Authorize Netlify"**.
5. A list of your GitHub repositories appears. **Click on `shiva-yoga-niketan`**
   (or whatever you named it in Step 3b).

---

### 4c. Configure the build settings

This is the most important part. Tell Netlify exactly how to build your site.

Netlify will show you a configuration form. Fill it in exactly like this:

| Field                 | Value to enter               |
| --------------------- | ---------------------------- |
| **Branch to deploy**  | `main`                       |
| **Base directory**    | _(leave this blank / empty)_ |
| **Build command**     | `npm run build`              |
| **Publish directory** | `dist`                       |

> **Why `dist`?** When Vite (the build tool) compiles your React code, it puts
> the final ready-to-serve files into a folder called `dist`. Netlify needs to
> know to serve from that folder.

After filling in the form, click the **"Deploy site"** button.

---

### 4d. Wait for the build to finish

Netlify will now:

1. Download your code from GitHub.
2. Run `npm install` to get all the packages.
3. Run `npm run build` to compile everything.
4. Publish the `dist` folder as your live website.

This takes about **2–4 minutes**. You will see a log of messages scrolling on screen.

When it is done, the top of the page will show a green box that says **"Published"**
and a URL like `https://magical-unicorn-abc123.netlify.app`.

**Click that URL.** Your website is now live on the internet! 🎉

---

### 4e. Fix the "Page Not Found" error on route refresh (CRITICAL)

Because this is a React single-page app, if someone goes directly to a URL like
`https://yoursite.netlify.app/about` or refreshes the page on any sub-page,
Netlify will show a "404 Not Found" error.

**The fix is a `_redirects` file. Here is exactly how to add it:**

1. In VS Code, look at the left sidebar (the file list).
2. Click on the `public` folder to open it.
3. Right-click on the `public` folder → click **"New File"**.
4. Name the file: `_redirects` (exactly — with the underscore, no file extension).
5. Click the new file to open it in the editor.
6. Type this single line into the file:
   ```
   /*    /index.html   200
   ```
7. Save the file: Press **Ctrl + S** (Windows) or **Cmd + S** (Mac).

> **What this does:** It tells Netlify: "For any URL the user visits, serve the
> main `index.html` file and let React Router handle the routing."

Now commit and push this new file to GitHub (see Step 5 for the push workflow).
Netlify will automatically redeploy and the 404 problem will be gone. ✅

---

## STEP 5 — The Publish Workflow (Every Time You Make a Change)

Every time you edit the website and want the changes to go live, follow these 4 commands.
This takes about 30 seconds to type, then 2 minutes for Netlify to update.

Open the terminal in VS Code and type these one at a time, pressing Enter after each:

```bash
# 1. Stage all your changed files
git add .

# 2. Save a snapshot with a message describing what you changed
git commit -m "describe what you changed here"

# 3. Push to GitHub
git push
```

That is it. Netlify watches your GitHub repo and **automatically** starts a new build
the moment it detects new code. Within 2 minutes your live site is updated.

**You can watch the deploy happening:**

- Go to your Netlify dashboard.
- Click on your site.
- Click the **"Deploys"** tab.
- You will see a yellow "Building" status change to green "Published".

---

## STEP 6 — Connect Your Custom Domain

You can replace the `magical-unicorn-abc123.netlify.app` URL with your own domain
(like `shivayoganiketan.com`).

### 6a. Add the domain to Netlify

1. On your Netlify dashboard, click your site.
2. Click **"Domain settings"** (or **"Set up a custom domain"**).
3. Click **"Add a domain"**.
4. Type your domain name (e.g. `shivayoganiketan.com`) and click **"Verify"**.
5. Netlify will check if you own the domain. Click **"Yes, add domain"**.

---

### 6b. Point your domain's DNS to Netlify

This step is done on the website where you **bought** your domain
(e.g. GoDaddy, Namecheap, Google Domains, Squarespace).

1. Log into wherever you bought your domain.
2. Find the **DNS settings** for your domain (sometimes called "DNS Records",
   "Name Servers", or "DNS Management").

**Option A — Use Netlify's Name Servers (recommended, easiest):**

On Netlify, go to **Domain settings → Domains → `yourdomain.com` → Options →
"Go to DNS panel"**. Netlify will show you 4 name server addresses like:

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

In your domain registrar (GoDaddy/Namecheap/etc.), find **"Name Servers"** or
**"Custom DNS"** and replace whatever is there with these 4 Netlify addresses.

**Option B — Add a CNAME record (if you don't want to change name servers):**

In your domain registrar's DNS settings, add a new record:
| Type | Host/Name | Value/Points to |
|------|-----------|-----------------|
| `CNAME` | `www` | `magical-unicorn-abc123.netlify.app` |

And for the root domain (without www), add:
| Type | Host/Name | Value/Points to |
|------|-----------|-----------------|
| `A` | `@` | `75.2.60.5` |

> **Note:** DNS changes can take anywhere from a few minutes to 48 hours to fully
> take effect worldwide. This is completely normal.

---

### 6c. Enable HTTPS (free SSL certificate)

Once your domain is pointing to Netlify:

1. Go to **Domain settings** on Netlify.
2. Scroll down to **"HTTPS"**.
3. Click **"Verify DNS configuration"**.
4. If DNS has propagated, click **"Provision certificate"**.
5. Wait 2–5 minutes. Netlify will issue a free SSL certificate (the padlock in the browser). ✅

Your website is now live at `https://yourdomain.com`! 🎉

---

---

# PART B — HOW TO CHANGE IMAGES (Step-by-Step)

This was tricky before. Here is the fully detailed method.

---

## Understanding Where Images Come From

The project has **two types** of images. You need to handle them differently.

### Type 1 — `figma:asset/...` imports (Hero images, section backgrounds)

These look like this at the top of component files:

```tsx
import imgHero from "figma:asset/06f0a13392788d643753bbb1d9e702d1e87811f6.png";
```

`figma:asset/...` is a special Figma Make format. It works inside Figma Make,
but when you run the code locally in VS Code or deploy to Netlify, you must replace
these with real file paths.

### Type 2 — `/src/imports/...` file imports (body images, card images)

These look like:

```tsx
import imgBody1 from "../../imports/OpenPost1-1/b1cca5526ca6d0124eaf3112e9d44d58f9e896d7.png";
```

These are already real files inside the project folder. You can replace them just
by swapping the file path.

---

## Method A — Replacing a `figma:asset/...` Image

**Example: You want to change the hero image on the Programs page.**

### Step 1 — Prepare your new image

1. Have your new image file ready (e.g. `new-hero.jpg` or `new-hero.png`).
2. In VS Code, look at the left sidebar. Find the `src` folder.
3. Inside `src`, check if there is an `assets` folder. If not, create one:
   - Right-click on `src` → **"New Folder"** → name it `assets`.
4. Inside `assets`, create another folder called `images`:
   - Right-click on `assets` → **"New Folder"** → name it `images`.
5. Copy/paste your new image file into `src/assets/images/`.
   - On Mac: In Finder, find your image and press **Cmd + C**, then click the
     `images` folder in VS Code's sidebar and press **Cmd + V**.
   - On Windows: In Explorer, right-click your image → Copy, then right-click
     the `images` folder in VS Code → Paste.

Your folder structure should now look like:

```
src/
  assets/
    images/
      new-hero.jpg   ← your image is here
```

---

### Step 2 — Find which file uses the image

Use VS Code's global search to find where the image is imported:

1. Press **Ctrl + Shift + F** (Windows) or **Cmd + Shift + F** (Mac).
2. In the search box, type `figma:asset/` to find all Figma asset imports.
3. Look through the results to find the specific page you want to change.
4. Click the result to open that file.

---

### Step 3 — Replace the import at the top of the file

Every image used in a component is imported at the very top of the file
(above the first `function` keyword). Find the line that imports the hero image.

**Before (the Figma asset import):**

```tsx
import imgHero from "figma:asset/06f0a13392788d643753bbb1d9e702d1e87811f6.png";
```

**After (your new local image):**

```tsx
import imgHero from "../../assets/images/new-hero.jpg";
```

> **How to figure out the `../../` part:**
> The component files live at `/src/app/components/YourPage.tsx`.
> Your images are at `/src/assets/images/`.
> To get from `/src/app/components/` to `/src/assets/`:
>
> - `../` goes up one level (to `/src/app/`)
> - `../` again goes up one more level (to `/src/`)
> - Then `assets/images/new-hero.jpg` is the rest of the path.
>   So the full relative path is always: `../../assets/images/your-image.jpg`

**Save the file** (Ctrl + S / Cmd + S).

The rest of the JSX code — wherever `imgHero` is used as `src={imgHero}` — stays
exactly the same and will now show your new image. ✅

---

## Method B — Replacing a `/src/imports/...` Image

These are simpler because they are already real files.

### Step 1 — Find the image import in the component

Open the component file (e.g. `BlogPostPage.tsx`). Near the top you will see:

```tsx
import imgBody1 from "../../imports/OpenPost1-1/b1cca5526ca6d0124eaf3112e9d44d58f9e896d7.png";
```

### Step 2 — Add your new image

Put your new image in `src/assets/images/` (create this folder if needed — see
Method A, Step 1).

### Step 3 — Update the import

Change the import line to point to your new image:

```tsx
import imgBody1 from "../../assets/images/my-new-body-image.jpg";
```

The variable name (`imgBody1`) stays the same. Only the path changes.
Save the file. Done. ✅

---

## Cheat Sheet: Which File Has Which Images

| Page                  | Component File           | What to search for                    |
| --------------------- | ------------------------ | ------------------------------------- |
| Homepage hero         | `YogaLandingPage.tsx`    | `imgHero` or `figma:asset/` near top  |
| About Us hero         | `AboutPage.tsx`          | `figma:asset/` near top               |
| Programs listing      | `ProgramsPage.tsx`       | `figma:asset/` near top               |
| Program detail hero   | `ProgramDetailPage.tsx`  | `heroImg` in `ALL_PROGRAMS` array     |
| Teachers listing      | `TeachersPage.tsx`       | `figma:asset/` near top               |
| Teacher profile photo | `TeacherProfilePage.tsx` | `photo:` in `TEACHERS` array          |
| Blog listing cards    | `BlogPage.tsx`           | image imports near top                |
| Blog post hero + body | `BlogPostPage.tsx`       | `imgHero1`, `imgBody1`, etc. near top |
| Retreats listing      | `RetreatsPage.tsx`       | `imgCard1`, `imgCard2`, etc. near top |
| Retreat detail hero   | `RetreatDetailPage.tsx`  | `heroImg` in `ALL_RETREATS` array     |
| Prices page           | `PricesPage.tsx`         | `imgProgram1`, etc. near top          |
| Appointment page      | `AppointmentPage.tsx`    | `figma:asset/` near top               |
| Contact page          | `ContactPage.tsx`        | `figma:asset/` near top               |
| Footer background     | `ZenShared.tsx`          | `imgFooterBg` near top                |

---

## Common Image Mistakes and Fixes

| Problem                                          | Cause                                       | Fix                                                                                                         |
| ------------------------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Image shows as broken on local preview           | The file path is wrong                      | Double-check the `../../assets/images/` path and the exact file name including extension (`.jpg` vs `.png`) |
| Image works locally but breaks after deploy      | You forgot to push the image file to GitHub | Run `git add .` → `git commit -m "add images"` → `git push`                                                 |
| `figma:asset/` still in the code after deploy    | You forgot to replace it before pushing     | Replace all `figma:asset/...` imports with local paths                                                      |
| Build fails on Netlify with "Cannot find module" | Image import path is wrong                  | Check that the file name and path exactly match                                                             |

---

---

# PART C — DEVELOPER REFERENCE GUIDE

---

## C1. Project Overview

| What                                    | Where                               |
| --------------------------------------- | ----------------------------------- |
| Framework                               | React + TypeScript (Vite)           |
| Styling                                 | Tailwind CSS v4                     |
| Routing                                 | `react-router` (Data mode)          |
| Entry point                             | `/src/app/App.tsx`                  |
| Route map                               | `/src/app/routes.tsx`               |
| Shared UI (Navbar, Footer, buttons)     | `/src/app/components/ZenShared.tsx` |
| Fonts (Google Fonts import + overrides) | `/src/styles/fonts.css`             |
| Design tokens (colours, radius, etc.)   | `/src/styles/theme.css`             |
| Figma-exported raw components           | `/src/imports/` ← do NOT edit these |

---

## C2. File Map — Every Page and Route

| URL               | Component File                               |
| ----------------- | -------------------------------------------- |
| `/`               | `/src/app/components/YogaLandingPage.tsx`    |
| `/about`          | `/src/app/components/AboutPage.tsx`          |
| `/programs`       | `/src/app/components/ProgramsPage.tsx`       |
| `/programs/:slug` | `/src/app/components/ProgramDetailPage.tsx`  |
| `/teachers`       | `/src/app/components/TeachersPage.tsx`       |
| `/teachers/:slug` | `/src/app/components/TeacherProfilePage.tsx` |
| `/retreats`       | `/src/app/components/RetreatsPage.tsx`       |
| `/retreats/:slug` | `/src/app/components/RetreatDetailPage.tsx`  |
| `/blog`           | `/src/app/components/BlogPage.tsx`           |
| `/blog/:slug`     | `/src/app/components/BlogPostPage.tsx`       |
| `/prices`         | `/src/app/components/PricesPage.tsx`         |
| `/contact`        | `/src/app/components/ContactPage.tsx`        |
| `/appointment`    | `/src/app/components/AppointmentPage.tsx`    |

---

## C3. How Routing Works

All routes are declared in one file: `/src/app/routes.tsx`

```ts
// Example: adding a new page
import MyNewPage from "./components/MyNewPage";

// Inside the children array:
{ path: "my-page", Component: MyNewPage },
```

**To link to any page from inside a component, use `<Link>` not `<a>`:**

```tsx
import { Link } from "react-router";

<Link to="/blog">Go to Blog</Link>;
```

---

## C4. Design System — Colours

| Role            | Hex value | Used for                               |
| --------------- | --------- | -------------------------------------- |
| Sage green      | `#c3dbc5` | Buttons, badges, cards, hover overlays |
| Dark teal       | `#074240` | Active nav link, headings, accents     |
| Off-white cream | `#f8f3ed` | Page background                        |
| Almost-black    | `#151515` | Body headings, primary text            |
| Mid-grey        | `#434a4a` | Body paragraphs                        |
| Light grey      | `#8b8a82` | Dividers, placeholder text             |

---

## C5. Design System — Typography

| Font                    | Class syntax used in code                     | Use case                     |
| ----------------------- | --------------------------------------------- | ---------------------------- |
| Marcellus (serif)       | `font-['Marcellus:Regular',sans-serif]`       | Display headings, big titles |
| Playfair Display italic | `font-['Playfair_Display:Italic',sans-serif]` | Logo, decorative text        |
| Lato regular            | `font-['Lato:Regular',sans-serif]`            | Body paragraphs              |
| Lato medium             | `font-['Lato:Medium',sans-serif]`             | Buttons, UI labels           |
| Lato semi-bold          | `font-['Lato:SemiBold',sans-serif]`           | Badges, caps labels          |
| Urbanist                | `font-['Urbanist:Medium',sans-serif]`         | Optional UI labels           |

---

## C6. Design System — Responsive Breakpoints

| Prefix        | Minimum width | Targets                             |
| ------------- | ------------- | ----------------------------------- |
| _(no prefix)_ | 0px           | Mobile — 375 to 390px               |
| `sm:`         | 640px         | Large mobile / small tablet — 768px |
| `lg:`         | 1024px        | Desktop — 1024px+                   |
| `xl:`         | 1280px        | Wide desktop — 1440px               |

```tsx
// Pattern: small on mobile, bigger on desktop
<h1 className="text-[36px] sm:text-[56px] lg:text-[80px] xl:text-[90px]">
```

---

## C7. Shared Components (ZenShared.tsx)

```tsx
import {
  Navbar,
  Footer,
  GreenButton,
  OutlinedButton,
  ArrowCircleButton,
  SectionBadge,
  StarRating,
  LeafIcon,
  LogoSymbol,
} from "./ZenShared";
```

| Component                           | What it renders                             | Props                  |
| ----------------------------------- | ------------------------------------------- | ---------------------- |
| `<Navbar />`                        | Full navigation bar with dropdowns + search | none                   |
| `<Footer />`                        | Full footer with sitemap + newsletter form  | none                   |
| `<GreenButton label="..." />`       | Sage-green pill button                      | `label`, `sm` (bool)   |
| `<OutlinedButton label="..." />`    | Outlined pill button with arrow             | `label`                |
| `<ArrowCircleButton label="..." />` | White pill with arrow circle                | `label`, `bg`          |
| `<SectionBadge text="..." />`       | Small leaf icon + uppercase label           | `text`, `light` (bool) |
| `<StarRating />`                    | 5 green stars SVG                           | none                   |
| `<LeafIcon />`                      | Small leaf SVG                              | `size`, `color`        |
| `<LogoSymbol />`                    | Yoga Niketan logo mark                      | `size`, `color`        |

**Every page should start exactly like this:**

```tsx
import { Navbar, Footer } from "./ZenShared";

export default function MyNewPage() {
  return (
    <div className="min-h-screen bg-[#f8f3ed]">
      <Navbar />
      {/* your page content here */}
      <Footer />
    </div>
  );
}
```

---

## C8. Adding a Brand-New Page

**Step 1 — Create the file:**
Create `/src/app/components/NewPage.tsx`

**Step 2 — Register the route in `/src/app/routes.tsx`:**

```ts
{
  path: "new-page",
  lazy: async () => {
    const { default: Component } = await import("./components/NewPage");
    return { Component };
  },
},
```

**Step 3 — Add to the Navbar (optional):**
Open `ZenShared.tsx`, find the `NAV_LINKS` array and add your page.

---

## C9. Teacher Profiles — How to Edit

All teacher data lives in the `TEACHERS` array inside:
`/src/app/components/TeacherProfilePage.tsx`

```ts
{
  slug:       "angela-carbone",    // must match the URL: /teachers/angela-carbone
  name:       "Angela Carbone",
  title:      "Yoga Teacher & Therapist",
  photo:      imgTeacher1,         // swap the import at the top for a new photo
  email:      "angela@zenretreat.com",
  bio1:       "First paragraph...",
  bio2:       "Second paragraph...",
  education:  "University of...",
  expertise:  "Vinyasa Flow...",
  experience: "25 years",
  shifts: [
    { day: "Monday", time: "09:00 – 14:00" },
  ],
}
```

**To add a new teacher:**

1. Add their photo to `/src/assets/images/` and import it at the top of the file.
2. Copy one existing object, paste it at the end of the `TEACHERS` array.
3. Fill in all fields. Make sure `slug` matches their URL (all lowercase, hyphens).

---

## C10. Program Detail Pages — How to Edit

All program content lives in the `ALL_PROGRAMS` array inside:
`/src/app/components/ProgramDetailPage.tsx`

```ts
{
  slug:          "morning-ritual-flow",
  title:         "Morning Ritual Flow",
  badge:         "Yoga & Movement",
  tagline:       "Short description...",
  heroImg:       imgP2044,            // swap import for a different photo
  introTitle:    "Section heading",
  introPara1:    "First paragraph...",
  introPara2:    "Second paragraph...",
  topicsHeading: "What You Will Experience",
  topics: [
    { title: "Sun Salutations", body: "Explanation..." },
  ],
  teachers: [
    { name: "Angela Carbone", title: "Yoga Teacher", photo: imgTeacher1, slug: "angela-carbone" },
  ],
}
```

---

## C11. Footer — Editing the Sitemap Links

Open `/src/app/components/ZenShared.tsx`.

Near the top of the `Footer` section, find the three arrays:

- `SITEMAP_EXPLORE` — the "Explore" column links
- `SITEMAP_RETREATS` — the "Retreats" column links
- `SITEMAP_PROGRAMS` — the "Programs" column links

Edit the `label` and `to` values to change what appears in the footer.

---

## C12. SVG Paths — What Are Those `svgPaths` Files?

Files like `svg-qtx3rc5tzi.ts` in `/src/imports/` are auto-generated by
Figma Make. They are just exported objects of SVG path string data.
**You do not need to edit these.** If you want to add a new icon, use
an SVG file directly or a library like `lucide-react` instead.

---

## C13. Quick-Reference Cheat Sheet

| Task                 | File to open                                                       |
| -------------------- | ------------------------------------------------------------------ |
| Change any page text | The page's `.tsx` file in `/src/app/components/`                   |
| Add a new page       | Create `.tsx` + add to `routes.tsx`                                |
| Edit navbar links    | `ZenShared.tsx` → `NAV_LINKS` array                                |
| Edit footer sitemap  | `ZenShared.tsx` → `SITEMAP_EXPLORE / _RETREATS / _PROGRAMS` arrays |
| Add/edit a teacher   | `TeacherProfilePage.tsx` → `TEACHERS` array                        |
| Add/edit a program   | `ProgramDetailPage.tsx` → `ALL_PROGRAMS` array                     |
| Add/edit a retreat   | `RetreatDetailPage.tsx` → `ALL_RETREATS` array                     |
| Change brand colours | Find `#c3dbc5`, `#074240`, `#f8f3ed`, etc. in any file             |
| Change fonts         | `fonts.css`                                                        |
| Replace hero images  | Change `figma:asset/...` imports → `../../assets/images/...`       |
| Replace body images  | Change `../../imports/...` path → `../../assets/images/...`        |
| Add a button         | Use `<GreenButton>` or `<OutlinedButton>` from `ZenShared`         |
| Link between pages   | Use `<Link to="/path">` from `react-router`                        |
| Publish changes live | `git add .` → `git commit -m "..."` → `git push`                   |

---

## C14. VS Code Setup Checklist

Run these commands after cloning the project:

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:5173)
npm run dev

# Build for production (outputs to /dist folder)
npm run build
```

**Recommended VS Code extensions:**

- **ESLint** — catches code errors
- **Prettier** — auto-formats code on save
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **GitLens** — visual Git history inside VS Code

---

_Last updated: April 2026_