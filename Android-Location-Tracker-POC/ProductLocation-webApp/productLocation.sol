pragma solidity ^ 0.4 .11;
contract productLocation {

  struct Location {
    string productName;
    string location;
  }

  //proLoc proloc;
  mapping(string => Location[]) geoloc;
  uint public prodCnt;
  uint public i;
  event test_value(uint256 indexed value1);
  address public creator;

  function productLocation() {
    creator = msg.sender;
    prodCnt = 0;
    i = 0;
  }

  function addProdInfo(string rfId, string _productName, string _location) public {

    geoloc[rfId].push(Location(_productName, _location));

    prodCnt++;
  }

function getProductName(string rfId) returns(string){
  return geoloc[rfId][0].productName;
}


    function getrfIdCount(string rfId) public constant returns(uint) {
      uint rfIdcnt = geoloc[rfId].length;
      return rfIdcnt;
    }

  function getProductDetails(string rfId,uint b) public returns(string) {

    return  geoloc[rfId][b].location;


  }

  function destroy() {
    if (msg.sender == creator) {
      suicide(creator);
    }

  }
}
