import net from 'net';
import { exec } from 'child_process';
import { config } from '../config.js';

// Function to check if a port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    server.on('error', () => {
      resolve(false);
    });
  });
};

// Function to find an available port starting from a given port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (port < 65535) {
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }
  throw new Error('No available ports found');
};

// Function to kill processes on specific ports
const killProcessOnPort = async (port) => {
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4) {
            const pid = parts[4];
            if (pid && !isNaN(pid)) {
              exec(`taskkill /PID ${pid} /F`, (killError) => {
                if (!killError) {
                  console.log(`✅ Killed process ${pid} on port ${port}`);
                }
              });
            }
          }
        });
      }
      resolve();
    });
  });
};

// Function to setup ports with conflict resolution
export const setupPorts = async () => {
  console.log('🔍 Checking port availability...');
  
  // Check backend port
  let backendPort = config.backend.port;
  if (!(await isPortAvailable(backendPort))) {
    console.log(`⚠️  Port ${backendPort} is in use, finding available port...`);
    await killProcessOnPort(backendPort);
    
    // Wait a moment for the process to be killed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!(await isPortAvailable(backendPort))) {
      backendPort = await findAvailablePort(backendPort);
      console.log(`✅ Found available backend port: ${backendPort}`);
    }
  }
  
  // Check frontend port
  let frontendPort = config.frontend.port;
  if (!(await isPortAvailable(frontendPort))) {
    console.log(`⚠️  Port ${frontendPort} is in use, finding available port...`);
    await killProcessOnPort(frontendPort);
    
    // Wait a moment for the process to be killed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!(await isPortAvailable(frontendPort))) {
      frontendPort = await findAvailablePort(frontendPort);
      console.log(`✅ Found available frontend port: ${frontendPort}`);
    }
  }
  
  return {
    backendPort,
    frontendPort,
    backendUrl: `http://127.0.0.1:${backendPort}`,
    frontendUrl: `http://localhost:${frontendPort}`
  };
};

// Function to display current port status
export const showPortStatus = async () => {
  console.log('\n📊 Port Status:');
  console.log('================');
  
  const backendAvailable = await isPortAvailable(config.backend.port);
  const frontendAvailable = await isPortAvailable(config.frontend.port);
  
  console.log(`Backend Port ${config.backend.port}: ${backendAvailable ? '✅ Available' : '❌ In Use'}`);
  console.log(`Frontend Port ${config.frontend.port}: ${frontendAvailable ? '✅ Available' : '❌ In Use'}`);
  
  if (!backendAvailable || !frontendAvailable) {
    console.log('\n🛠️  Running port conflict resolution...');
    const ports = await setupPorts();
    console.log('\n✅ Ports resolved:');
    console.log(`Backend: ${ports.backendUrl}`);
    console.log(`Frontend: ${ports.frontendUrl}`);
  }
  
  console.log('================\n');
};

// Run if this script is executed directly
if (process.argv[1].includes('port-manager.js')) {
  showPortStatus();
}
