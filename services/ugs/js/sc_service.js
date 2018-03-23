/**
 * Created by comnic on 2018. 2. 25..
 */
//$.getScript("js/sc_util.js");

var site_log = new SiteLOG();

if(_debug != "Y")
    site_log.hide();

App = {
    web3Provider: null,
    sc_ugs_abi : '',
    sc_ugs_address : "0x810ed95468aa21b6b7d4f001be706cf8c060c0b1",
    sc_token_abi : '',
    sc_token_address : "0x47021453792cea318d24837f8da1b33d526d6b80",

    UsedGoodsShop: null,
    BDGToken: null,

    /**
     * ABI파일 로딩 후 initWeb3() -> initContract() -> initApp() 호출한다.
     */
    init: function () {
        // Load pets.
        $.getJSON('contract/UsedGoodsShopABI.json', function (data) {
            App.sc_ugs_abi = data;

            $.getJSON('contract/bdgtABI.json', function (data) {
                App.sc_token_abi = data;

                return App.initWeb3();
            });

        });

    },

    /**
     * web3 초기화 한다.
     * @returns {*}
     */
    initWeb3: function () {

            site_log.println("Web3 Init");

            var Web3 = require('web3');

            // Initialize web3 and set the provider to the testRPC.
            if (typeof web3 !== 'undefined') {
                this.web3Provider = web3.currentProvider;
                this.web3 = new Web3(web3.currentProvider);
            } else {
                // set the provider you want from Web3.providers
                this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/nFnPWCftPWfUdCseeOTz"));
            }

            this.web3.eth.getAccounts((err, res) => {
                console.log(res[0]);
            if(!res[0]){
                alert("MetaMask가 설치되지 않았거나, 로그인 전입니다. 미설치거나 로그인 하지 않으시면 모든 거래가 불가합니다.");
                return false;
            }
        });

        return App.initContract();
    },

    /**
     * Token과 UGS contract를 초기화 한다.
     */
    initContract: function(){
        site_log.println("Create Contract : token, shop");

        this.contractUGS = this.web3.eth.contract(this.sc_ugs_abi);
        this.UsedGoodsShop = this.contractUGS.at(this.sc_ugs_address);

        this.contractToken = this.web3.eth.contract(this.sc_token_abi);
        this.BDGToken = this.contractToken.at(this.sc_token_address);

        this.initApp();

    },

    /**
     * App을 초기화 한다.
     *  updateBalance()
     *  getAccount()
     *  등록상품수를 구한 뒤 getProductList()를 호출한다. : TODO: 개선해야함.
     */
    initApp: function(){
        this.updateBalance();
        this.getAccount();

        this.UsedGoodsShop.productCnt.call((err, res) => {
            if(!err){
            p_cnt = res;
            if(p_cnt > 0)
                this.getProductList(p_cnt);
            }
        });

    },

    /**
     * UGS 컨트랙트가 가지고 있는 Token의 잔고를 구한다.
     * 이는 구매등을 통해 컨트랙트에 escrow개념으로 머물러 있는 Token이다.
     */
    updateBalance: function() {
        site_log.println("Get contract token balance");

        var addr = this.sc_ugs_address;
        var balance = 0;//web3.fromWei(BDGToken.balanceOf(address), 'ether');
        this.BDGToken.balanceOf(addr, (error, result) => {
            if(error == null){
                contract_token_balance = result;//web3.fromWei(result, 'ether');
                $('#balanceAmount').html(parseFloat(contract_token_balance));
                site_log.println("Contract balance : " + contract_token_balance + " BDGT");
            }else{
                console.log(error);
            }
        });


    },

    /**
     * 상품의 개수 만큼 가져와서 화면에 출력한다.
     * @param p_cnt
     */
    getProductList: function(p_cnt){
        site_log.println("Get Products Info from Smart Contract");

        if(!p_cnt || p_cnt <= 0)
            return;

        var pList = $('#productList');
        var pTemplate = $('#productTemplate');

        for(var i = 0 ; i < p_cnt ; i++){
            var item = 0;
            this.UsedGoodsShop.products.call(i, function(err, item){
                if(!err){
                    site_log.println("Get Product info : " + item);
                    console.log(item);

                    var domItem = $(pTemplate).clone();

                    var strBtn = "<button class=\"btn-product-buy flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4\" tabindex=\"0\" data-product-id=\""+parseInt(item[0])+"\"> Buy </button>";
                    $(".block2-btn-addcart", domItem).html(strBtn);//.data("product-seller", item[1]).data("product-price", parseInt(item[3]));


                    var pName = item[2];

                    if(parseInt(item[11]) == 1){
                        $(".btn-product-buy", domItem).html("Trading!").removeClass("btn-product-buy");
                        pName += "(<span class='fc-blue'>Trading</span>)";
                    }

                    if(parseInt(item[11]) == 3){
                        $(".btn-product-buy", domItem).html("SOLD OUT!").removeClass("btn-product-buy");
                        pName += "(<span class='fc-red'>SOLD OUT</span>)";
                    }

                    $(".product-name", domItem).html(pName);
                    $(".product-summary", domItem).html("No."+String(item[0]) + " 등록자 : " + item[1] + "<br>" + item[4]);
                    $(".product-price", domItem).html(String(item[3]) + " BDGT");
                    $(".product-seller", domItem).html(item[1]);
                    $(".product-image", domItem).attr("src", "uploads/" + item[5]);


                    $("#productList").append($(domItem).html());


                }
            });

        }

    },

    /**
     * Account를 구하고 첫번째 account를 default_account로 지정한다.
     */
    getAccount: function(){
        web3.eth.getAccounts(function(error, accounts) {
            if(!error) {
                cAccounts = accounts;
                default_account = cAccounts[0];
                $('#regProductSellerAddress').val(default_account);
            }
            else
                console.log(error);
        });
    }

};

