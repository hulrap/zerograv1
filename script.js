const contractAddress = "0x4f7Fe28d1d08fecf1b8dd901864820c5a12E8738";
const sepoliaChainId = '0x53';
const whitelistAddresses = ['0x76FE342CBF94b009A443E98d999B076BfF1cbb1d']; // Ersetze durch tatsächliche Whitelist-Adressen

let web3Modal, provider, ethersProvider, selectedAccount;

async function init() {
    // ... bestehende init Funktion ...
}

async function onConnect() {
    // ... bestehende onConnect Funktion ...
    checkIfWhitelisted();
}

async function fetchAccountData() {
    // ... bestehende fetchAccountData Funktion ...
    checkNetworkAndMintStatus();
}

async function checkNetworkAndMintStatus() {
    const network = await ethersProvider.getNetwork();
    const mintButton = document.getElementById('mintButton');

    if (network.chainId !== parseInt(sepoliaChainId, 16)) {
        displayNetworkWarning(true);
        mintButton.innerText = 'Sorry';
        mintButton.disabled = true;
    } else {
        displayNetworkWarning(false);
        if (whitelistAddresses.includes(selectedAccount)) {
            mintButton.innerText = 'Mint NFT for 0.01 ETH';
            mintButton.disabled = false;
        } else {
            mintButton.innerText = 'Sorry';
            mintButton.disabled = true;
        }
    }
}

function checkIfWhitelisted() {
    // Diese Funktion prüft, ob die verbundene Wallet-Adresse in der Whitelist ist
    const isWhitelisted = whitelistAddresses.includes(selectedAccount);
    if (!isWhitelisted) {
        alert('Your account is not whitelisted.');
    }
}

async function mintNFT() {
    // ... bestehende mintNFT Funktion ...
    displayNFTPopup(); // Diese Funktion muss implementiert werden, um die NFT-Details zu zeigen
}

function displayNetworkWarning(show) {
    const warningElement = document.getElementById('networkDisplay');
    if (show) {
        warningElement.innerText = "You're on the wrong network. Please switch to Sepolia.";
    } else {
        warningElement.innerText = "Connected Network: Sepolia";
    }
}

function displayNFTPopup() {
    // Diese Funktion zeigt ein Popup mit NFT-Details nach dem Minting
    // Diese Funktion muss implementiert werden, um die NFT-Metadaten zu holen und anzuzeigen
}

// Weitere notwendige Funktionen ...

window.onload = init;
