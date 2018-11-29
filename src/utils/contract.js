export function getContract (web3) {
  let ABI = [{
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': '_owner',
      'type': 'address'
    }],
    'name': 'balanceOf',
    'outputs': [{
      'name': 'balance',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': '_to',
      'type': 'address'
    },
    {
      'name': '_value',
      'type': 'uint256'
    }
    ],
    'name': 'transfer',
    'outputs': [{
      'name': '',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [{
      'indexed': true,
      'name': 'from',
      'type': 'address'
    },
    {
      'indexed': true,
      'name': 'to',
      'type': 'address'
    },
    {
      'indexed': false,
      'name': 'value',
      'type': 'uint256'
    }
    ],
    'name': 'Transfer',
    'type': 'event'
  }
  ]

  let contractAddress = '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa'
  let myContract = web3.eth.contract(ABI)
  let ContractInstance = myContract.at(contractAddress)
  return ContractInstance
}
