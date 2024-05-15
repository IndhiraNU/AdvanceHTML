// script.js
// script.js

document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains("active");

            // Close all accordion items
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
            });

            // Toggle the clicked accordion item
            if (!isActive) {
                accordionItem.classList.add("active");
            }
        });
    });
});


function calculateSIP() {
    // Get input values
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    const investmentPeriod = parseFloat(document.getElementById('investment-period').value);
    const expectedReturn = parseFloat(document.getElementById('expected-return').value) / 100 / 12;

    // Calculate SIP
    let totalInvestment = 0;
    let futureValue = 0;
    const months = investmentPeriod * 12;
    for (let i = 0; i < months; i++) {
        totalInvestment += monthlyInvestment;
        futureValue = (futureValue + monthlyInvestment) * (1 + expectedReturn);
    }

    // Update chart
    updateChart(futureValue, totalInvestment);
}

function updateChart(futureValue, totalInvestment) {
    const ctx = document.getElementById('sip-chart').getContext('2d');
    const data = {
        labels: ['Total Investment', 'Future Value'],
        datasets: [{
            data: [totalInvestment, futureValue],
            backgroundColor: ['#007bff', '#00c18d'],
            hoverBackgroundColor: ['#0056b3', '#009975']
        }]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    // Destroy existing chart if it exists
    if (window.sipChart) {
        window.sipChart.destroy();
    }

    // Create new chart
    window.sipChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
}
