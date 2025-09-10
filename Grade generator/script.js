// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const speedInput = document.getElementById('speedInput');
    const checkButton = document.getElementById('checkButton');
    const resultDiv = document.getElementById('result');
    const speedValue = document.getElementById('speedValue');
    
    // Function to check speed and calculate demerit points
    function checkSpeed() {
        // Get the speed value from input
        const speed = parseFloat(speedInput.value);
        
        // Update displayed speed
        speedValue.textContent = speed ? `${speed} km/h` : '0 km/h';
        
        // Validate input
        if (isNaN(speed) || speed < 0) {
            resultDiv.textContent = 'Please enter a valid speed';
            resultDiv.className = 'result';
            return;
        }
        
        // Define speed limit
        const speedLimit = 70;
        
        // Check if speed is within limit
        if (speed < speedLimit) {
            resultDiv.textContent = 'OK';
            resultDiv.className = 'result ok';
            return;
        }
        
        // Calculate demerit points
        const excessSpeed = speed - speedLimit;
        const demeritPoints = Math.floor(excessSpeed / 5);
        
        // Check if license should be suspended
        if (demeritPoints > 12) {
            resultDiv.textContent = 'License Suspended!';
            resultDiv.className = 'result suspended';
        } else {
            resultDiv.textContent = `Points: ${demeritPoints}`;
            resultDiv.className = 'result points';
        }
    }
    
    // Add event listeners
    checkButton.addEventListener('click', checkSpeed);
    
    speedInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkSpeed();
        }
    });
    
    // Initialize with a sample value
    speedInput.value = '80';
});