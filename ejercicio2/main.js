const exchangeRate = 4056;
function convertToPesos() {
    let usdAmount = parseFloat(document.getElementById('usd').value);
    if (!isNaN(usdAmount)) {
        let pesosAmount = Math.round(usdAmount * exchangeRate);
        document.getElementById('pesos').value = pesosAmount.toFixed(2);
    } else {
        document.getElementById('pesos').value = '';
    }
}
function convertToUSD() {
    let pesosAmount = parseFloat(document.getElementById('pesos').value);
    if (!isNaN(pesosAmount)) {
        let usdAmount = Math.round(pesosAmount / exchangeRate);
        document.getElementById('usd').value = usdAmount.toFixed(2);
    } else {
        document.getElementById('usd').value = '';
    }
}