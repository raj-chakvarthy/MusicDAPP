import Web3 from 'web3';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !=='undefined'){
  // we are in the browser and ,etamask is running
  web3= new Web3(window.web3.currentProvider);
}
else {
  // we are in server or user is not running metamask

  const provider =new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/997ae3c2429443d2ab28399ae93dcdfd'
  );
  web3= new Web3(provider);
}

export default web3;
