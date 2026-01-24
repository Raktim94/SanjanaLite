# ⚪ SanjanaLite: Studio Edition

**SanjanaLite** is an ultra-lightweight, high-fidelity micro‑CMS built for professionals who value minimalist (Cupertino‑inspired) design, zero backend dependencies, and full control over content. It is intentionally backend‑less and database‑free, relying on browser‑native storage and static deployment.

This project is designed to run **anywhere** — bare metal Linux, LXC containers, Docker, CasaOS, or simple Nginx hosting.

---

## ✨ Key Principles

* Minimalist, distraction‑free CMS
* No database, no API, no server logic
* Offline‑capable after deployment
* Human‑written content first
* Extremely low attack surface

---

## 🛠 Technology Stack

* **Frontend:** React 19 (ESM)
* **Styling:** Tailwind CSS
* **Architecture:** Hash‑based SPA
* **Admin Security:** `sessionStorage` gate
* **Persistence:** JSON‑schema based `localStorage`
* **Web Server:** Nginx
* **Container Support:** Docker & CasaOS compatible

---

## 📦 Repository

```
https://github.com/Raktim94/SanjanaLite.git
```

---

## 🚀 Installation & Deployment

Below are **all possible installation methods**, including `sudo`‑based setups.

---

## 1️⃣ Linux (Ubuntu / Debian / Bare Metal)

### 🔧 System Preparation

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx software-properties-common
```

---

### 🔧 Install Node.js (v20 LTS – Recommended)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

### 📥 Clone Repository

```bash
git clone https://github.com/Raktim94/SanjanaLite.git
cd SanjanaLite
```

---

### 📦 Install Project Dependencies

```bash
sudo npm install
```

*(sudo is safe here for global permissions on minimal servers)*

---

### 🏗 Build Production Files

```bash
sudo npm run build
```

This generates the `dist/` directory.

---

### 🌐 Deploy to Nginx

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

---

### ⚙️ Configure Nginx for SPA

Edit default config:

```bash
sudo nano /etc/nginx/sites-available/default
```

Inside `server {}` → `location /` add:

```
try_files $uri $uri/ /index.html;
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

✅ SanjanaLite is now live.

---

## 2️⃣ LXC Container (Proxmox / Ubuntu LXC)

```bash
sudo apt update
sudo apt install -y curl git nginx

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

git clone https://github.com/Raktim94/sanjanalt.git /opt/sanjanalite
cd /opt/sanjanalite

sudo npm install
sudo npm run build

sudo rm -f /var/www/html/index.nginx-debian.html
sudo ln -s /opt/sanjanalite/dist/* /var/www/html/

sudo systemctl restart nginx
```

---

## 3️⃣ Docker (Recommended)

### 🔧 Requirements

* Docker
* Docker Compose

Install Docker:

```bash
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
```

---

### ▶ Run SanjanaLite

```bash
git clone https://github.com/Raktim94/sanjanalt.git
cd sanjanalt
sudo docker compose up -d --build
```

Access:

```
http://localhost
```

---

## 🔐 Security Model

* `/admin` protected by local cryptographic hash
* No cookies used
* No server‑side sessions
* No database
* Hash‑based routing prevents CSRF

---

## 🧹 Reset & Maintenance

To fully reset the CMS:

1. Go to **Admin → Settings**
2. Click **Force Database Cleanup**
3. Reload page

This removes all content and admin credentials.

---

## 📁 Project Structure

```
sanjanalt/
├── src/
│   ├── admin/
│   ├── blocks/
│   ├── components/
│   └── core/
├── public/
├── dist/          # production build
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

## 📜 License

MIT License

---

## 👤 Author

**Raktim Ranjit**
Minimal systems. Maximum control.

---

## ⭐ Status

Early‑stage Studio Edition (v0.1)

Contributions, forks, and audits are welcome.
