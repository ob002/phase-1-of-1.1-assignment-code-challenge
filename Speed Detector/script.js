// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const salaryForm = document.getElementById('salaryForm');
    const basicSalaryInput = document.getElementById('basicSalary');
    const benefitsInput = document.getElementById('benefits');
    
    // Result display elements
    const grossSalaryEl = document.getElementById('grossSalary');
    const payeTaxEl = document.getElementById('payeTax');
    const nhifDeductionEl = document.getElementById('nhifDeduction');
    const nssfDeductionEl = document.getElementById('nssfDeduction');
    const netSalaryEl = document.getElementById('netSalary');
    
    // Add event listener to the form
    salaryForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        
        // Get input values
        const basicSalary = parseFloat(basicSalaryInput.value) || 0;
        const benefits = parseFloat(benefitsInput.value) || 0;
        
        // Validate inputs
        if (basicSalary <= 0) {
            alert('Please enter a valid basic salary');
            return;
        }
        
        // Calculate salary components
        const grossSalary = basicSalary + benefits;
        const payeTax = calculatePAYE(grossSalary);
        const nhifDeduction = calculateNHIF(grossSalary);
        const nssfDeduction = calculateNSSF(grossSalary);
        const netSalary = grossSalary - payeTax - nhifDeduction - nssfDeduction;
        
        // Display results
        grossSalaryEl.textContent = `KES ${grossSalary.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        payeTaxEl.textContent = `KES ${payeTax.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        nhifDeductionEl.textContent = `KES ${nhifDeduction.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        nssfDeductionEl.textContent = `KES ${nssfDeduction.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        netSalaryEl.textContent = `KES ${netSalary.toLocaleString('en-KE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    });
    
    // PAYE Tax Calculation Function
    function calculatePAYE(grossSalary) {
        let tax = 0;
        
        // Tax brackets (as per KRA rates)
        if (grossSalary <= 24000) {
            tax = grossSalary * 0.10;
        } else if (grossSalary <= 32333) {
            tax = 2400 + (grossSalary - 24000) * 0.25;
        } else if (grossSalary <= 500000) {
            tax = 2400 + 2083.25 + (grossSalary - 32333) * 0.30;
        } else if (grossSalary <= 800000) {
            tax = 2400 + 2083.25 + 142500 + (grossSalary - 500000) * 0.325;
        } else {
            tax = 2400 + 2083.25 + 142500 + 97500 + (grossSalary - 800000) * 0.35;
        }
        
        // Personal relief (KES 2,400 per month)
        const personalRelief = 2400;
        tax = Math.max(0, tax - personalRelief);
        
        return tax;
    }
    
    // NHIF Deduction Calculation Function
    function calculateNHIF(grossSalary) {
        // NHIF contribution rates based on gross salary
        if (grossSalary <= 5999) return 150;
        if (grossSalary <= 7999) return 300;
        if (grossSalary <= 11999) return 400;
        if (grossSalary <= 14999) return 500;
        if (grossSalary <= 19999) return 600;
        if (grossSalary <= 24999) return 750;
        if (grossSalary <= 29999) return 850;
        if (grossSalary <= 34999) return 900;
        if (grossSalary <= 39999) return 950;
        if (grossSalary <= 44999) return 1000;
        if (grossSalary <= 49999) return 1100;
        if (grossSalary <= 59999) return 1200;
        if (grossSalary <= 69999) return 1300;
        if (grossSalary <= 79999) return 1400;
        if (grossSalary <= 89999) return 1500;
        if (grossSalary <= 99999) return 1600;
        return 1700; // For gross salary >= 100,000
    }
    
    // NSSF Deduction Calculation Function
    function calculateNSSF(grossSalary) {
        // NSSF contribution is 6% of gross salary (employee contribution)
        // Capped at KES 720 per month (6% of KES 12,000)
        const nssfRate = 0.06;
        const maxNSSF = 720;
        return Math.min(grossSalary * nssfRate, maxNSSF);
    }
    
    // Initialize with sample values for demonstration
    basicSalaryInput.value = '50000';
    benefitsInput.value = '15000';
});