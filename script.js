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
    // script.js
// Assuming Web3Modal and Ethers have been loaded via script tags

// Define the projectId provided by WalletConnect Cloud
const projectId = '707fce437c93a109f73c0055c32e1f66'; // Replace with your actual project ID

// Set the network details
const mainnet = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://sepolia.infura.io/v3/a45e7d96b0684e47931ffad90c2d9019' // Replace with your Infura URL
};

// Define your application's metadata
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://zerograv.xyz', // Ensure this URL matches your actual domain
  icons: ['https://avatars.mywebsite.com/'] // Replace with your actual icon URL
};

// Create Web3Modal instance
let modal;

window.addEventListener('DOMContentLoaded', () => {
  modal = createWeb3Modal({
    projectId: projectId,
    metadata: metadata,
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // the walletconnect provider package you installed
        options: {
          infuraId: projectId // your infura project id
        }
      },
      // ... include any other providers you want to support
    }
  });

  // Get references to HTML elements
  const connectButton = document.getElementById('connectButton');
  const userAddressSpan = document.getElementById('userAddress');

  // Event listeners
  connectButton.addEventListener('click', async () => {
    const provider = await modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    userAddressSpan.textContent = userAddress;
  });
});


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
