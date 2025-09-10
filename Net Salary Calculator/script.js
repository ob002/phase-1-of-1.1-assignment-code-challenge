document.addEventListener('DOMContentLoaded', function() {
    const marksInput = document.getElementById('marks');
    const generateBtn = document.getElementById('generate-btn');
    const resultSection = document.getElementById('result');
    const gradeDisplay = document.getElementById('grade-display');
    const gradeMessage = document.getElementById('grade-message');
    const errorMessage = document.getElementById('error-message');
    
    // Function to generate grade based on marks
    function generateGrade() {
        const marks = parseInt(marksInput.value);
        
        // Validate input
        if (isNaN(marks) || marks < 0 || marks > 100) {
            showError();
            return;
        }
        
        // Hide error message if it was displayed
        errorMessage.style.display = 'none';
        
        // Determine grade based on marks
        let grade, message, colorClass;
        
        if (marks > 79) {
            grade = 'A';
            message = 'Excellent!';
            colorClass = 'grade-a';
        } else if (marks >= 60) {
            grade = 'B';
            message = 'Good Job!';
            colorClass = 'grade-b';
        } else if (marks >= 49) {
            grade = 'C';
            message = 'Satisfactory';
            colorClass = 'grade-c';
        } else if (marks >= 40) {
            grade = 'D';
            message = 'Needs Improvement';
            colorClass = 'grade-d';
        } else {
            grade = 'E';
            message = 'Failed';
            colorClass = 'grade-e';
        }
        
        // Display result
        gradeDisplay.textContent = grade;
        gradeMessage.textContent = message;
        resultSection.className = 'result-section ' + colorClass;
        resultSection.style.display = 'block';
        
        // Add animation
        resultSection.style.animation = 'none';
        setTimeout(() => {
            resultSection.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
    
    // Function to show error message
    function showError() {
        errorMessage.style.display = 'block';
        resultSection.style.display = 'none';
        
        // Add shake animation
        errorMessage.style.animation = 'none';
        setTimeout(() => {
            errorMessage.style.animation = 'shake 0.5s';
        }, 10);
        
        // Clear input
        marksInput.value = '';
        marksInput.focus();
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateGrade);
    
    marksInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            generateGrade();
        }
    });
    
    // Add CSS classes for grade colors
    const style = document.createElement('style');
    style.textContent = `
        .grade-a { background: linear-gradient(135deg, #00b09b, #96c93d); }
        .grade-b { background: linear-gradient(135deg, #2193b0, #6dd5ed); }
        .grade-c { background: linear-gradient(135deg, #ffd89b, #19547b); }
        .grade-d { background: linear-gradient(135deg, #f953c6, #b91d73); }
        .grade-e { background: linear-gradient(135deg, #ff416c, #ff4b2b); }
    `;
    document.head.appendChild(style);
});