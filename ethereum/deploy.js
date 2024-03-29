const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

//HDWallet provider to connect to metamask account
const provider = new HDWalletProvider(
   
   //account mnemonic
  'blame inside race solve token good nurse gap client cute express burden',
  
  //infura test node access point
  'https://sepolia.infura.io/v3/a887a7bde4ec4b2dbadc8182cbb5daa4'
);

const web3 = new Web3(provider);


//deploys a contract in the network by sending a transaction
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1400000', from: accounts[0] });

  //Provide some log info
  console.log(compiledFactory.abi)
  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};

deploy();
