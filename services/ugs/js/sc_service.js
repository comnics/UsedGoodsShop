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

    initContract: function(){
           site_log.println("Create Contract : token, shop");

            this.contractUGS = this.web3.eth.contract(this.sc_ugs_abi);
            this.UsedGoodsShop = this.contractUGS.at(this.sc_ugs_address);

            this.contractToken = this.web3.eth.contract(this.sc_token_abi);
            this.BDGToken = this.contractToken.at(this.sc_token_address);

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
});

