/**
 * Created by comnic on 2018. 2. 25..
 */

var web3Provider;
var web3;

var sc_code = "60606040526000600555341561001457600080fd5b604051602080610d0d83398101604052808051906020019091905050600060058190555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620f424060028190555050610c3a806100d36000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806370a08231146100935780637acc0b20146100e057806383e9b955146103345780638fe7063a146103f5578063b0a317531461041e578063d96a094a14610447578063eea4c86414610477578063f7c618c1146104b9575b600080fd5b341561009e57600080fd5b6100ca600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061050e565b6040518082815260200191505060405180910390f35b34156100eb57600080fd5b6101016004808035906020019091905050610526565b604051808b81526020018a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001898152602001806020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200187815260200186815260200185815260200184810384528c8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102145780601f106101e957610100808354040283529160200191610214565b820191906000526020600020905b8154815290600101906020018083116101f757829003601f168201915b505084810383528a8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102975780601f1061026c57610100808354040283529160200191610297565b820191906000526020600020905b81548152906001019060200180831161027a57829003601f168201915b505084810382528881815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561031a5780601f106102ef5761010080835404028352916020019161031a565b820191906000526020600020905b8154815290600101906020018083116102fd57829003601f168201915b50509d505050505050505050505050505060405180910390f35b341561033f57600080fd5b6103db600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506105c6565b604051808215151515815260200191505060405180910390f35b341561040057600080fd5b61040861079a565b6040518082815260200191505060405180910390f35b341561042957600080fd5b6104316107a0565b6040518082815260200191505060405180910390f35b61045d60048080359060200190919050506107a6565b604051808215151515815260200191505060405180910390f35b341561048257600080fd5b6104b7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061089d565b005b34156104c457600080fd5b6104cc61095e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60036020528060005260406000206000915090505481565b60048181548110151561053557fe5b90600052602060002090600a02016000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002019080600301549080600401908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060190806007015490806008015490806009015490508a565b60006105d0610984565b600560008154809291906001019190505581600001818152505033816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505084816040018190525083816060018181525050828160800181905250428160e00181815250506004805480600101828161065c9190610a16565b91600052602060002090600a020160008390919091506000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190805190602001906106df929190610a48565b50606082015181600301556080820151816004019080519060200190610706929190610a48565b5060a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c082015181600601908051906020019061076a929190610a48565b5060e082015181600701556101008201518160080155610120820151816009015550505060019150509392505050565b60025481565b60055481565b60008060055483111515156107ba57600080fd5b80600301543373ffffffffffffffffffffffffffffffffffffffff1631101515156107e457600080fd5b6004838154811015156107f357fe5b90600052602060002090600a020190503373ffffffffffffffffffffffffffffffffffffffff166108fc82600301549081150290604051600060405180830381858888f19350505050151561084757600080fd5b338160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504281600801819055506001915050919050565b8173ffffffffffffffffffffffffffffffffffffffff1660405180807f7365744e2875696e743235362900000000000000000000000000000000000000815250600d01905060405180910390207c01000000000000000000000000000000000000000000000000000000009004826040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060006040518083038160008761646e5a03f192505050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6101406040519081016040528060008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016109bd610ac8565b8152602001600081526020016109d1610ac8565b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016109fb610ac8565b81526020016000815260200160008152602001600081525090565b815481835581811511610a4357600a0281600a028360005260206000209182019101610a429190610adc565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a8957805160ff1916838001178555610ab7565b82800160010185558215610ab7579182015b82811115610ab6578251825591602001919060010190610a9b565b5b509050610ac49190610ba1565b5090565b602060405190810160405280600081525090565b610b9e91905b80821115610b9a576000808201600090556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600282016000610b2a9190610bc6565b6003820160009055600482016000610b429190610bc6565b6005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600682016000610b799190610bc6565b60078201600090556008820160009055600982016000905550600a01610ae2565b5090565b90565b610bc391905b80821115610bbf576000816000905550600101610ba7565b5090565b90565b50805460018160011615610100020316600290046000825580601f10610bec5750610c0b565b601f016020900490600052602060002090810190610c0a9190610ba1565b5b505600a165627a7a723058204b578ad5bb50287afa1d360ab29dd6e849dd8d243ec9828381468c6376b44d610029";
var sc_abi = [ { "constant": true, "inputs": [], "name": "rewardToken", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardMulti", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "products", "outputs": [ { "name": "goodId", "type": "uint256" }, { "name": "seller", "type": "address" }, { "name": "title", "type": "string" }, { "name": "price", "type": "uint256" }, { "name": "summary", "type": "string" }, { "name": "buyer", "type": "address" }, { "name": "deliveryNo", "type": "string" }, { "name": "registDt", "type": "uint256" }, { "name": "buyDt", "type": "uint256" }, { "name": "confirmDt", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "productCnt", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "p_id", "type": "uint256" } ], "name": "buy", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_e", "type": "address" }, { "name": "_n", "type": "uint256" } ], "name": "callSetN", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_title", "type": "string" }, { "name": "_price", "type": "uint256" }, { "name": "_summary", "type": "string" } ], "name": "regProduct", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "tokenAddress", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
var sc_address = "0xa78c9fa1b9d2fdd602676506fc1fb7ea3dcff6c4";
var Contract;
var UsedGoodsShop;

