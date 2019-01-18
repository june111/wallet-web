import { BigNumber } from 'bignumber.js'

const CryptoJS = require('crypto-js')

// 加密
export function encrypt (msg, sk) {
  const ciphertext = CryptoJS.AES.encrypt(msg, sk.toString()).toString()
  return ciphertext
}

// 解密
export function decrypt (msg, sk) {
  const bytes = CryptoJS.AES.decrypt(msg, sk.toString())
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

// 验证

export function verify (input, msg, sk) {
  return decrypt(msg, sk) === input
}

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object}
 * @return {Boolean}
 */
var isBigNumber = function (object) {
  return object instanceof BigNumber ||
        (object && object.constructor && object.constructor.name === 'BigNumber')
}
/**
 * Returns true if object is string, otherwise false
 *
 * @method isString
 * @param {Object}
 * @return {Boolean}
 */
var isString = function (object) {
  return typeof object === 'string' ||
        (object && object.constructor && object.constructor.name === 'String')
}

var toBigNumber = function (number) {
  /* jshint maxcomplexity:5 */
  number = number || 0
  if (isBigNumber(number)) { return number }

  if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
    return new BigNumber(number.replace('0x', ''), 16)
  }

  return new BigNumber(number.toString(10), 10)
}

export function toNum (val) {
  // let x = new BigNumber(val)
  // x = x.toNumber()
  let x = toBigNumber(val).toNumber()
  return x
}
