// Production-Ready Native Node.js Server for Le Boulevard
// Runs directly with: node server.js (NO Vite, NO npm run dev)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');
const HTML_FILE = path.join(__dirname, 'index.html');

function readStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading store file:', err);
  }
  return { menu: [], settings: null, buffets: [], orders: [] };
}

function writeStore(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing store file:', err);
  }
}

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

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // Health check
  if (pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'healthy',
      restaurant: 'Le Boulevard - Hotel Atithi TGI Grand',
      engine: 'Native Node.js Server (No Vite)',
      timestamp: new Date()
    });
  }

  const store = readStore();

  // 1. MENU API
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

  const deleteMatch = pathname.match(/^\/api\/menu\/([^/]+)$/);
  if (deleteMatch && method === 'DELETE') {
    const id = deleteMatch[1];
    if (store.menu) {
      store.menu = store.menu.filter(m => m.id !== id);
      writeStore(store);
    }
    return sendJson(res, 200, { success: true, id });
  }

  // 2. SETTINGS API
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

  // 3. BUFFET API
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

  // 4. ORDERS API
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
    if ((username === 'admin' && (password === 'Boulevard@2026' || password === '122436')) || password === 'Boulevard@2026') {
      return sendJson(res, 200, {
        success: true,
        token: 'admin-authenticated-session-token',
        user: { name: 'F&B Manager', role: 'admin', property: 'Hotel Atithi - TGI Grand' }
      });
    }
    return sendJson(res, 401, { success: false, message: 'Invalid credentials' });
  }

  // 6. SERVE STANDALONE FRONTEND (index.html)
  if (method === 'GET' && (pathname === '/' || pathname === '/index.html' || !pathname.startsWith('/api'))) {
    if (fs.existsSync(HTML_FILE)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(HTML_FILE).pipe(res);
    }
  }

  return sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  LE BOULEVARD — DIGITAL RESTAURANT MENU`);
  console.log(`  Hotel Atithi - TGI Grand, Puducherry, India`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`  Native Standalone Server (No Vite, No dev server)`);
  console.log(`=======================================================`);
});
