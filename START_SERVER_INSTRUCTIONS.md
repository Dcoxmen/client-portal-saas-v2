# How to Start the Development Server

This document provides multiple methods to start the Next.js development server, addressing potential issues with the standard `npm run dev` command.

## RECOMMENDED: Comprehensive Fix and Run Script

```bash
cd client-portal-saas
node fix-and-run.js
```

Or simply double-click the `fix-and-run.bat` file in Windows Explorer.

This script provides the most comprehensive solution:
1. Checks for and installs missing dependencies
2. Tries multiple methods to start the server
3. Automatically falls back to alternative methods if one fails
4. Performs a complete reinstallation if necessary

This is the recommended approach as it combines all other methods and includes additional fixes for common issues.

## Alternative Methods

If you prefer to try a specific method, you can use one of the following:

### Method 1: Automatic Method Finder

```bash
cd client-portal-saas
node try-all-methods.js
```

Or double-click the `try-all-methods.bat` file in Windows Explorer.

This script will automatically try all available methods to start the Next.js development server in sequence until one succeeds.

```bash
# Using npm script
npm run dev:auto
```

### Method 2: Using the Direct Start Method

```bash
cd client-portal-saas
node direct-start.js
```

Or double-click the `direct-start.bat` file in Windows Explorer.

This method bypasses the Next.js CLI entirely and uses the Next.js API directly to start the development server. It includes error handling for missing dependencies.

```bash
# Using npm script
npm run dev:direct
```

### Method 3: Using NPX Directly

```bash
cd client-portal-saas
npx next dev
```

Or double-click the `start-with-npx.bat` file in Windows Explorer.

This method uses NPX to directly run the Next.js CLI without relying on the local installation.

```bash
# Using npm script
npm run dev
```

### Method 4: Using the Custom Start Script

```bash
cd client-portal-saas
node start-dev.js
```

Or double-click the `start-dev.bat` file in Windows Explorer.

This script attempts to locate the Next.js binary in various locations and uses the first one it finds.

```bash
# Using npm script
npm run dev:custom
```

### Method 5: Using Direct Node Modules Path

```bash
cd client-portal-saas
node ./node_modules/next/dist/bin/next dev
```

This method tries to directly execute the Next.js binary from its location in the node_modules directory.

```bash
# Using npm script
npm run dev:alt
```

## Troubleshooting

If you're still experiencing issues after trying all methods:

1. **Prisma Client Generation**: If you see errors related to Prisma, generate the Prisma client:
   ```bash
   cd client-portal-saas
   npx prisma generate
   ```
   The `fix-and-run.js` script should handle this automatically, but you can run it manually if needed.

2. **Missing Dependencies**: The most common issue is missing dependencies. The `fix-and-run.js` script should handle this automatically, but you can also manually install them:
   ```bash
   npm install @next/env@14.2.5
   ```

3. **Clean Installation**: Try a complete reinstallation:
   ```bash
   cd client-portal-saas
   rm -rf node_modules
   rm package-lock.json
   npm install
   npx prisma generate
   ```

4. **Node.js Version**: Make sure Node.js is installed and up to date (version 18.x or later recommended)

5. **Permission Issues**: Check if there are any permission issues in your project directory

6. **Global Installation**: Try installing Next.js globally:
   ```bash
   npm install -g next
   ```

7. **Check Server Status**: Use the check-server.js script to verify if the server is running:
   ```bash
   node check-server.js
   ```
   Or use the npm script:
   ```bash
   npm run check-server
   ```

## Additional Notes

- The development server will run on http://localhost:3000
- Any changes to your code will be hot-reloaded automatically
- Check the console for any error messages if the server fails to start
