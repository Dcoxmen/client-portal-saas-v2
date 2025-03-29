#!/usr/bin/env node

/**
 * This script attempts to start the Next.js development server using multiple methods
 * It will try each method in sequence until one succeeds
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Attempting to start Next.js development server using multiple methods...');

// Define the methods to try in order of preference
const methods = [
  {
    name: 'Direct API Method',
    command: 'node',
    args: ['direct-start.js'],
    description: 'Using Next.js API directly'
  },
  {
    name: 'NPX Method',
    command: 'npx',
    args: ['next', 'dev'],
    description: 'Using npx to run Next.js CLI'
  },
  {
    name: 'Custom Script Method',
    command: 'node',
    args: ['start-dev.js'],
    description: 'Using custom script to find Next.js binary'
  },
  {
    name: 'Node Modules Path Method',
    command: 'node',
    args: ['./node_modules/next/dist/bin/next', 'dev'],
    description: 'Using direct path to Next.js binary'
  }
];

// Try each method in sequence
async function tryMethods() {
  // First, try to generate Prisma client
  console.log('\n=== Generating Prisma client ===');
  try {
    console.log('Running prisma generate...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Prisma client generated successfully');
  } catch (err) {
    console.log(`Error generating Prisma client: ${err.message}`);
    console.log('Continuing anyway...');
  }

  for (const method of methods) {
    console.log(`\n[${method.name}] Trying to start server: ${method.description}`);
    
    try {
      // Check if the command exists
      if (method.command === 'node' && method.args[0].includes('node_modules')) {
        const binPath = path.resolve(process.cwd(), method.args[0]);
        if (!fs.existsSync(binPath)) {
          console.log(`[${method.name}] Binary not found at ${binPath}, skipping...`);
          continue;
        }
      }
      
      // Start the process
      const serverProcess = spawn(method.command, method.args, {
        stdio: 'inherit',
        shell: true
      });
      
      // Wait for the process to start or fail
      await new Promise((resolve, reject) => {
        serverProcess.on('error', (err) => {
          console.log(`[${method.name}] Failed to start: ${err.message}`);
          resolve(false);
        });
        
        // Give it some time to start
        setTimeout(() => {
          // Check if the server is running on port 3000
          try {
            const netstat = execSync('netstat -ano | findstr :3000').toString();
            if (netstat.includes('LISTENING')) {
              console.log(`[${method.name}] Server successfully started!`);
              resolve(true);
            } else {
              console.log(`[${method.name}] Server not listening on port 3000`);
              resolve(false);
            }
          } catch (err) {
            console.log(`[${method.name}] Server not detected on port 3000`);
            resolve(false);
          }
        }, 5000);
      });
      
      // If we're here and the process is still running, it worked!
      console.log(`\n✅ Server started successfully using ${method.name}!`);
      console.log('> Ready on http://localhost:3000');
      
      // Keep the script running
      process.stdin.resume();
      return;
    } catch (err) {
      console.log(`[${method.name}] Error: ${err.message}`);
    }
  }
  
  // If we get here, all methods failed
  console.log('\n❌ All methods failed to start the server.');
  console.log('Please check the error messages above and try to resolve the issues.');
  console.log('You may need to reinstall dependencies or check your Node.js installation.');
}

tryMethods();
