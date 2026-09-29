# Igloo Himalaya Treks

Official web application for **Igloo Himalaya Treks** — premier Himalayan trekking, expedition, and adventure tours in Nepal.

---

## 🚀 Quick Start

This project requires **Node.js** (v16+). No extra dependencies or heavy downloads needed!

### Start Development Server
```bash
npm run dev
```
Or:
```bash
npm start
```

This launches the local development server at:
- **Local:** `http://localhost:3000/`
- **Network:** `http://<your-lan-ip>:3000/`

### Automatically Open in Browser
```bash
npm run open
```

---

## ✨ Features of the Dev Server (`server.js`)

- **Instant Zero-Dependency Startup**: Runs directly on Node's native HTTP module without waiting for heavy `node_modules`.
- **Live Reload**: Automatically refreshes open browser tabs when `.html`, `.css`, or `.js` files are edited.
- **Clean URL Routing**: Resolves extensionless URLs (e.g. `/about`, `/nepal-travel-guide`, `/trek/everest-base-camp-trek`) seamlessly to their respective HTML files.
- **Streaming Media Support**: Supports HTTP 206 partial content range requests for smooth MP4/WebM video playback.
- **Smart Port Detection**: If port 3000 is occupied, automatically shifts to the next available port (e.g., 3001, 3002).
- **Full MIME Coverage**: Proper Content-Type headers for ES Modules (`text/javascript`), WebP, SVG, and web fonts.
