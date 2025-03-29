#!/usr/bin/env node

/**
 * This script directly imports and runs Next.js without relying on the CLI
 * It includes error handling for missing dependencies
 */

// Set environment variables
process.env.NODE_ENV = 'development';

// Try to load @next/env manually first to avoid the error
try {
  require('@next/env');
} catch (err) {
  console.warn('Warning: @next/env module not found. Attempting to continue anyway...');
  
  // Create a mock implementation of @next/env to prevent errors
  const path = require('path');
  const fs = require('fs');
  
  // Add the mock to the require cache
  require.cache[require.resolve('@next/env')] = {
    id: require.resolve('@next/env'),
    filename: require.resolve('@next/env'),
    loaded: true,
    exports: {
      loadEnvConfig: (dir, dev) => {
        console.log(`Mock loadEnvConfig called with dir=${dir}, dev=${dev}`);
        const envFiles = [
          path.join(dir, dev ? '.env.development.local' : '.env.production.local'),
          path.join(dir, '.env.local'),
          path.join(dir, dev ? '.env.development' : '.env.production'),
          path.join(dir, '.env')
        ];
        
        const loadedEnvFiles = [];
        const env = {};
        
        for (const envFile of envFiles) {
          try {
            if (fs.existsSync(envFile)) {
              const content = fs.readFileSync(envFile, 'utf8');
              const lines = content.split('\n');
              
              for (const line of lines) {
                const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                  const key = match[1];
                  let value = match[2] || '';
                  if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
                  }
                  env[key] = value;
                }
              }
              
              loadedEnvFiles.push(envFile);
            }
          } catch (err) {
            console.warn(`Error loading env file ${envFile}:`, err);
          }
        }
        
        return { loadedEnvFiles, env };
      }
    }
  };
}

async function startDev() {
  try {
    console.log('Starting Next.js development server directly...');
    
    // Dynamically import Next.js with error handling
    let next;
    try {
      next = require('next');
    } catch (err) {
      console.error('Failed to import Next.js:', err.message);
      console.log('Falling back to npx next dev...');
      
      const { spawn } = require('child_process');
      const nextProcess = spawn('npx', ['next', 'dev'], {
        stdio: 'inherit',
        shell: true
      });
      
      nextProcess.on('error', (err) => {
        console.error('Failed to start Next.js with npx:', err.message);
        process.exit(1);
      });
      
      return; // Exit this function and let the spawned process take over
    }
    
    // Create the Next.js app instance
    const app = next({
      dev: true,
      dir: process.cwd()
    });
    
    // Prepare the app
    await app.prepare();
    
    // Get the request handler
    const handle = app.getRequestHandler();
    
    // Create a simple HTTP server
    const { createServer } = require('http');
    const server = createServer((req, res) => {
      return handle(req, res);
    });
    
    // Listen on port 3000
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  } catch (error) {
    console.error('An error occurred starting the Next.js server:');
    console.error(error);
    
    // Try fallback method
    console.log('\nAttempting to start server using npx as fallback...');
    
    const { spawn } = require('child_process');
    const nextProcess = spawn('npx', ['next', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    
    nextProcess.on('error', (err) => {
      console.error('Failed to start Next.js with npx fallback:', err.message);
      process.exit(1);
    });
  }
}

startDev();
