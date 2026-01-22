
# ⚪ SanjanaLite: Studio Edition

**SanjanaLite** is an ultra-lightweight, high-fidelity micro-CMS built for professionals who demand minimalist aesthetics (Cupertino-inspired) and zero-dependency deployments. It operates on a "No-API" architecture, utilizing browser-native persistence for standalone instances.

---

## 🛠 Technology Stack

- **Frontend:** React 19 (ESM) + Tailwind CSS.
- **AI Engine:** Google Gemini 2.0 (Optional SEO/Content features).
- **Architecture:** Hash-based SPA with `sessionStorage` gatekeeping.
- **Persistence:** JSON-Schema based `localStorage` synchronization.
- **Deployment:** Nginx Alpine (Multi-stage Docker support).

---

## 🚀 Installation & Deployment

### 1. Linux (Bare Metal / Ubuntu / Debian)
To run this on a standard Linux server, you need `Node.js` and `Nginx`.

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Build the application (Local Machine or Server)
npm install
npm run build

# Copy build files to Nginx web root
sudo cp -r dist/* /var/www/html/

# Configure Nginx for SPA routing
sudo nano /etc/nginx/sites-available/default
```
*In the Nginx config, ensure `try_files $uri $uri/ /index.html;` is present inside the `location /` block.*

### 2. LXC Container (Proxmox / Ubuntu)
For a clean LXC environment, follow these steps inside the container:

```bash
# Step 1: Install dependencies
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Step 2: Clone and Setup
git clone <your-repo-url> /opt/sanjanalite
cd /opt/sanjanalite
npm install
npm run build

# Step 3: Link to Nginx
sudo rm /var/www/html/index.nginx-debian.html
sudo ln -s /opt/sanjanalite/dist/* /var/www/html/

# Step 4: Restart Service
sudo systemctl restart nginx
```

### 3. Docker (The Easiest Way)
```bash
docker-compose up -d --build
```

---

## 🛡 Security Protocol

- **Passcode Access:** The `/admin` portal is protected by a local cryptographic hash established during the **Setup Wizard**.
- **Data Privacy:** 100% of your content remains in the browser/container. No external database calls are made unless you utilize the Gemini AI SEO features.
- **CSRF Protection:** Native hash-routing prevents traditional cross-site request forgery.

---

## 🤖 AI Integration
To enable AI-assisted SEO and content generation:
1. Obtain an API Key from [Google AI Studio](https://aistudio.google.com/).
2. Add it to your environment variables or the `.env` file as `API_KEY`.
3. The "Suggest SEO" buttons in the Studio will automatically activate.

---

## 📝 Maintenance
To reset the entire instance and start fresh, navigate to **Settings** in the Admin Panel and select **"Force Database Cleanup"**. This will purge all local content and restart the Setup Wizard.
