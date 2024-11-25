const { ethers } = require("ethers");

async function transferTokens() {
  // Replace with your RPC URL
  const rpcUrl = "https://rpc-testnet.qanplatform.com"; 
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const senderPrivateKey = "PLEASE_REPLACE_YOUR_PRIVATEKEY_HERE"; 
  const wallet = new ethers.Wallet(senderPrivateKey, provider);

  
  const tokenAddress = "0x49dDAe7d6C8aFe7b6CDbdb53933fFC8E883C6FD8"; 
  const tokenABI = [
    "function transfer(address to, uint256 value) public returns (bool)"
  ];

  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

  const recipient = "0x7F5cb6e548e530b78E3b633CA1Be078C53c41a9a"; // It's my address.
  const amount = ethers.utils.parseUnits("1000", 18); // You can set amount, I set 1000.

  try {
    const tx = await tokenContract.transfer(recipient, amount);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.transactionHash);
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}

transferTokens();
