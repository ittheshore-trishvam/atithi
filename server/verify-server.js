import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import server logic
import './index.js';

// Wait 500ms then probe endpoints
setTimeout(async () => {
  const endpoints = ['/api/health', '/api/menu', '/api/settings', '/api/buffets', '/api/orders'];

  for (const ep of endpoints) {
    await new Promise((resolve, reject) => {
      http.get(`http://localhost:3001${ep}`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`Endpoint ${ep} => HTTP ${res.statusCode} (length: ${body.length})`);
          if (res.statusCode !== 200) reject(new Error(`Failed ${ep}`));
          resolve();
        });
      }).on('error', reject);
    });
  }

  console.log('ALL API ENDPOINTS TESTED AND VERIFIED WORKING!');
  process.exit(0);
}, 600);
