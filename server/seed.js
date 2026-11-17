import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_MENU_ITEMS, INITIAL_SETTINGS } from '../src/data/initialMenu.ts';
import { INITIAL_BUFFET_MENUS } from '../src/data/buffetData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = {
  menu: INITIAL_MENU_ITEMS,
  settings: INITIAL_SETTINGS,
  buffets: INITIAL_BUFFET_MENUS,
  orders: []
};

const targetDir = path.join(__dirname, 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const targetPath = path.join(targetDir, 'store.json');
fs.writeFileSync(targetPath, JSON.stringify(store, null, 2), 'utf8');
console.log('Successfully created store.json with', store.menu.length, 'items');
