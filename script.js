const contractAddress = "0xa774F8B2df0A34858959aE597598BAcF42f22a37";
const mintPrice_float = .0
const mintPrice = ethers.utils.parseEther(mintPrice_float.toString()).toString();

document.getElementById('mintButton').textContent = `Mint NFT for ${mintPrice_float} ETH`;

const contractABI = "[{\"type\":\"constructor\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"_scriptyStorageAddress\"},{\"type\":\"address\",\"name\":\"_scriptyBuilderAddress\"}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Approval\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"approved\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"ApprovalForAll\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"operator\",\"indexed\":true},{\"type\":\"bool\",\"name\":\"approved\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"OwnershipTransferred\",\"inputs\":[{\"type\":\"address\",\"name\":\"previousOwner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"newOwner\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Transfer\",\"inputs\":[{\"type\":\"address\",\"name\":\"from\",\"indexed\":true},{\"type\":\"address\",\"name\":\"to\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"function\",\"name\":\"addToFriendList\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"addresses\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"addToWhitelist\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"addresses\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"approve\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"balanceOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"}],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"batchMint\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"toList\"},{\"type\":\"uint256\",\"name\":\"mintCount\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"constructMetadataParts\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"}],\"outputs\":[{\"type\":\"string[4]\"}]},{\"type\":\"function\",\"name\":\"constructMetadataParts3d\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"}],\"outputs\":[{\"type\":\"string\",\"name\":\"nr_points\"},{\"type\":\"string\",\"name\":\"typeTrait\"}]},{\"type\":\"function\",\"name\":\"constructMetadataPartsGenArt\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"}],\"outputs\":[{\"type\":\"string\",\"name\":\"typeTrait\"},{\"type\":\"string\",\"name\":\"hueShiftTrait\"}]},{\"type\":\"function\",\"name\":\"constructMetadataPartsSchrift\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"contractURI\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"createInitData\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"currentPhase\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint8\"}]},{\"type\":\"function\",\"name\":\"friendListMintPrice\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"getApproved\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"isApprovedForAll\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"},{\"type\":\"address\",\"name\":\"operator\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"maxSupply\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"mint\",\"constant\":false,\"stateMutability\":\"payable\",\"payable\":true,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"name\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"ownedTokens\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"}],\"outputs\":[{\"type\":\"uint256[]\"}]},{\"type\":\"function\",\"name\":\"owner\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"ownerOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"publicMintPrice\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"render_3d\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"render_deck\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"render_schrift\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"renounceOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]},{\"type\":\"function\",\"name\":\"royaltyInfo\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenId\"},{\"type\":\"uint256\",\"name\":\"_salePrice\"}],\"outputs\":[{\"type\":\"address\",\"name\":\"receiver\"},{\"type\":\"uint256\",\"name\":\"royaltyAmount\"}]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"},{\"type\":\"bytes\",\"name\":\"data\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"scriptyBuilderAddress\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"scriptyStorageAddress\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"setApprovalForAll\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"operator\"},{\"type\":\"bool\",\"name\":\"approved\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setFriendListMintPrice\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_price\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setMintPhase\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint8\",\"name\":\"phase\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setPublicMintPrice\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_price\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setRoyaltyReceiver\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"_receiver\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setWhitelistMintPrice\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_price\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"stopMint\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]},{\"type\":\"function\",\"name\":\"supportsInterface\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"bytes4\",\"name\":\"interfaceId\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"symbol\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"tokenData\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\"}],\"outputs\":[{\"type\":\"uint256\",\"name\":\"transferCount\"},{\"type\":\"uint256\",\"name\":\"mintTimestamp\"},{\"type\":\"bytes32\",\"name\":\"seed\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"TimeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"OnlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"Momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"},{\"type\":\"bool\",\"name\":\"needsUpdate\"},{\"type\":\"bool\",\"name\":\"payedWithRoyalties\"}]},{\"type\":\"function\",\"name\":\"tokenURI\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"totalMintedSoFar\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"totalSupply\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"totalTradeVolume\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"transferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"transferOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"newOwner\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"whitelistMintPrice\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"withdraw\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]}]"; 


const BASE_SEPOLIA_CHAIN_ID = '0x2105'; // Chain ID für Base
const BASE_SEPOLIA_RPC_URL = 'https://mainnet.base.org';
const BASE_blockExplorerUrl = "https://basescan.org"
const BASE_chainName = 'Base Mainnet'
let ethersProvider;

updateMintInfo();
startMintInfoUpdateLoop(); // Start the loop for updating mint info

async function connectWallet() {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    if (!window.ethereum) {
        alert('Please install MetaMask to use this feature.');
        return;
    }

    checkNetwork();

    //ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    await ethersProvider.send("eth_requestAccounts", []);
    const signer = ethersProvider.getSigner();
    const selectedAccount = await signer.getAddress();
    
    document.getElementById('walletInfo').textContent = `Wallet Address: ${selectedAccount}`;
    checkNetwork(); // Netzwerk überprüfen
}

async function checkNetwork() {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await ethersProvider.getNetwork();
    if (network.chainId !== parseInt(BASE_SEPOLIA_CHAIN_ID, 16)) {
        console.log('Not connected to Base L2');
        document.getElementById('networkStatus').textContent = 'Wrong Network';
        //document.getElementById('networkStatus').disabled = false; // Aktivieren des Netzwerkwechsel-Buttons
        switchNetwork()
    } else {
        console.log('Connected to Base L2');
        document.getElementById('networkStatus').textContent = 'Connected to Base L2';
        //document.getElementById('networkButton').disabled = true; // Deaktivieren des Netzwerkwechsel-Buttons, wenn bereits verbunden
    }
}
async function switchNetwork() {

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: BASE_SEPOLIA_CHAIN_ID,
                        rpcUrl: BASE_SEPOLIA_RPC_URL,
                        blockExplorerUrl: BASE_blockExplorerUrl,
                        chainName: BASE_chainName,
                        nativeCurrency: {
                            name: 'Ether',
                            symbol: 'ETH',
                            decimals: 18
                        }
                    }],
                });
            } catch (addError) {
                console.error('Failed to add Base:', addError);
            }
        } else {
            console.error('Failed to switch to Base:', switchError);
        }
    }
}
async function mintNFT() {
    await checkNetwork();

    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = ethersProvider.getSigner();
    const selectedAccount = await signer.getAddress();
    if (!selectedAccount) {
      alert('Please connect your wallet.');
      return;
    }
    
    
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    try {
      const tx = await contract.mint(selectedAccount, { value: mintPrice });
      await tx.wait();
      alert('NFT successfully minted!');
    } catch (error) {
      console.error("Minting failed:", error);
      alert('Minting failed. See console for details.');
    }
  }
  async function updateMintInfo() {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    if (!ethersProvider) {
        console.log('Ethers provider is not initialized.');
        return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider);
    try {
        // Assuming your contract has these methods. Replace with actual methods if different.
        const totalMinted = await contract.totalMintedSoFar();
        const totalSupply = await contract.maxSupply();
        
        // Update the UI
        document.getElementById('mintInfo').textContent = `Minted: ${totalMinted.toString()} / Total Supply: ${totalSupply.toString()}`;
    } catch (error) {
        console.error("Error fetching mint information:", error);
    }
}

function startMintInfoUpdateLoop() {
    updateMintInfo(); // Initial update
    setInterval(updateMintInfo, 1000); // Update every 5 seconds
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('walletButton').addEventListener('click', connectWallet);
    document.getElementById('mintButton').addEventListener('click', mintNFT);
    document.getElementById('networkStatus').addEventListener('click', switchNetwork);
  }); 