//var sc_token_abi;
// $.getJSON( "contract/BDGToken_ABI.json", function( data ) {
//     sc_token_abi = data;
// });

var sc_token_code = "60606040526012600360006101000a81548160ff021916908360ff160217905550600160075560016008556103e860095534156200003c57600080fd5b60405162001af038038062001af083398101604052808051906020019091908051820191906020018051820191905050828282336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600360009054906101000a900460ff1660ff16600a0a8302600481905550600454600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600190805190602001906200012b92919062000151565b5080600290805190602001906200014492919062000151565b5050505050505062000200565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200019457805160ff1916838001178555620001c5565b82800160010185558215620001c5579182015b82811115620001c4578251825591602001919060010190620001a7565b5b509050620001d49190620001d8565b5090565b620001fd91905b80821115620001f9576000816000905550600101620001df565b5090565b90565b6118e080620002106000396000f30060606040526004361061013e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305fefda71461023c57806306fdde0314610268578063095ea7b3146102f657806318160ddd1461035057806323b872dd14610379578063313ce567146103f257806342966c68146104215780634b7503341461045c57806370a082311461048557806379c65068146104d257806379cc67901461051457806380cec9171461056e5780638620410b146105915780638da5cb5b146105ba57806395d89b411461060f578063a6f2ae3a1461069d578063a9059cbb146106a7578063b414d4b6146106e9578063b5f3b1501461073a578063cae9ca5114610763578063dd62ed3e14610800578063e4849b321461086c578063e724529c1461088f578063f2fde38b146108d3575b60006009543402905080600560008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156101b657600080fd5b6101e26000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16338361090c565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050505050005b341561024757600080fd5b6102666004808035906020019091908035906020019091905050610bc4565b005b341561027357600080fd5b61027b610c31565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102bb5780820151818401526020810190506102a0565b50505050905090810190601f1680156102e85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561030157600080fd5b610336600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610ccf565b604051808215151515815260200191505060405180910390f35b341561035b57600080fd5b610363610d5c565b6040518082815260200191505060405180910390f35b341561038457600080fd5b6103d8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610d62565b604051808215151515815260200191505060405180910390f35b34156103fd57600080fd5b610405610e8f565b604051808260ff1660ff16815260200191505060405180910390f35b341561042c57600080fd5b6104426004808035906020019091905050610ea2565b604051808215151515815260200191505060405180910390f35b341561046757600080fd5b61046f610fa6565b6040518082815260200191505060405180910390f35b341561049057600080fd5b6104bc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610fac565b6040518082815260200191505060405180910390f35b34156104dd57600080fd5b610512600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610fc4565b005b341561051f57600080fd5b610554600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611135565b604051808215151515815260200191505060405180910390f35b341561057957600080fd5b61058f600480803590602001909190505061134f565b005b341561059c57600080fd5b6105a46113b4565b6040518082815260200191505060405180910390f35b34156105c557600080fd5b6105cd6113ba565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561061a57600080fd5b6106226113df565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610662578082015181840152602081019050610647565b50505050905090810190601f16801561068f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6106a561147d565b005b34156106b257600080fd5b6106e7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061149d565b005b34156106f457600080fd5b610720600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506114ac565b604051808215151515815260200191505060405180910390f35b341561074557600080fd5b61074d6114cc565b6040518082815260200191505060405180910390f35b341561076e57600080fd5b6107e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506114d2565b604051808215151515815260200191505060405180910390f35b341561080b57600080fd5b610856600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611650565b6040518082815260200191505060405180910390f35b341561087757600080fd5b61088d6004808035906020019091905050611675565b005b341561089a57600080fd5b6108d1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506116f1565b005b34156108de57600080fd5b61090a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611816565b005b60008273ffffffffffffffffffffffffffffffffffffffff161415151561093257600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561098057600080fd5b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401111515610a0e57600080fd5b600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151515610a6757600080fd5b600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151515610ac057600080fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c1f57600080fd5b81600781905550806008819055505050565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cc75780601f10610c9c57610100808354040283529160200191610cc7565b820191906000526020600020905b815481529060010190602001808311610caa57829003601f168201915b505050505081565b600081600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001905092915050565b60045481565b6000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610def57600080fd5b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550610e8484848461090c565b600190509392505050565b600360009054906101000a900460ff1681565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610ef257600080fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a260019050919050565b60075481565b60056020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561101f57600080fd5b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806004600082825401925050819055503073ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a38173ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b600081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561118557600080fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561121057600080fd5b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816004600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a26001905092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113aa57600080fd5b8060098190555050565b60085481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156114755780601f1061144a57610100808354040283529160200191611475565b820191906000526020600020905b81548152906001019060200180831161145857829003601f168201915b505050505081565b60006008543481151561148c57fe5b04905061149a30338361090c565b50565b6114a833838361090c565b5050565b600a6020528060005260406000206000915054906101000a900460ff1681565b60095481565b6000808490506114e28585610ccf565b15611647578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156115dc5780820151818401526020810190506115c1565b50505050905090810190601f1680156116095780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b151561162a57600080fd5b6102c65a03f1151561163b57600080fd5b50505060019150611648565b5b509392505050565b6006602052816000526040600020602052806000526040600020600091509150505481565b60075481023073ffffffffffffffffffffffffffffffffffffffff16311015151561169f57600080fd5b6116aa33308361090c565b3373ffffffffffffffffffffffffffffffffffffffff166108fc60075483029081150290604051600060405180830381858888f1935050505015156116ee57600080fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561174c57600080fd5b80600a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507f48335238b4855f35377ed80f164e8c6f3c366e54ac00b96a6402d4a9814a03a58282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001821515151581526020019250505060405180910390a15050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561187157600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820f535225404289415998e3a5db23d9e647b147a0927f00cbadc3db3e8e36f451d0029";

