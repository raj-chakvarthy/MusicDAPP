import web3 from './web3';
import ConcertFactory from './build/ConcertFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(ConcertFactory.interface),
  '0x0b75A0D40443a77970fa4bb353888F48dA2c6740'
);

export default instance;
