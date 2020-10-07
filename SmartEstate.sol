pragma solidity 0.4.26;
/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address internal owner;

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner call this function");
        _;
    }

}


contract SellerInfo  {
    bytes32 internal sellerName;
    bytes32 internal sellerAddress;
    bytes32 internal sellerCity;
    bytes32 internal sellerCountry;
    bytes32 internal sellerPhone;
    
     constructor (bytes32 _sellerName, bytes32 _sellerAddress, bytes32 _sellerCity,
     bytes32 _sellerCountry, bytes32 _sellerPhone) internal {

        sellerName = _sellerName;
        sellerAddress = _sellerAddress;
        sellerCity = _sellerCity;
        sellerCountry = _sellerCountry;
        sellerPhone = _sellerPhone;
    }
    
    function getSellerInfo() public view returns (bytes32 _sellerName, bytes32 _sellerAddress, bytes32 _sellerCity,
     bytes32 _sellerCountry, bytes32 _sellerPhone) {
         _sellerName = sellerName;
        _sellerAddress = sellerAddress;
        _sellerCity = sellerCity;
        _sellerCountry = sellerCountry;
        _sellerPhone = sellerPhone;

     }
    
}

contract PurchaserInfo  {
    bytes32 internal purchaserName;
    bytes32 internal purchaserAddress;
    bytes32 internal purchaserCity;
    bytes32 internal purchaserCountry;
    bytes32 internal purchaserPhone;
    
    function setPurchaser(bytes32 _purchaserName, bytes32 _purchaserAddress, bytes32 _purchaserCity,
     bytes32 _purchaserCountry, bytes32 _purchaserPhone) internal {

        purchaserName = _purchaserName;
        purchaserAddress = _purchaserAddress;
        purchaserCity = _purchaserCity;
        purchaserCountry = _purchaserCountry;
        purchaserPhone = _purchaserPhone;
    }
    
    function getPurchaserInfo() public view returns (bytes32 _purchaserName, bytes32 _purchaserAddress, bytes32 _purchaserCity,
     bytes32 _purchaserCountry, bytes32 _purchaserPhone) {
         
        _purchaserName = purchaserName;
        _purchaserAddress = purchaserAddress;
        _purchaserCity = purchaserCity;
        _purchaserCountry = purchaserCountry;
        _purchaserPhone = purchaserPhone;
     }
    

}

contract SmartEstate is Ownable , PurchaserInfo, SellerInfo {


    bytes32 internal buildingName;
    bytes32 internal unitAddress;
    bytes32 internal unitNumber;
    bytes32 internal city;
    bytes32 internal country;
    bytes32 internal coveredArea;
    bytes32 internal numberOfParking;
    uint internal propertyPrice;
    bool internal isMortage;

    uint internal ownershipChangeCounterOne;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor( bytes32 _sellerName, bytes32 _sellerAddress, bytes32 _sellerCity,
     bytes32 _sellerCountry, bytes32 _sellerPhone,bytes32 _buildingName, bytes32 _unitAddress,
    bytes32 _unitNumber, bytes32 _city, bytes32 _country, bytes32 _coveredArea, bytes32 _numberOfParking, uint _propertyPrice, bool _isMortage) 
    SellerInfo(_sellerName, _sellerAddress, _sellerCity, _sellerCountry, _sellerPhone)

     public{
       
       
        buildingName = _buildingName;
        unitAddress = _unitAddress;
        unitNumber = _unitNumber;
        city = _city;
        country = _country;

        coveredArea = _coveredArea;
        numberOfParking = _numberOfParking;
        propertyPrice = _propertyPrice;
        isMortage = _isMortage;

        ownershipChangeCounterOne = 0;
    }

    function transferOwnership(address newOwner, bytes32 _purchaserName, bytes32 _purchaserAddress, bytes32 _purchaserCity,
     bytes32 _purchaserCountry, bytes32 _purchaserPhone) public onlyOwner  returns (bool) {
        require(newOwner != address(0x0),"address should not be non zero");
        emit OwnershipTransferred(owner, newOwner);
        ownershipChangeCounterOne = ownershipChangeCounterOne + 1;

        if (ownershipChangeCounterOne > 1) {
            sellerName = purchaserName;
            sellerAddress = purchaserAddress;
            sellerCity = purchaserCity;
            sellerCountry = purchaserCountry;
            sellerPhone = purchaserPhone;
        }

        owner = newOwner;
        setPurchaser(_purchaserName, _purchaserAddress, _purchaserCity, _purchaserCountry, _purchaserPhone);

        return true;
    }

    function setNewPrice(uint newPrice) public onlyOwner  returns (bool) {
        propertyPrice = newPrice;
        return true;
    }
    
    function setMortage(bool _isMortage) public onlyOwner  returns (bool) {
        isMortage = _isMortage;
        return true;
    }
    
    function watchProperty() public view returns(bytes32 _buildingName, bytes32 _unitAddress,
     bytes32 _unitNumber, bytes32 _city, bytes32 _country, bytes32 _coveredArea,
     bytes32 _numberOfParking, uint _propertyPrice, bool _isMortage) {
        
        _buildingName = buildingName;

        _unitAddress = unitAddress;
        _unitNumber = unitNumber;
        _city = city;
        _country = country;
        _coveredArea = coveredArea;
        _numberOfParking = numberOfParking;
        _propertyPrice = propertyPrice;
        _isMortage = isMortage;

    }
   

}