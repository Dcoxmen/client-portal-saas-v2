#!/usr/bin/env node

/**
 * This is a custom script to start the Next.js development server
 * It's designed to work around path resolution issues that can occur with npm scripts
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the absolute path to the next binary
const nextBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'next');
const nextDistPath = path.resolve(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');

// Check which path exists and use that
let execPath;
if (fs.existsSync(nextBinPath)) {
  console.log('Using Next.js binary from node_modules/.bin');
  execPath = nextBinPath;
} else if (fs.existsSync(nextDistPath)) {
  console.log('Using Next.js binary from node_modules/next/dist/bin');
  execPath = nextDistPath;
} else {
  console.log('Next.js binary not found, trying to use npx');
  execPath = 'npx';
}

// Start the Next.js development server
const args = execPath === 'npx' ? ['next', 'dev'] : ['dev'];
const nextProcess = spawn(execPath, args, {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js development server:', err);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js development server exited with code ${code}`);
});
