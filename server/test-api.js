import http from 'node:http';

// Test health endpoint
const req = http.get('http://localhost:3001/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('API Status:', res.statusCode);
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.log('Connection failed (server might not be running yet):', err.message);
  process.exit(1);
});
