const contractAddress = "0x4f7Fe28d1d08fecf1b8dd901864820c5a12E8738";
const sepoliaChainId = '0x53'; // Hexadezimaler Chain-ID für das Sepolia-Testnetzwerk
const mintPrice = ethers.utils.parseEther("0.01"); // Minting-Preis, zum Beispiel 0.01 ETH

// Korrigierte ABI als Array von Objekten
const contractABI = [
  {
    "type": "function",
    "name": "mint",
    "stateMutability": "payable",
    "payable": true,
    "inputs": [{"type": "address", "name": "to"}],
    "outputs": []
  }
  // ... weitere Funktionen der ABI ...
];

let web3Modal, provider, ethersProvider, selectedAccount;

async function init() {
    // Setzen Sie die Provider-Optionen, einschließlich der Unterstützung für WalletConnect
    const providerOptions = {
      walletconnect: {
        package: window.WalletConnectProvider, // Use the global variable here
        options: {
          infuraId: "a45e7d96b0684e47931ffad90c2d9019" // Your Infura ID
    }
  }
};


    web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
        providerOptions // Wir setzen jetzt die Provider-Optionen
    });

    document.getElementById('walletButton').addEventListener('click', onConnect);
}

async function onConnect() {
    try {
        provider = await web3Modal.connect();
        ethersProvider = new ethers.providers.Web3Provider(provider);

        const accounts = await ethersProvider.listAccounts();
        selectedAccount = accounts[0];
        document.getElementById('walletInfo').textContent = selectedAccount;

        const network = await ethersProvider.getNetwork();
        if (network.chainId !== parseInt(sepoliaChainId, 16)) {
            alert('Bitte wechseln Sie zum Sepolia Netzwerk.');
        } else {
            document.getElementById('mintButton').disabled = false;
        }
    } catch (e) {
        console.error(e);
        alert('Could not connect to wallet.');
    }
}

async function mintNFT() {
    // ... Die Funktion mintNFT bleibt unverändert ...
}

document.getElementById('mintButton').addEventListener('click', mintNFT);

window.onload = init;
