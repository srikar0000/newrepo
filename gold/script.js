// script.js

// Your GoldAPI key
const apiKey = 'goldapi-aqmpcwsm9p5ry6o-io';

// Dummy variables to hold live prices (will be updated by API)
let livePrice22K = 0.00;
let livePrice24K = 0.00;

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // You might want to trigger a price update based on the active tab later
        });
    });

    fetchLiveGoldPrices(); // Fetch prices when the page loads
    setInterval(fetchLiveGoldPrices, 30000); // Update prices every 30 seconds (adjust as needed)
});

async function fetchLiveGoldPrices() {
    const apiUrl = 'https://www.goldapi.io/api/XAU/INR'; // Base endpoint for gold in INR

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-access-token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        processGoldPriceData(data);
    } catch (error) {
        console.error('Error fetching gold prices:', error);
        // Optionally display an error message to the user
    }
}

function processGoldPriceData(data) {
    // GoldAPI often returns a 'price' which is the spot price (usually for pure gold).
    // You might need to consult GoldAPI's documentation to see if they provide
    // prices directly for 22K and 24K or if you need to apply conversion factors.

    console.log('API Response:', data); // Log the data to see its structure

    // Example of how you might extract the price (this is a guess based on typical API responses)
    if (data && data.price) {
        const spotPricePerOunceINR = data.price;

        // Conversion factors (these are approximate and can vary based on local market)
        const gramsPerOunce = 28.3495;
        const purity24KFactor = 0.999; // Assuming 24K is very close to pure
        const purity22KFactor = 0.916; // 22K is 22/24 pure gold

        const price24KPerGram = (spotPricePerOunceINR / gramsPerOunce) * purity24KFactor;
        const price22KPerGram = (spotPricePerOunceINR / gramsPerOunce) * purity22KFactor;

        livePrice24K = price24KPerGram;
        livePrice22K = price22KPerGram;

        updateDisplayedPrices();
    } else {
        console.error('Price data not found in the API response.');
        // Optionally display an error message
    }
}

function updateDisplayedPrices() {
    document.getElementById('price-22k').textContent = livePrice22K.toFixed(2);
    document.getElementById('price-24k').textContent = livePrice24K.toFixed(2);
}

function calculateGoldPrice() {
    const weightInput = document.getElementById('weightInput');
    const purity22KRadio = document.getElementById('purity-22k');
    const calculatedPriceSpan = document.getElementById('calculatedPrice');

    const weight = parseFloat(weightInput.value);
    let currentPricePerGram;

    if (purity22KRadio.checked) {
        currentPricePerGram = livePrice22K;
    } else {
        currentPricePerGram = livePrice24K;
    }

    if (!isNaN(weight) && weight > 0) {
        const totalPrice = weight * currentPricePerGram;
        calculatedPriceSpan.textContent = totalPrice.toFixed(2);
    } else {
        calculatedPriceSpan.textContent = '0.00';
        alert('Please enter a valid weight.');
    }
}