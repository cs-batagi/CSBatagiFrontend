const { Compute } = require('@google-cloud/compute');
const fs = require('fs');
const path = require('path');

module.exports = class GcpManager {
  constructor() {
    // Path to the credentials file
    const credentialsPath = path.join(__dirname, '..', 'credentials.json');

    // Use environment variables if available, otherwise read from .gcp_parameters file
    if (process.env.VM_NAME && process.env.GCP_ZONE) {
      this.vmName = process.env.VM_NAME;
      this.zone = process.env.GCP_ZONE;
      console.log(`Using environment variables: VM_NAME=${this.vmName}, GCP_ZONE=${this.zone}`);
    } else {
      // Read GCP parameters from file as fallback
      const gcpParamsPath = path.join(__dirname, '..', '.gcp_parameters');
      const gcpParams = fs.readFileSync(gcpParamsPath, 'utf8')
        .split('\n')
        .filter(line => line.trim() !== '')
        .reduce((params, line) => {
          const [key, value] = line.split('=');
          params[key] = value;
          return params;
        }, {});

      this.vmName = gcpParams.GCP_VM_NAME;
      this.zone = gcpParams.GCP_ZONE;
      console.log(`Using .gcp_parameters file: VM_NAME=${this.vmName}, GCP_ZONE=${this.zone}`);
    }

    // Initialize the Compute client
    this.compute = new Compute({
      projectId: JSON.parse(fs.readFileSync(credentialsPath, 'utf8')).project_id,
      keyFilename: credentialsPath
    });
  }

  async startVm() {
    try {
      const zone = this.compute.zone(this.zone);
      const vm = zone.vm(this.vmName);

      console.log(`Starting VM: ${this.vmName} in zone: ${this.zone}`);

      // Start the VM
      const [operation] = await vm.start();

      // Wait for the operation to complete
      await operation.promise();

      console.log(`VM ${this.vmName} started successfully`);
      return { success: true, message: `VM ${this.vmName} started successfully` };
    } catch (error) {
      console.error('Error starting VM:', error);
      return { success: false, error: error.message };
    }
  }
}
