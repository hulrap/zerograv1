const contractAddress = "0x4f7Fe28d1d08fecf1b8dd901864820c5a12E8738";
const sepoliaChainId = '0x53'; // Hexadezimaler Chain-ID für das Sepolia-Testnetzwerk
const mintPrice = ethers.utils.parseEther("0.01"); // Minting-Preis, zum Beispiel 0.01 ETH

// Vereinfachte ABI mit nur der mint-Funktion
const contractABI = [
  // ... Fügen Sie hier die ABI-Methodendefinition für die 'mint'-Funktion ein ...
];

let web3Modal, provider, ethersProvider, selectedAccount;

async function init() {
    // Setup für web3modal hier
    web3Modal = new Web3Modal({
        network: "sepolia", // optional
        cacheProvider: true, // optional
        providerOptions: {} // erforderlich
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
        
        // Überprüfen, ob der Benutzer im Sepolia Netzwerk ist
        const network = await ethersProvider.getNetwork();
        if (network.chainId !== parseInt(sepoliaChainId, 16)) {
            alert('Bitte wechseln Sie zum Sepolia Netzwerk.');
        }
    } catch (e) {
        console.error(e);
        alert('Could not connect to wallet.');
    }
}

async function mintNFT() {
    if (!selectedAccount) {
        alert('Please connect your wallet.');
        return;
    }

    const signer = ethersProvider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.mint({ value: mintPrice });
        await tx.wait();
        alert('NFT successfully minted!');
    } catch (error) {
        console.error("Minting failed: ", error);
        alert('Minting failed. See console for details.');
    }
}

document.getElementById('mintButton').addEventListener('click', mintNFT);

window.onload = init;
