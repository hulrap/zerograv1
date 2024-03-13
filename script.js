const contractAddress = "0x4f7Fe28d1d08fecf1b8dd901864820c5a12E8738";
const sepoliaChainId = '0x53'; // Hexadecimal Chain ID for the Sepolia test network
const mintPrice = ethers.utils.parseEther("0.01"); // Minting price, for example, 0.01 ETH

// Corrected ABI as an array of objects
const contractABI = [
  {
    "type": "function",
    "name": "mint",
    "stateMutability": "payable",
    "payable": true,
    "inputs": [{"type": "address", "name": "to"}],
    "outputs": []
  }
  // ... add other necessary functions of the ABI ...
];

let web3Modal, provider, ethersProvider, selectedAccount;
async function init() {
    // Provider Options including support for WalletConnect
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // Assuming WalletConnectProvider is globally available
        options: {
          infuraId: "707fce437c93a109f73c0055c32e1f66" // Use your Wallet Connect Project ID here
        }
      }
    };

    web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
        providerOptions // Set the provider options here
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
            alert('Please switch to the Sepolia network.');
        } else {
            document.getElementById('mintButton').disabled = false;
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
        const tx = await contract.mint(selectedAccount, { value: mintPrice });
        await tx.wait();
        alert('NFT successfully minted!');
    } catch (error) {
        console.error("Minting failed: ", error);
        alert('Minting failed. See console for details.');
    }
}

document.getElementById('mintButton').addEventListener('click', mintNFT);

window.addEventListener('load', init);
