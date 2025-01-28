const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://orneksite.com/tonconnect-manifest.json'
});

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        const wallet = await tonConnectUI.connectWallet();
        checkBalance(wallet);
    } catch (error) {
        document.getElementById('status').textContent = "Bağlantı hatası: " + error.message;
    }
});

async function checkBalance(wallet) {
    const balance = await wallet.getBalance(); // Gerçek bakiye kontrolü için TON API kullan
    if (balance >= 0.25) {
        sendTransaction(wallet);
    } else {
        document.getElementById('status').textContent = "Yetersiz bakiye!";
    }
}

async function sendTransaction(wallet) {
    const transaction = {
        messages: [{
            address: "UQB-GfjLf70E18gsZwq3cr62-0BUCnowqCF-70HF7WHFdupK", // Kendi TON adresini yaz
            amount: 0.25 * 1000000000 // TON miktarı nanotons
        }]
    };
    
    try {
        await wallet.sendTransaction(transaction);
        document.getElementById('status').textContent = "Başarılı! Kaydoldunuz.";
    } catch (error) {
        document.getElementById('status').textContent = "İşlem hatası: " + error.message;
    }
}
