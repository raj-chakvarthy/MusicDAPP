import web3 from './web3';
import MusicDapp from './build/MusicDapp.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(MusicDapp.interface),
    address
  );
};
