const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Helper to send JSON responses (mimicking Vercel's res.json)
function decorateResponse(res) {
  res.status = function(statusCode) {
    res.statusCode = statusCode;
    return res;
  };
  res.json = function(data) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return res;
  };
}

const server = http.createServer((req, res) => {
  decorateResponse(res);
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // 1. API Route handling
  if (pathname.startsWith('/api')) {
    // Standard Vercel API routing structure
    let modulePath = '';
    
    if (pathname === '/api/auth/register') {
      modulePath = './api/auth/register.js';
    } else if (pathname === '/api/auth/login') {
      modulePath = './api/auth/login.js';
    } else if (pathname === '/api/applications/create') {
      modulePath = './api/applications/create.js';
    } else if (pathname === '/api/applications/track') {
      modulePath = './api/applications/track.js';
    } else if (pathname === '/api/applications/list') {
      modulePath = './api/applications/list.js';
    } else if (pathname === '/api/applications/message') {
      modulePath = './api/applications/message.js';
    } else if (pathname === '/api/admin/dashboard') {
      modulePath = './api/admin/dashboard.js';
    } else if (pathname === '/api/admin/update') {
      modulePath = './api/admin/update.js';
    } else if (pathname === '/api/upload') {
      modulePath = './api/upload.js';
    }

    if (modulePath) {
      // Parse request body for POST/PUT requests
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          req.body = body ? JSON.parse(body) : {};
        } catch (e) {
          req.body = {};
        }
        
        req.query = parsedUrl.query;

        try {
          // Clear require cache for easy development updates
          delete require.cache[require.resolve(modulePath)];
          const handler = require(modulePath);
          await handler(req, res);
        } catch (err) {
          console.error(`API route error on ${pathname}:`, err);
          res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
      });
    } else {
      res.status(404).json({ error: 'API route not found' });
    }
    return;
  }

  // 2. Static Files Handling
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, 'public', pathname);
  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File Not Found');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`NDS Platform running locally at http://localhost:${PORT}`);
  console.log('You can now log in using the Admin account details from schema.sql');
});
