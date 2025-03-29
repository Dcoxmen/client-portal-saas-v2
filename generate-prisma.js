#!/usr/bin/env node

/**
 * This script generates the Prisma client
 * It's useful when you encounter the error:
 * "@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again."
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Generating Prisma client...');

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

async function main() {
  try {
    // Check if prisma schema exists
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    if (!fs.existsSync(schemaPath)) {
      console.error('Error: Prisma schema not found at', schemaPath);
      console.log('Make sure you are running this script from the project root directory.');
      process.exit(1);
    }
    
    // Generate Prisma client
    await runCommand('npx', ['prisma', 'generate']);
    
    console.log('\n✅ Prisma client generated successfully!');
    console.log('\nYou can now run the development server using one of the methods in START_SERVER_INSTRUCTIONS.md');
  } catch (err) {
    console.error('Error generating Prisma client:', err.message);
    process.exit(1);
  }
}

main();
