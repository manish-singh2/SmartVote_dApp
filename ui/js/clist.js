$(document).ready(function() {
  $('.modal').modal();
  // $.ajax({
  //    url: '/getaddress',
  //    method: 'post'
  // }).done(function(){
  // 	console.log('done');
  // });

  const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "votedEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  VotingContract = new web3.eth.Contract(abi, '0xD7594F26DF1Af41879a744dAAe02F318841be007'); 
  contractInstance = VotingContract;


  //check cookie
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  var aadhaar_list = {
    // use your own number and assign the address from ganache
		"98xxxxxxxx": "0x02f9E08E8382A63815B86109Ad158297C739e1d7",
    "70xxxxxxxx": "0xc41084438089e7BD35DEFf7eb5c014DD7a5cfcA8"
  }

  var aadhaar = readCookie('aadhaar');

  console.log(aadhaar);
  var address = aadhaar_list[aadhaar];
  console.log(address);
  $('#loc_info').text('Location based on Aadhaar : ' + address)

  function disable() {
    $('#vote1').addClass("disabled");
    $('#vote2').addClass("disabled");
    $('#vote3').addClass("disabled");
    $('#vote4').addClass("disabled");

    //logout
    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    window.location = '/app';


  }

  str = document.cookie.split('; ');
  const cookie_result = {};
  for (let i in str) {
    const cur = str[i].split('=');
    cookie_result[cur[0]] = cur[1];
  }

  const aadhar_mapping = {
    //  Use your own number here and asiign the address from ganache
    "98xxxxxxxx": "0x02f9E08E8382A63815B86109Ad158297C739e1d7",
    "70xxxxxxxx": "0xc41084438089e7BD35DEFf7eb5c014DD7a5cfcA8"
  }

  console.log(cookie_result['aadhaar']);


  const voter_account = aadhar_mapping[cookie_result['aadhaar']];

  // var i = 0
  $('#vote1').click(function() {
    contractInstance.methods.vote(1).send({
      from: voter_account
    }).then(function(receipt) {
      console.log(receipt);
      alert('vote submited to Narendra Modi');
      disable();
      $('#loc_info').text('Vote submited successfully to Narendra Modi')
    }).catch(function(error) {
      console.log(error);
      alert('You have already voted');
    });
  })
  $('#vote2').click(function() {
    contractInstance.methods.vote(2).send({
      from: voter_account
    }).then(function(receipt) {
      console.log(receipt);
      alert('vote submited to Rahul Gandhi');
      disable();
      $('#loc_info').text('Vote submited successfully to Rahul Gandhi')
    }).catch(function(error) {
      console.log(error);
      alert('You have already voted');
    });
  })
  $('#vote3').click(function() {
    contractInstance.methods.vote(3).send({
      from: voter_account
    }).then(function(receipt) {
      console.log(receipt);
      alert('vote submited to Sharad Pawar');
      disable();
      $('#loc_info').text('Vote submited successfully to Sharad Pawar')
    }).catch(function(error) {
      console.log(error);
      alert('You have already voted');
    });
  })
  $('#vote4').click(function() {
    contractInstance.methods.vote(4).send({
      from: voter_account
    }).then(function(receipt) {
      console.log(receipt);
      alert('vote submited to Uddhav Thackeray');
      disable();
      $('#loc_info').text('Vote submited successfully to Uddhav Thackeray')
    }).catch(function(error) {
      console.log(error);
      alert('You have already voted');
    });
  })
});
