pragma solidity ^ 0.4 .11;
contract productLocation {

  struct Location {
    string productName;
    string location;
  }

  //proLoc proloc;
  mapping(uint => Location[]) geoloc;
  uint public prodCnt;
  uint public i;
  event test_value(uint256 indexed value1);
  address public creator;

  function productLocation() {
    creator = msg.sender;
    prodCnt = 0;
    i = 0;
  }

  function addProdInfo(uint rfId, string _productName, string _location) public {

    geoloc[rfId].push(Location(_productName, _location));

    prodCnt++;
  }

  function getCount() public constant returns(uint) {
    return prodCnt;
  }

    function getrfIdCount(uint rfId) public constant returns(uint) {
      uint rfIdcnt = geoloc[rfId].length;
      return rfIdcnt;
    }

  function getProductDetails(uint rfId,uint b) public returns(string) {

    return  geoloc[rfId][b].location;


  }

  function destroy() {
    if (msg.sender == creator) {
      suicide(creator);
    }

  }
}
