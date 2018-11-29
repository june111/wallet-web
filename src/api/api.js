import axios from 'axios'
import config from './config'
const request = axios.create(config)

// 接口
// main
export const getTransactionRecordURL = 'https://api.etherscan.io/api?module=account&action=balance&tag=latest'
// Kovan
export const getKovanTransRecordURL = 'https://api-kovan.etherscan.io/api?module=account&action=balance&tag=latest'
// Rinkeby
export const getRinkebyTransRecordURL = 'https://api-rinkeby.etherscan.io/api?module=account&action=balance&tag=latest'
// Ropsten
export const getRopstenTransRecordURL = 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999'
export const getRopstenTokenTransRecordURL = 'https://api-ropsten.etherscan.io/api?module=account&action=tokentx&page=1&offset=100'

// 接口方法
export function Request (url, method, data) {
  if (method === 'get' || method === 'delete') {
    return request({
      url: url,
      method: method,
      params: data
    })
  } else {
    return request({
      url: url,
      method: method,
      data
    })
  }
}
