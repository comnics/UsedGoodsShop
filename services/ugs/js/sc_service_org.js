/**
 * Created by comnic on 2018. 2. 25..
 */
//$.getScript("js/sc_util.js");


App = {
    web3Provider: null,
    contracts: {},
    sc_address : "0x6fdfbc480fdb12d7b6d764d399b644ea20122520",
    sc_token_address : "0x47021453792cea318d24837f8da1b33d526d6b80",

    init: function () {
        // Load pets.
        $.getJSON('contract/UsedGoodsShopABI.json', function (data) {
            this.sc_abi = data;

            $.getJSON('contract/bdgtABI.json', function (data) {
                this.sc_token_abi = data;

                return App.initWeb3();
            });

        });

    },

    initWeb3: function () {
        /*
         * Replace me...
         */

        return App.initContract();
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});

var site_log = new SiteLOG();

var web3Provider;
var web3;

var sc_abi = '';
var sc_address = "0x6fdfbc480fdb12d7b6d764d399b644ea20122520";
var Contract;
var UsedGoodsShop;

//var sc_token_abi;
// $.getJSON( "contract/BDGToken_ABI.json", function( data ) {
//     sc_token_abi = data;
// });

var sc_token_abi = '';
var sc_token_address = "0x47021453792cea318d24837f8da1b33d526d6b80";//"0x9ebce74efdab6bd234c621dbdecac4407c6e0325";
var BDGToken;


/* Variables */
var cAccounts = [];
var default_account = 0x00;
var contract_token_balance = 0;
var p_cnt = 0;
var gas_price = 0;

(function() {
    'use strict';

    init();

    getAccount();

    updateBalance();

    UsedGoodsShop.productCnt.call((err, res) => {
        if(!err){
            p_cnt = res;
            if(p_cnt > 0)
                getProductList();
        }
    });



    //Contract = web3.eth.contract(sc_abi);
    //UsedGoodsShop = Contract.at(sc_address);

    //var p1 = UsedGoodsShop.getProductInfo(1);
    //console.log(p1);

    //var blockFilter = web3.eth.filter('latest');
    //blockFilter.watch(function(error, blockHash) {
    //    var block = web3.eth.getBlock(blockHash);
    //    //appendLog('New Block('+block.number+')['+block.hash+'] / ' + block.transactions.length + ' TXs');
    //});


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

        UsedGoodsShop.regProduct.sendTransaction(p_name, p_price, p_summary, p_image, transactionObject, (err, res) => {
            if(!err){
                console.log(res);
                site_log.println("Product Registration Tx info : <a href=\"https://testnet.etherscan.io/tx/" + res + "\" target=\"_blank\">" + res + "</a>");
            }
        });

        UsedGoodsShop.RegProduct().watch(function(err, res){
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

        UsedGoodsShop.buy.sendTransaction(p_id, transactionObject, function(err, res){
            if(!err){
                console.log(res);
                site_log.println("Buy Product Tx info : <a href='https://ropsten.etherscan.io/tx/"+ res + "' target='_blank'>" + res + "</a>");

                alert('상품 구입 Tx이 생성되었습니다.');

            }else{console.log(err); alert('상품 구입에 실패 했습니다. 잠시 후 다시 이용해 주세요!');}
        });

        UsedGoodsShop.BuyProduct().watch(function(err, res){
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

})();


function init(){
    site_log.println("UGS Init");

    initWeb3();

    atContractUGS();

    web3.eth.getGasPrice(function(err, res){
        if(!err)
            gas_price = web3.toHex(res);
    });

}

function initWeb3() {
    site_log.println("Web3 Init");

    var Web3 = require('web3');

    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/nFnPWCftPWfUdCseeOTz"));
    }

    web3.eth.getAccounts((err, res) => {
        console.log(res[0]);
        if(!res[0]){
            alert("MetaMask가 설치되지 않았거나, 로그인 전입니다. 미설치거나 로그인 하지 않으시면 모든 거래가 불가합니다.");
            return false;
        }
    });
}

function atContractUGS(){
    site_log.println("Create Contract : token, shop");

    Contract = web3.eth.contract(sc_abi);
    UsedGoodsShop = Contract.at(sc_address);

    Contract = web3.eth.contract(sc_token_abi);
    BDGToken = Contract.at(sc_token_address);
}

function updateBalance() {
    site_log.println("Get contract token balance");

    //test : 0x8EfB0Ee0cA572CB26F9160A2EB381813dF1E1Cc4
    //var address = sc_address;//web3.eth.accounts[0];
    //var balance = web3.fromWei(web3.eth.getBalance(address), 'ether');
    var addr = sc_address;
    var balance = 0;//web3.fromWei(BDGToken.balanceOf(address), 'ether');
    BDGToken.balanceOf(addr, (error, result) => {
        if(error == null){
            contract_token_balance = result;//web3.fromWei(result, 'ether');
            $('#balanceAmount').html(parseFloat(contract_token_balance));
            site_log.println("Contract balance : " + contract_token_balance + " BDGT");
        }else{
            console.log(error);
        }
    });


}

function getProductList(){
    site_log.println("Get Products Info from Smart Contract");

    if(!p_cnt || p_cnt <= 0)
        return;

    var pList = $('#productList');
    var pTemplate = $('#productTemplate');

    for(var i = 0 ; i < p_cnt ; i++){
        var item = 0;UsedGoodsShop.products.call(i, function(err, item){
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

    //slick2_init();

}

function getAccount(){
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


function sendTransaction() {
    web3.personal.unlockAccount(web3.eth.accounts[0],'0x8EfB0Ee0cA572CB26F9160A2EB381813dF1E1Cc4');

    var toAddress = $('#toAddress').val();
    var sendAmount = web3.toWei($('#sendAmount').val(), 'ether');

    var txHash = web3.eth.sendTransaction({
        from: web3.eth.coinbase,
        to: toAddress,
        value: sendAmount,
        gas: 21000  //gas는 default가 90000이며, data 필드를 사용하지 않는 기본 Transaction의 Gas는 현재 21,000이다.
    });

    console.log(txHash);
}

//contract Deploy
function deploy(){
    UsedGoodsShop = Contract.new({
        data:code,
        gas:2000000,
        from:web3.eth.accounts[0]
    }, function (error, contract) {
        if (!error) {
            if (!contract.address) {
                _log("Creating Contract : " + contract.transactionHash);
            } else {
                address = contract.address;
                _log("Contract Deployed : " + contract.address);
            }
        } else
            console.error(error);
    });
};

function send() {
    web3.eth.sendTransaction({
        from: web3.eth.coinbase,
        to: '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',
        value: web3.toWei(document.getElementById("amount").value, 'ether')
    }, function(error, result) {
        if (!error) {
            document.getElementById('response').innerHTML = 'Success: <a href="https://testnet.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
            document.getElementById('response').innerHTML = '<pre>' + error + '</pre>'
        }
    })
}

