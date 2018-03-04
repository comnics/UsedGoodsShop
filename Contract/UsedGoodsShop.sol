pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

interface BDGToken {
    function balanceOf(address addr) external view returns (uint256);
    function approve(address _spender, uint256 _value) external;
    function transfer(address _to, uint256 _value) external ;
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}

contract UsedGoodsShop {
    address owner;
    address tokenAddress;

    enum ProductStatus { SELLING, BUYING, DELIVERING, SOLD }

    event RegProduct(uint256 p_id, string p_name);
    event BuyProduct(uint256 p_id, string p_name, uint256 p_price);
    event DeliveryProduct(uint256 p_id, string p_name, string p_delivery_no);
    event CompleteSelling(uint256 p_id, string p_name);

    event SendToken(address from, address to, uint256 value);

    struct Product{
        uint256 goodId;
        address seller;
        string title;
        uint256 price;
        string summary;
        string imageName;

        address buyer;
        string deliveryNo;

        uint256 registDt;
        uint256 buyDt;
        uint256 completeDt;

        ProductStatus status;
    }

    struct ProductDetail{
        uint256 goodId;

    }

    Product[] public products;

    mapping (uint256 => ProductDetail) productDetail;

    uint public productCnt = 0;

    function UsedGoodsShop(address _tokenAddress) public {
        owner = msg.sender;
        tokenAddress = _tokenAddress;

        regProduct("Basic Product", 1, "Basic Product Summary", "default.png");
    }

    function regProduct(string _title, uint _price, string _summary, string _image) public returns(bool){
        Product memory p;// = Product({goodId: _goodId, seller: _seller, price: _price, summary: _summary});
        p.goodId = productCnt++;
        p.seller = msg.sender;
        p.title = _title;
        p.price = _price;
        p.summary = _summary;
        p.imageName = _image;
        p.registDt = now;

        p.status = ProductStatus.SELLING;

        products.push(p);

        RegProduct(p.goodId, p.title);  //event

        return true;
    }

    // function getProduct(uint256 _id) public view returns(Product){
    //     return products[_id];
    // }

    function buy(uint p_id) public payable returns(bool){

        require(p_id <= productCnt);    //check p_id

        Product storage p = products[p_id];     //gethering product info

        require(p.status == ProductStatus.SELLING); //check product status

        uint256 tBalance = getTokenBalance();   //gethering token balance

        require( tBalance >= p.price);  //check balance

        p.buyer = msg.sender;   //write buyer
        p.status = ProductStatus.BUYING;
        p.buyDt = now;

        sendToken(this, p.price);   //send token to this contract

        BuyProduct(p.goodId, p.title, p.price); //event

        return true;
    }

    function setDeliveryInfo(uint p_id, string p_delivery_no) public{
        require(p_id <= productCnt);    //check p_id

        Product storage p = products[p_id];     //gethering product info

        require(p.status == ProductStatus.BUYING); //check product status

        require(msg.sender == p.seller); //check if msg.sender and seller are equal.
        //require(p.buyer != 0x00); //check if this product is sold.

        p.deliveryNo = p_delivery_no;   //write delivery No.
        p.status = ProductStatus.DELIVERING;

        BDGToken(tokenAddress).approve(this, p.price);  //approve price

        DeliveryProduct(p.goodId, p.title, p.deliveryNo);   //event
    }

    function completeSelling(uint p_id) public{
        require(p_id <= productCnt);    //check p_id

        Product memory p = products[p_id];     //gethering product info

        require(p.status == ProductStatus.DELIVERING); //check product status

        require(msg.sender == p.buyer); //check if msg.sender and byuer are equal.

        p.status = ProductStatus.SOLD;
        p.completeDt = now;

        BDGToken(tokenAddress).transferFrom(this, p.seller, p.price);   //send token to seller from this contract

        CompleteSelling(p.goodId, p.title); //event

    }

    function getTokenBalance() public view returns(uint256){
        return BDGToken(tokenAddress).balanceOf(msg.sender);
    }

    function sendToken(address _to, uint256 _value) public payable {
        BDGToken(tokenAddress).transfer(_to, _value);

        SendToken(msg.sender, _to, _value); //event
    }

}
