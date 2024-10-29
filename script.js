document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultDiv = document.getElementById('result');
    const convertButton = document.getElementById('convertButton');

    // Fetch and populate currency options
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.text = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                toCurrency.appendChild(option2);
            });
        });

    // Perform currency conversion
    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
            });
    });
});
