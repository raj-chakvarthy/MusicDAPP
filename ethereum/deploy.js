const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3= require ('web3');
const compiledFactory = require('./build/ConcertFactory.json');

const provider = new HDWalletProvider(
  'brown only forum force file emotion visit term embark donor camera glad',
  'https://rinkeby.infura.io/v3/997ae3c2429443d2ab28399ae93dcdfd'
);

const web3= new Web3(provider);

const deploy= async () => {

  const accounts = await web3.eth.getAccounts();
  console.log('attemplting to deploy from', accounts[0]);

  const result= await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: '0x'+compiledFactory.bytecode})
    .send({ gas: '5000000', from: accounts[0]});

  console.log('Contract deployed to', result.options.address);
};
deploy();
