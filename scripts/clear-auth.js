import fs from 'fs';
import path from 'path';

console.log('🧹 Clearing authentication data...');

// Clear localStorage data by creating a simple HTML file that clears it
const clearScript = `
<!DOCTYPE html>
<html>
<head>
    <title>Clear Auth Data</title>
</head>
<body>
    <h2>Clearing authentication data...</h2>
    <script>
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        console.log('✅ Authentication data cleared from localStorage');
        alert('Authentication data cleared! You can now close this window and log in again.');
    </script>
</body>
</html>
`;

const clearAuthPath = path.join(process.cwd(), 'clear-auth.html');
fs.writeFileSync(clearAuthPath, clearScript);

console.log('✅ Clear auth HTML file created at:', clearAuthPath);
console.log('📝 Instructions:');
console.log('1. Open the file "clear-auth.html" in your browser');
console.log('2. It will automatically clear your localStorage');
console.log('3. Close the browser tab and return to your app');
console.log('4. You will need to log in again with fresh credentials');
console.log('');
console.log('🔑 Default login credentials:');
console.log('   Email: admin@example.com');
console.log('   Password: 123456');
