@echo off
echo Generating Prisma client...
cd %~dp0
node generate-prisma.js