var sc_token_abi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "frozenAccount", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardTimes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" } ], "name": "freezeAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": false, "inputs": [ { "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" } ], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" } ], "name": "FrozenFunds", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "burnFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" } ], "name": "setPrices", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "times", "type": "uint256" } ], "name": "setRewardTimes", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ];
var sc_token_address = "0x9ebce74efdab6bd234c621dbdecac4407c6e0325";
var BDGToken;

(function() {
    'use strict';

    init();

    updateBalance();

    getProductList();

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

        var p_name = $("#pName").val();
        var p_summary = $("#pSummary").val();
        var p_price = $("#pPrice").val();

        const transactionObject = {
            from: "0x8EfB0Ee0cA572CB26F9160A2EB381813dF1E1Cc4",
            gas: web3.toHex(300000),
            gasPrice: web3.toHex(web3.eth.gasPrice)
        };

        UsedGoodsShop.regProduct.sendTransaction(p_name, p_price, p_summary, transactionObject,
            (error, result) => {
                console.log(result);
            }
        );

        alert('등록되었습니다. 제품 등록까지 최대 수분이 소요될 수 있습니다.');

    });

})();


function init(){
    initWeb3();

    atContractUGS();
}

function initWeb3() {
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
    });
}

function atContractUGS(){
    Contract = web3.eth.contract(sc_abi);
    UsedGoodsShop = Contract.at(sc_address);

    Contract = web3.eth.contract(sc_token_abi);
    BDGToken = Contract.at(sc_token_address);
}

function updateBalance() {
    //var address = sc_address;//web3.eth.accounts[0];
    //var balance = web3.fromWei(web3.eth.getBalance(address), 'ether');
    var address = sc_address;
    var balance = web3.fromWei(BDGToken.balanceOf(address), 'ether');

    $('#address').html(address);
    $('#balanceAmount').html(balance + " BDG(Token)");
}

function getProductList(){
    var p_cnt = UsedGoodsShop.productCnt.call();

    for(var i = 0 ; i < p_cnt ; i++){
        var item = UsedGoodsShop.products.call(i);

        console.log(item);

        $(".product-name").html(item[2]);
        $(".product-summary").html("No."+String(item[0]) + " 등록자 : " + item[1] + "<br>" + item[4]);
        $(".product-price").html(String(item[3]));

    }

}





function sendTransaction() {
    web3.personal.unlockAccount(web3.eth.accounts[0],'1111');

    var toAddress = $('#toAddress').val();
    var sendAmount = web3.toWei($('#sendAmount').val(), 'ether');

    var txHash = web3.eth.sendTransaction({
        from: web3.eth.accounts[0],
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

