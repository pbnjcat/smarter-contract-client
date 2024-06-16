const {Web3} = require('web3');
const fs = require('fs');

// Read ABI from the file
const contractData = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
const { abi } = contractData;

// Connect to the testnet
const testnet = 'https://rpc-testnet.0g.ai';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

// Replace with your account address and private key
const account = '0x2cd2d79d00876CeA1c1e460896DC188f62ae5243'; //Replace with wallet address here
const privateKey = /* REPLACE_WITH_PRIVATE_KEY  */;

// Replace with the deployed contract address
const contractAddress = '0x184C51A536edD46413D9eB53496f6bEFF8108992'; //Replace with deployed contract address

const signContract = async () => {
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Get the nonce
        const nonce = await web3.eth.getTransactionCount(account, 'latest');

        // Get the current gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Create the transaction data for the sign function
        const data = contract.methods.sign().encodeABI();

        // Create the transaction object
        const tx = {
            from: account,
            to: contractAddress,
            nonce: nonce,
            gas: 200000,
            gasPrice: gasPrice,
            data: data,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Sign function executed:', receipt);

    } catch (error) {
        console.error('An error occurred while signing the contract:', error);
    }
};

signContract();
