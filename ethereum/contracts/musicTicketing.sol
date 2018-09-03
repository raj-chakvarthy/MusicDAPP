pragma solidity ^0.4.17;


contract ConcertFactory {
    address[] deployedConcerts;

    function createConcert(string c_name, string c_desc, uint minimum, uint seats, string date, string place_name, string im) public{
        address newConcert=new MusicDapp(c_name, c_desc, minimum, seats, date, place_name, im, msg.sender);
        deployedConcerts.push(newConcert);
    }

    function getDeployed() public view returns (address[]){
        return deployedConcerts;
    }


}


contract MusicDapp {

    address public manager;
    uint public ticketCost;
    uint public capacity;
    mapping(address=>bool) customer;
    uint public crowd;
    string name;
    string description;
    string dateTime;
    string venue;
    string img_url;




    constructor(string concert_name, string concert_desc, uint cost, uint seats, string date_time, string place, string img, address creator) public{

        name=concert_name;
        description=concert_desc;
        ticketCost=cost;
        capacity=seats;
        dateTime= date_time;
        venue=place;
        img_url=img;
        manager= creator;

    }

    function buy() public payable {
        require(msg.value==ticketCost);
        require(crowd<capacity);
        customer[msg.sender]= true;
        crowd++;

    }


    function getSummary() public view returns (
      string, string, uint, uint, string, string, string, address
      ){
        return(
          name,
          description,
          ticketCost,
          capacity,
          dateTime,
          venue,
          img_url,
          manager
          );
      }

    function checkTicket(address a) public view returns(string){
        if(customer[a]==true)
            return "Valid Ticket!!!";
        else
            return "Invalid Ticket!!!";

}

}
