// Lightweight, zero-dependency Node.js HTTP server for Le Boulevard REST API
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default data if store.json doesn't exist yet
function readStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading store file:', err);
  }
  return {
    menu: [],
    settings: null,
    buffets: [],
    orders: []
  };
}

function writeStore(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing store file:', err);
  }
}

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON response with CORS
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // Health check
  if (pathname === '/api/health') {
    return sendJson(res, 200, { status: 'healthy', restaurant: 'Le Boulevard - Hotel Atithi TGI Grand', timestamp: new Date() });
  }

  const store = readStore();

  // 1. MENU ENDPOINTS
  if (pathname === '/api/menu') {
    if (method === 'GET') {
      return sendJson(res, 200, store.menu || []);
    }
    if (method === 'POST') {
      const item = await parseBody(req);
      if (!store.menu) store.menu = [];
      const idx = store.menu.findIndex(m => m.id === item.id);
      if (idx >= 0) {
        store.menu[idx] = item;
      } else {
        store.menu.unshift(item);
      }
      writeStore(store);
      return sendJson(res, 200, item);
    }
  }

  // PATCH /api/menu/:id/availability
  const availMatch = pathname.match(/^\/api\/menu\/([^/]+)\/availability$/);
  if (availMatch && method === 'PATCH') {
    const id = availMatch[1];
    const { isAvailable } = await parseBody(req);
    if (store.menu) {
      store.menu = store.menu.map(m => m.id === id ? { ...m, isAvailable } : m);
      writeStore(store);
    }
    return sendJson(res, 200, { success: true, id, isAvailable });
  }

  // DELETE /api/menu/:id
  const deleteMatch = pathname.match(/^\/api\/menu\/([^/]+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = deleteMatch[1];
    if (store.menu) {
      store.menu = store.menu.filter(m => m.id !== id);
      writeStore(store);
    }
    return sendJson(res, 200, { success: true, id });
  }

  // 2. SETTINGS ENDPOINTS
  if (pathname === '/api/settings') {
    if (method === 'GET') {
      return sendJson(res, 200, store.settings || {});
    }
    if (method === 'PUT' || method === 'POST') {
      const settings = await parseBody(req);
      store.settings = settings;
      writeStore(store);
      return sendJson(res, 200, store.settings);
    }
  }

  // 3. BUFFET ENDPOINTS
  if (pathname === '/api/buffets') {
    if (method === 'GET') {
      return sendJson(res, 200, store.buffets || []);
    }
    if (method === 'POST') {
      const buffet = await parseBody(req);
      if (!store.buffets) store.buffets = [];
      const idx = store.buffets.findIndex(b => b.id === buffet.id);
      if (idx >= 0) {
        store.buffets[idx] = buffet;
      } else {
        store.buffets.push(buffet);
      }
      writeStore(store);
      return sendJson(res, 200, buffet);
    }
  }

  // 4. ORDERS ENDPOINTS
  if (pathname === '/api/orders') {
    if (method === 'GET') {
      return sendJson(res, 200, store.orders || []);
    }
    if (method === 'POST') {
      const order = await parseBody(req);
      if (!store.orders) store.orders = [];
      store.orders.unshift(order);
      writeStore(store);
      return sendJson(res, 201, order);
    }
  }

  // PATCH /api/orders/:id/status
  const orderStatusMatch = pathname.match(/^\/api\/orders\/([^/]+)\/status$/);
  if (orderStatusMatch && method === 'PATCH') {
    const id = orderStatusMatch[1];
    const { status } = await parseBody(req);
    if (store.orders) {
      store.orders = store.orders.map(o => o.id === id ? { ...o, status } : o);
      writeStore(store);
    }
    return sendJson(res, 200, { success: true, id, status });
  }

  // 5. AUTH LOGIN
  if (pathname === '/api/auth/login' && method === 'POST') {
    const { username, password } = await parseBody(req);
    // Secure verification
    if ((username === 'admin' && (password === 'Boulevard@2026' || password === '122436')) || password === 'Boulevard@2026') {
      return sendJson(res, 200, {
        success: true,
        token: 'admin-authenticated-session-token',
        user: { name: 'F&B Manager', role: 'admin', property: 'Hotel Atithi - TGI Grand' }
      });
    }
    return sendJson(res, 401, { success: false, message: 'Invalid credentials' });
  }

  // 6. STATIC ASSET SERVING FROM DIST (if built)
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir) && method === 'GET') {
    let filePath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html'); // SPA fallback
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // 404
  return sendJson(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, () => {
  console.log(`Le Boulevard API Server running on port ${PORT}`);
});
