contract StockPhotos {
    struct Photo{
      address author;
      string title;
      string tags;
      string photoID;
      string thumbnailID;
      uint timestamp;
      uint price;
      uint downloads;
      mapping(address => uint) usersPaid;
    }


address public owner;
uint public numPhotos;
mapping(bytes32 => Photo) photos;
mapping (uint => bytes32) photosIndex;

function StockPhotos() {
  owner = msg.sender;
  numPhotos = 0;
}

function newPhoto(string _photoIDString,string _thumbnailIDString,string _title,string _tags,uint _price) returns (bool) {
  bytes32 _photoID = stringToBytes(_photoIDString);
  bytes32 _thumbnailID = stringToBytes(_thumbnailIDString);
  if(photoExists(_thumbnailIDString)){
    return false;
  }else {
    Photo p = photos[_thumbnailID];
    p.author = msg.sender;
    p.title = _title;
    p.tags = _tags;
    p.photoID = _photoIDString;
    p.thumbnailID = _thumbnailIDString;
    p.timestamp = block.timestamp;
    p.price = _price;
    p.downloads = 0;
    photosIndex[numPhotos] = _thumbnailID;
    numPhotos++;
    return true;
  }
}


function photoExists(string _thumbnailIDString) returns (bool){
  bytes32 _thumbnailID = stringToBytes(_thumbnailIDString);
  if(photos[_thumbnailID].timestamp > 0){
    return true;
  }else {
    return false;
  }
}

function getPhotoWithID(string _thumbnailIDString) returns (string){
  bytes32 _thumbnailID = stringToBytes(_thumbnailIDString);
  if(photos[_thumbnailID].usersPaid[msg.sender]==0){
    throw;
  }
  return photos[_thumbnailID].photoID;
}


function getPhotoWithIndex(uint index) returns (string thumbnailID,address author,string title,string tags,uint timestamp,uint price,uint downloads){
  thumbnailID = photos[photosIndex[index]].thumbnailID;
  author = photos[photosIndex[index]].author;
  title =  photos[photosIndex[index]].title;
  tags = photos[photosIndex[index]].tags;
  timestamp = photos[photosIndex[index]].timestamp;
  price = photos[photosIndex[index]].price;
  downloads = photos[photosIndex[index]].downloads;
}

function buyPhoto(string _thumbnailIDString) payable {
  bytes32 _thumbnailID = stringToBytes(_thumbnailIDString);
  if(msg.value<photos[_thumbnailID].price){

  }
  photos[_thumbnailID].downloads +=1;
  photos[_thumbnailID].usersPaid[msg.sender] = msg.value;
}

function destroy() {
  if(msg.sender == owner){
    suicide(owner);
  }
}

function stringToBytes(string s) returns (bytes32){
  bytes memory b = bytes(s);
  uint r = 0;
  for (uint i =0;i<32;i++) {
    if(i < b.length) {
      r = r | uint(b[i]);
    }
    if(i<31) r = r * 256;
  }
  return bytes32(r);
}
}
