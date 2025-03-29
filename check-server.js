#!/usr/bin/env node

/**
 * This script checks if the Next.js development server is running
 * It attempts to connect to localhost:3000 and reports the result
 */

const http = require('http');

console.log('Checking if Next.js development server is running on http://localhost:3000...');

const req = http.get('http://localhost:3000', (res) => {
  console.log(`\n✅ Server is running!`);
  console.log(`Status code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data`);
  });
  
  res.on('end', () => {
    console.log('Response ended');
    process.exit(0);
  });
}).on('error', (err) => {
  console.log(`\n❌ Server is not running: ${err.message}`);
  console.log('\nPossible reasons:');
  console.log('1. The server has not been started');
  console.log('2. The server is running on a different port');
  console.log('3. There is a network issue');
  console.log('\nTry running one of the following commands:');
  console.log('- npm run dev');
  console.log('- npx next dev');
  console.log('- node direct-start.js');
  console.log('- node try-all-methods.js');
  process.exit(1);
});

req.on('timeout', () => {
  console.log('\n❌ Request timed out');
  req.destroy();
  process.exit(1);
});

// Set a timeout of 5 seconds
req.setTimeout(5000);
