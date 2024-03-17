// We no longer import Web3Modal or WalletConnectProvider.
const contractAddress = "0x4f7Fe28d1d08fecf1b8dd901864820c5a12E8738";
const sepoliaChainId = '0x' + parseInt(11155111).toString(16); // Chain ID for Sepolia in hexadecimal
const mintPrice = ethers.utils.parseEther("0.01").toString();
const placeholderGitHubURL = "https://github.com/hulrap/zerograv1/blob/web-app/index.html"; // Placeholder URL
const contractABI = ["[{\"type\":\"constructor\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"_scriptyStorageAddress\"},{\"type\":\"address\",\"name\":\"_scriptyBuilderAddress\"}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Approval\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"approved\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"ApprovalForAll\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"operator\",\"indexed\":true},{\"type\":\"bool\",\"name\":\"approved\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"OwnershipTransferred\",\"inputs\":[{\"type\":\"address\",\"name\":\"previousOwner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"newOwner\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Transfer\",\"inputs\":[{\"type\":\"address\",\"name\":\"from\",\"indexed\":true},{\"type\":\"address\",\"name\":\"to\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"function\",\"name\":\"PUBLIC_MINT_PRICE\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"VIP_MINT_PRICE\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"WHITELIST_MINT_PRICE\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"addToVIPList\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"addresses\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"addToWhitelist\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"addresses\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"approve\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"balanceOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"}],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"batchMint\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address[]\",\"name\":\"toList\"},{\"type\":\"uint256\",\"name\":\"mintCount\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"constructMetadataParts\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"}],\"outputs\":[{\"type\":\"string[4]\"}]},{\"type\":\"function\",\"name\":\"constructMetadataParts3d\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"}],\"outputs\":[{\"type\":\"string\",\"name\":\"nr_points\"},{\"type\":\"string\",\"name\":\"typeTrait\"}]},{\"type\":\"function\",\"name\":\"constructMetadataPartsGenArt\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"}],\"outputs\":[{\"type\":\"string\",\"name\":\"typeTrait\"},{\"type\":\"string\",\"name\":\"hueShiftTrait\"}]},{\"type\":\"function\",\"name\":\"constructMetadataPartsSchrift\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"createInitData\",\"constant\":true,\"stateMutability\":\"pure\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"currentPhase\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint8\"}]},{\"type\":\"function\",\"name\":\"getApproved\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"isApprovedForAll\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"},{\"type\":\"address\",\"name\":\"operator\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"maxSupply\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"mint\",\"constant\":false,\"stateMutability\":\"payable\",\"payable\":true,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"mint_with_ref\",\"constant\":false,\"stateMutability\":\"payable\",\"payable\":true,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"address\",\"name\":\"referralAddress\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"name\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"ownedTokens\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"}],\"outputs\":[{\"type\":\"uint256[]\"}]},{\"type\":\"function\",\"name\":\"owner\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"ownerOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"render_3d\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"render_deck\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"render_schrift\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenTransferCount\"},{\"type\":\"uint256\",\"name\":\"_tokenMintTimestamp\"},{\"type\":\"uint256\",\"name\":\"_lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"_totalTradeVolume\"},{\"type\":\"uint256\",\"name\":\"_tokenID\"},{\"type\":\"uint256\",\"name\":\"_timeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"_onlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"_momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"renounceOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]},{\"type\":\"function\",\"name\":\"royaltyInfo\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenId\"},{\"type\":\"uint256\",\"name\":\"_salePrice\"}],\"outputs\":[{\"type\":\"address\",\"name\":\"receiver\"},{\"type\":\"uint256\",\"name\":\"royaltyAmount\"}]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"},{\"type\":\"bytes\",\"name\":\"data\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"scriptyBuilderAddress\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"scriptyStorageAddress\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"setApprovalForAll\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"operator\"},{\"type\":\"bool\",\"name\":\"approved\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setMintPhase\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint8\",\"name\":\"phase\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setRoyaltyReceiver\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"_receiver\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"supportsInterface\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"bytes4\",\"name\":\"interfaceId\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"symbol\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"tokenData\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\"}],\"outputs\":[{\"type\":\"uint256\",\"name\":\"transferCount\"},{\"type\":\"uint256\",\"name\":\"mintTimestamp\"},{\"type\":\"bytes32\",\"name\":\"seed\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestamp\"},{\"type\":\"uint256\",\"name\":\"TimeSinceMintBefore\"},{\"type\":\"uint256\",\"name\":\"lastTransferTimestampChange\"},{\"type\":\"uint256\",\"name\":\"OnlineMeanOfTransferTimes\"},{\"type\":\"uint256\",\"name\":\"Momentum\"},{\"type\":\"uint256\",\"name\":\"RelVol\"},{\"type\":\"bool\",\"name\":\"needsUpdate\"},{\"type\":\"bool\",\"name\":\"payedWithRoyalties\"}]},{\"type\":\"function\",\"name\":\"tokenURI\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"totalMintedSoFar\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"totalTradeVolume\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"transferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"transferOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"newOwner\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"withdraw\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]}]"]; // Your contract ABI here

let ethersProvider;
let selectedAccount;

async function connectWallet() {
  if (!window.ethereum) {
    alert('Please install MetaMask to use this feature.');
    return;
  }
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    await ethersProvider.send("eth_requestAccounts", []);
    const signer = ethersProvider.getSigner();
    selectedAccount = await signer.getAddress();

    document.getElementById('walletInfo').textContent = `Wallet Address: ${selectedAccount}`;
    checkNetwork();
  } catch (error) {
    console.error("Connection error:", error);
  }
}

async function checkNetwork() {
  const network = await ethersProvider.getNetwork();
  if (network.chainId !== parseInt(sepoliaChainId, 16)) {
    document.getElementById('networkStatus').textContent = 'Wrong Network';
    // Button logic to switch network
  } else {
    document.getElementById('networkStatus').textContent = `Connected Network: Sepolia`;
  }
}

async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: sepoliaChainId }],
    });
    checkNetwork();
  } catch (switchError) {
    // Handle error
    console.error(switchError);
  }
}

async function mintNFT() {
  // Simulated check if wallet is in allowed list from GitHub
  const allowedWallets = ["0x9E15f9ecfD57f0237e158e1F7Ba6c125c9796Fb6"]; // Simulated allowed wallets list
  if (!allowedWallets.includes(selectedAccount)) {
    alert('Sorry, your wallet is not in the whitelist :(');
    return;
  }

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
    console.error("Minting failed:", error);
    alert('Minting failed. See console for details.');
  }
}

// Initialization and event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('walletButton').addEventListener('click', connectWallet);
  document.getElementById('mintButton').addEventListener('click', mintNFT);
  document.getElementById('networkStatus').addEventListener('click', switchNetwork);
});
