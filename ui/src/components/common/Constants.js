export const nudgeABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "verdict",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "user",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "proofProvided",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "proof",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "moderator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentState",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "commitment",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "alternativePayout",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "deadlineTime",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_verdict",
				"type": "bool"
			}
		],
		"name": "didCompleteCommitment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "handlePayment",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "noProofAfterDeadline",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "noProofProvided",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "proof",
				"type": "string"
			}
		],
		"name": "proofHasBeenProvided",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proof",
				"type": "string"
			}
		],
		"name": "proveCommitment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_moderator",
				"type": "address"
			},
			{
				"name": "_alternativePayout",
				"type": "address"
			},
			{
				"name": "_commitment",
				"type": "string"
			},
			{
				"name": "_durationMinutes",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "verdict",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "payout",
				"type": "address"
			}
		],
		"name": "verdictDecided",
		"type": "event"
	}
]

export const nudgeFactoryABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			}
		],
		"name": "getContractsList",
		"outputs": [
			{
				"name": "contractsList",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			}
		],
		"name": "getContractCount",
		"outputs": [
			{
				"name": "contractCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "c",
				"type": "address"
			}
		],
		"name": "newContractMade",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_moderator",
				"type": "address"
			},
			{
				"name": "_alternativePayout",
				"type": "address"
			},
			{
				"name": "_commitment",
				"type": "string"
			},
			{
				"name": "_durationMinutes",
				"type": "uint256"
			}
		],
		"name": "newCookie",
		"outputs": [
			{
				"name": "newContract",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]

export const RINKEBY_CONTRACT_FACTORY_ADDRESS = '0x1DF4a755947530aA81eEC403dA84FcE3E671c3ec';
export const INSTANTIATED_CONTRACT_ADDRESS = '0x17e205837a0ffaec6197b946aff5a08a5456f64f';
