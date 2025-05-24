const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

const currencyAPI = 'https://v6.exchangerate-api.com/v6/17d2e51ee8da69257a1978e8/latest/USD';

// Fetch currency data
async function fetchCurrencyData() {
    const response = await fetch(currencyAPI);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

// Convert currency
convertBtn.addEventListener('click', async () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    if (amount === '' || fromCurrency === toCurrency) {
        resultDiv.textContent = 'Please enter a valid amount and different currencies.';
        return;
    }

    const response = await fetch(currencyAPI);
    const data = await response.json();
    const exchangeRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
});
fetchCurrencyData();