$(function() {
    App.init();

    /**
     * click 이벤트를 정의 한다.
     */

    $("#productRegBtn").click(function(){

        var p_name = $("#regProductName").val();
        var p_summary = $("#regProductSummary").val();
        var p_price = $("#regProductPrice").val();
        var p_image = $("#regProductImage").val();

        if(p_name == "" || p_summary == "" || p_price == ""){
            alert('상품 등록을 위한 값을 모두 입력하셔야 합니다.');

            return false;
        }

        const transactionObject = {
            from: cAccounts[0],
            gas: web3.toHex(300000),
            gasPrice: gas_price
        };

        site_log.println("Product Registration : " + p_name);

        App.UsedGoodsShop.regProduct.sendTransaction(p_name, p_price, p_summary, p_image, transactionObject, (err, res) => {
            if(!err){
                console.log(res);
                site_log.println("Product Registration Tx info : <a href=\"https://testnet.etherscan.io/tx/" + res + "\" target=\"_blank\">" + res + "</a>");
            }
        });

        App.UsedGoodsShop.RegProduct().watch(function(err, res){
            if(!err){
                console.log(res);
                site_log.println("Callback Product Registration Tx info Start >> ");
                site_log.println("address : " + res.address);
                site_log.println("blockHash : " + res.blockHash);
                site_log.println("blockNumber : " + res.blockNumber);
                site_log.println("transactionHash : " + res.transactionHash);
                site_log.println("address : " + res.address);

                alert('등록되었습니다. 제품 등록까지 최대 수분이 소요될 수 있습니다.');
            }
        });

    });


    $("#productList").on("click", ".btn-product-buy", function(){

        var p_id = $(this).data("product-id");
        var p_seller = $(this).data("product-seller");
        var p_price = $(this).data("product-price");

        const transactionObject = {
            from: cAccounts[0],
            gas: web3.toHex(300000),
            gasPrice: gas_price
        };

        site_log.println("Buy Product : " + p_id);

        App.UsedGoodsShop.buy.sendTransaction(p_id, transactionObject, function(err, res){
            if(!err){
                console.log(res);
                site_log.println("Buy Product Tx info : <a href='https://ropsten.etherscan.io/tx/"+ res + "' target='_blank'>" + res + "</a>");

                alert('상품 구입 Tx이 생성되었습니다.');

            }else{console.log(err); alert('상품 구입에 실패 했습니다. 잠시 후 다시 이용해 주세요!');}
        });

        App.UsedGoodsShop.BuyProduct().watch(function(err, res){
            if(!err){
                console.log(res);
                site_log.println("Callback Buy Product Tx info Start >> ");
                site_log.println("address : " + res.address);
                site_log.println("blockHash : " + res.blockHash);
                site_log.println("blockNumber : " + res.blockNumber);
                site_log.println("transactionHash : " + res.transactionHash);
                site_log.println("address : " + res.address);

                alert('상품 구입 요청이 처리 되었습니다.\n상품 수령 후 꼭 구매완료 버튼을 클릭해 주세요!');
            }

        });
    });

});

