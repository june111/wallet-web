const bcrypt = require('bcryptjs')

// 加密
export function encryption (password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      hash ? resolve(hash) : reject(err)
    })
  })
}

// 验证
export function decrypt (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      !err ? resolve(res) : reject(err)
    })
  })
}
