import axios from 'axios'
import config from './config'
const request = axios.create(config)

// export const banner = async ( params) => {
//   return await request.get(`${api}/v1/get_banner`, params)
// }

export const getTransactionRecordURL = 'http://ropsten.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999'

// 接口

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
