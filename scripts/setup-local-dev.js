#!/usr/bin/env node

/**
 * This script sets up the local development environment by creating a local copy
 * of the firebase-messaging-sw.js file with the actual Firebase configuration.
 * 
 * Usage:
 * 1. Create a .env file in the project root with your Firebase configuration
 * 2. Run this script: node scripts/setup-local-dev.js
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Check if required environment variables are set
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Error: The following environment variables are missing:');
  missingVars.forEach(varName => console.error(`  - ${varName}`));
  console.error('\nPlease create a .env file in the project root with these variables.');
  process.exit(1);
}

// Read the template file
const templatePath = path.join(__dirname, '..', 'firebase-messaging-sw.js');
let content = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders with actual values
content = content
  .replace(/__FIREBASE_API_KEY__/g, process.env.FIREBASE_API_KEY)
  .replace(/__FIREBASE_AUTH_DOMAIN__/g, process.env.FIREBASE_AUTH_DOMAIN)
  .replace(/__FIREBASE_PROJECT_ID__/g, process.env.FIREBASE_PROJECT_ID)
  .replace(/__FIREBASE_MESSAGING_SENDER_ID__/g, process.env.FIREBASE_MESSAGING_SENDER_ID)
  .replace(/__FIREBASE_APP_ID__/g, process.env.FIREBASE_APP_ID);

// Write the local development file
const localFilePath = path.join(__dirname, '..', 'firebase-messaging-sw.local.js');
fs.writeFileSync(localFilePath, content);

console.log(`Local development file created at: ${localFilePath}`);
console.log('To use this file for local development, rename it to firebase-messaging-sw.js');
console.log('WARNING: Do not commit the local development file to the repository!');