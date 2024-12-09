const apiKey = "1bbc6714cc7f8f1d322adc7c";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const fromAmount = document.getElementById("from-currency-amount");
const toAmount = document.getElementById("to-currency-amount");
const rateText = document.getElementById("rate-text");
const rateAmount = document.getElementById("rate-amount");

let exchangeData = {};
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        exchangeData = data;
        const currencies = Object.keys(data.conversion_rates);
        for (let i = 0; i < currencies.length; i++) {
            const currency = currencies[i];
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.innerText = currency;
            fromCurrencySelect.appendChild(option1);
            const option2 = document.createElement("option");
            option2.value = currency;
            option2.innerText = currency;
            toCurrencySelect.appendChild(option2);
        }
        fromCurrencySelect.value = "USD";
        toCurrencySelect.value = "EUR";
        updateRate();
    })
    .catch(function (error) {
        console.log("Error getting data:", error);
    });

function updateRate() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (!exchangeData.conversion_rates) {
        alert("Exchange rates are not available. Please try again later.");
        return;
    }
    const fromRate = exchangeData.conversion_rates[fromCurrency];
    const toRate = exchangeData.conversion_rates[toCurrency];
    const rate = toRate / fromRate;
    rateText.innerText = `${fromCurrency} to ${toCurrency}:`;
    rateAmount.innerText = rate.toFixed(4);
    const amount = parseFloat(fromAmount.value);
    if (isNaN(amount)) {
        toAmount.value = "0.00";
    } else {
        toAmount.value = (amount * rate).toFixed(2);
    }
}

fromCurrencySelect.addEventListener("change", function () {
    updateRate();
});
toCurrencySelect.addEventListener("change", function () {
    updateRate();
});
fromAmount.addEventListener("input", function () {
    updateRate();
});
