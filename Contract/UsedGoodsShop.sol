pragma solidity ^0.4.13;

interface token {
    function transfer(address from, address to, uint value);
}

contract UsedGoodsShop {
    address owner;
    token public rewardToken;
    uint public rewardMulti;
    
    mapping (address => uint) public balanceOf;
    
    struct Product{
        uint goodId;
        address seller;
        string title;
        uint price;
        string summary;
        
        address buyer;
        string deliveryNo;
        uint256 registDt;
        uint256 buyDt;
        uint256 confirmDt;
    }
    
    Product[] public products;
    uint public productCnt = 0;
    
    function UsedGoodsShop(address tokenAddress){
        productCnt = 0;
        rewardToken = token(tokenAddress);
        
        owner = msg.sender;
        rewardMulti = 1000000;
    }
    
    function regProduct(string _title, uint _price, string _summary) public returns(bool){
        Product memory p;// = Product({goodId: _goodId, seller: _seller, price: _price, summary: _summary});
        p.goodId = productCnt++;
        p.seller = msg.sender;
        p.title = _title;
        p.price = _price;
        p.summary = _summary;
        p.registDt = now;
        
        products.push(p);

        return true;
    }
    
    function buy(uint p_id) payable returns(bool){
        require(p_id <= productCnt);
        require(msg.sender.balance >= p.price);//balanceOf[msg.sender] 
        
        Product p = products[p_id];
        
        require(msg.sender.send(p.price));
        
        p.buyer = msg.sender;
        p.buyDt = now;
        
        return true;
    }
    
    // Other contract call.
    function callSetN(address _e, uint _n) {
        _e.call(bytes4(sha3("setN(uint256)")), _n); // E's storage is set, D is not modified 
    }


}

contract DateTime {
        function getYear(uint timestamp) public constant returns (uint16);
        function getMonth(uint timestamp) public constant returns (uint8);
        function getDay(uint timestamp) public constant returns (uint8);
}

