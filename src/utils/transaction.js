import Web3 from 'web3'
import store from '../store'
import abi from 'ethereumjs-abi'
import TX from 'ethereumjs-tx'
// import { getContract } from './contract'

let web3
getWeb3()

function getWeb3 () {
  const provider = {
    '1': 'https://mainnet.infura.io/v3/323e44018f994f0c97025d409eb79344',
    '3': 'https://ropsten.infura.io/v3/323e44018f994f0c97025d409eb79344',
    '4': 'https://rinkeby.infura.io/v3/323e44018f994f0c97025d409eb79344',
    '42': 'https://kovan.infura.io/v3/323e44018f994f0c97025d409eb79344'
  }
  web3 = new Web3(new Web3.providers.HttpProvider(provider[store.state.network]))
}

// function getNetwork () {
//   var version = web3.version.network
//   store.commit('setNetwork', version)
// }
export function getBalance () {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(store.state.wallet.address, (error, result) => {
      if (!error) {
        let amount = parseInt(result, 10) / Math.pow(10, 18)
        store.commit('setAmount', amount)
        resolve(amount)
      } else {
        console.error(error)
      }
    })
  })
}
export async function getTokenBalance (address, contractAddr) {
  return new Promise((resolve, reject) => {
    // let balance = await myContract.balanceOf(address).call()

    let encoded = '0x' + abi.simpleEncode('balanceOf(address)', address).toString('hex')
    let balance
    let decimals = 18
    // 调用合约方法
    web3.eth.call({
      to: contractAddr,
      data: encoded
    }, (error, result) => {
      if (!error) {
        balance = parseInt(result, 16) / Math.pow(10, decimals)
        resolve(balance)
      } else { console.error(error) }
    })
  })
// todo
  // let symbol = await myContract.symbol().call()
}
export function getNonce (address) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(address, function (error, result) {
      if (!error) {
        let nonce2 = '0x' + result.toString(16)
        resolve(nonce2)
      } else {
        console.error(error)
      }
    })
  })
}
export function getGasPrice () {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice(function (error, result) {
      if (!error) {
        let gasPrice = '0x' + result.toString(16)
        resolve(gasPrice)
      } else console.error(error)
    })
  })
}
export function getGas (data) {
  return new Promise((resolve, reject) => {
    web3.eth.estimateGas(data, function (error, result) {
      if (!error) {
        let gas = '0x' + result.toString(16)
        resolve(gas)
      } else { console.error(error) }
    })
  })
}

export function sendTransaction (prvKey, fromAddr, toAddr, gasprice, val, feedback, token2Addr) {
  let privateKey = Buffer.from(prvKey, 'hex')
  let value = (val * Math.pow(10, 18)).toString()

  // 以太币转账，不用encoded
  let encoded
  if (token2Addr) encoded = '0x' + abi.simpleEncode('transfer(address,uint256):(bool)', token2Addr, value).toString('hex')

  // gas,gasPrice,value 单位是wei
  let gasPrice = web3.fromDecimal(web3.toWei(gasprice, 'gwei'))
  let txParams = {
    nonce: web3.eth.getTransactionCount(fromAddr),
    gasPrice: gasPrice,
    value: web3.fromDecimal(web3.toWei(val, 'ether')),
    to: toAddr,
    from: fromAddr,
    data: encoded,
    chainId: 3 // 必须是数字
  }
  // 代币转账，没有value
  if (typeof token2Addr !== 'undefined') delete txParams['value']

  // 预估交易 Gas Limit
  getGas(txParams).then(web3Gas => {
    txParams.gas = web3Gas

    console.log('txParams', txParams)
    const txStr = new TX(txParams)
    txStr.sign(privateKey)
    const serializedTx = txStr.serialize()

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, result, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log('result', result)
        feedback()
      }
    })
  })
}
export function isAddress (address) {
  return web3.isAddress(address)
}
