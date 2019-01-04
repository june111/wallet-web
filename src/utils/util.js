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
