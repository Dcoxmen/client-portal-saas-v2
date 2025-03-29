#!/usr/bin/env node

/**
 * This script attempts to fix the Next.js installation issues and run the development server
 * It will:
 * 1. Install missing dependencies
 * 2. Try multiple methods to start the server
 */

const { spawn, execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting comprehensive Next.js fix and run script...');

// Function to run a command and return a promise
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    child.on('error', (err) => {
      reject(err);
    });
  });
}

// Function to check if a module exists
function moduleExists(moduleName) {
  try {
    require.resolve(moduleName);
    return true;
  } catch (err) {
    return false;
  }
}

// Function to check if the server is running
function checkServer() {
  return new Promise((resolve) => {
    const req = require('http').get('http://localhost:3000', (res) => {
      console.log(`Server is running! Status code: ${res.statusCode}`);
      resolve(true);
    }).on('error', () => {
      console.log('Server is not running');
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Main function
async function main() {
  try {
    // Step 1: Check for missing dependencies
    console.log('\n=== Step 1: Checking for missing dependencies ===');
    
    const missingDeps = [];
    
    if (!moduleExists('next')) {
      missingDeps.push('next@14.2.5');
    }
    
    if (!moduleExists('@next/env')) {
      missingDeps.push('@next/env@14.2.5');
    }
    
    if (missingDeps.length > 0) {
      console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
      await runCommand('npm', ['install', '--save', ...missingDeps]);
    } else {
      console.log('All required dependencies are installed');
    }
    
    // Step 1.5: Generate Prisma client
    console.log('\n=== Step 1.5: Generating Prisma client ===');
    try {
      console.log('Running prisma generate...');
      await runCommand('npx', ['prisma', 'generate']);
      console.log('Prisma client generated successfully');
    } catch (err) {
      console.log(`Error generating Prisma client: ${err.message}`);
      console.log('Continuing anyway...');
    }
    
    // Step 2: Try to start the server using multiple methods
    console.log('\n=== Step 2: Attempting to start the server ===');
    
    // Method 1: Try npx next dev
    console.log('\nMethod 1: Using npx next dev');
    try {
      const serverProcess = spawn('npx', ['next', 'dev'], {
        stdio: 'inherit',
        shell: true,
        detached: true
      });
      
      // Give it some time to start
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check if the server is running
      const isRunning = await checkServer();
      
      if (isRunning) {
        console.log('\n✅ Server started successfully using npx next dev!');
        console.log('> Ready on http://localhost:3000');
        
        // Keep the script running
        process.stdin.resume();
        return;
      } else {
        console.log('Server did not start with npx next dev, trying next method...');
        // Kill the process if it's still running
        try {
          process.kill(-serverProcess.pid);
        } catch (err) {
          // Ignore errors
        }
      }
    } catch (err) {
      console.log(`Error with npx next dev: ${err.message}`);
    }
    
    // Method 2: Try direct-start.js
    console.log('\nMethod 2: Using direct-start.js');
    try {
      const serverProcess = spawn('node', ['direct-start.js'], {
        stdio: 'inherit',
        shell: true,
        detached: true
      });
      
      // Give it some time to start
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check if the server is running
      const isRunning = await checkServer();
      
      if (isRunning) {
        console.log('\n✅ Server started successfully using direct-start.js!');
        console.log('> Ready on http://localhost:3000');
        
        // Keep the script running
        process.stdin.resume();
        return;
      } else {
        console.log('Server did not start with direct-start.js, trying next method...');
        // Kill the process if it's still running
        try {
          process.kill(-serverProcess.pid);
        } catch (err) {
          // Ignore errors
        }
      }
    } catch (err) {
      console.log(`Error with direct-start.js: ${err.message}`);
    }
    
    // Method 3: Try node_modules/.bin/next
    console.log('\nMethod 3: Using node_modules/.bin/next');
    try {
      const nextBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'next');
      
      if (fs.existsSync(nextBinPath)) {
        const serverProcess = spawn(nextBinPath, ['dev'], {
          stdio: 'inherit',
          shell: true,
          detached: true
        });
        
        // Give it some time to start
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Check if the server is running
        const isRunning = await checkServer();
        
        if (isRunning) {
          console.log('\n✅ Server started successfully using node_modules/.bin/next!');
          console.log('> Ready on http://localhost:3000');
          
          // Keep the script running
          process.stdin.resume();
          return;
        } else {
          console.log('Server did not start with node_modules/.bin/next, trying next method...');
          // Kill the process if it's still running
          try {
            process.kill(-serverProcess.pid);
          } catch (err) {
            // Ignore errors
          }
        }
      } else {
        console.log('next binary not found in node_modules/.bin, skipping this method');
      }
    } catch (err) {
      console.log(`Error with node_modules/.bin/next: ${err.message}`);
    }
    
    // Method 4: Try reinstalling everything
    console.log('\nMethod 4: Reinstalling all dependencies');
    try {
      console.log('Removing node_modules directory...');
      try {
        fs.rmSync('node_modules', { recursive: true, force: true });
      } catch (err) {
        console.log(`Error removing node_modules: ${err.message}`);
      }
      
      console.log('Removing package-lock.json...');
      try {
        if (fs.existsSync('package-lock.json')) {
          fs.unlinkSync('package-lock.json');
        }
      } catch (err) {
        console.log(`Error removing package-lock.json: ${err.message}`);
      }
      
      console.log('Installing dependencies...');
      await runCommand('npm', ['install']);
      
      console.log('Starting server with npx next dev...');
      const serverProcess = spawn('npx', ['next', 'dev'], {
        stdio: 'inherit',
        shell: true
      });
      
      // Keep the script running
      process.stdin.resume();
    } catch (err) {
      console.log(`Error with reinstallation: ${err.message}`);
      console.log('\n❌ All methods failed to start the server.');
      console.log('Please check the error messages above and try to resolve the issues.');
    }
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  }
}

main();
