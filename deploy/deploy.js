const {Web3} = require('web3');
const fs = require('fs');

// Read ABI and bytecode from the file
const contractData = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
const { abi, bytecode } = contractData;

// Connect to the testnet
const testnet = 'https://rpc-testnet.0g.ai';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

// Replace with your account address and private key
const account = '0x2cd2d79d00876CeA1c1e460896DC188f62ae5243';

const privateKey = /* Replace with your own private key*/;


// The other person signing contract
//Replace with your own
const counterParty = '0xAb7dC9d6d715D9f8496E6D65E75C49630d9e6c7a'; 

//The written contract url
//Replace with your own
const generatedContractURL = 'https://storagescan-newton.0g.ai/submission/136146';


const deploy = async () => {
    try {
        const nonce = await web3.eth.getTransactionCount(account, 'latest');

        const gasPrice = await web3.eth.getGasPrice();
        console.log('Current Gas Price in Wei:', gasPrice.toString());

        // Convert gas price to gwei
        const gasPriceInGwei = Web3.utils.fromWei(gasPrice, 'gwei');
        console.log('Current Gas Price in Gwei:', gasPriceInGwei);

        const contract = new web3.eth.Contract(abi);

        const deployData = contract.deploy({
            data: '0x' + bytecode,
            arguments: [counterParty, generatedContractURL]
        }).encodeABI();

        const tx = {
            from: account,
            to: null, // deploying a contract, so to is null
            nonce: nonce,
            gas: 2000000,
            gasPrice: gasPrice,
            data: deployData,
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Contract deployed at address:', receipt.contractAddress);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

deploy();
