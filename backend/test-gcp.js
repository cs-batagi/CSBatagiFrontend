// Simple test script to verify that GcpManager can be instantiated without errors
const GcpManager = require('./gcp.js');

try {
  console.log('Creating GcpManager instance...');
  const gcpManager = new GcpManager();
  console.log('GcpManager instance created successfully!');
  console.log('This confirms that the "Compute is not a constructor" error has been fixed.');
} catch (error) {
  console.error('Error creating GcpManager instance:', error);
}