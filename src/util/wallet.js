// import BIP39 from 'bip39'
// import HDKey from 'ethereumjs-wallet/hdkey'
// import Wallet from 'ethereumjs-wallet'
// import ethUtil from 'ethereumjs-util'

// // 构造钱包对象
// function Wallet () {}

// // 创建钱包对象
// function createWallet () {

// }

// function fromMasterAccount (mnemonic, wallet, account) {
//   var ret = new Account()
//   ret._mnemonic = mnemonic
//   // 主
//   ret._wallet = wallet
//   // 子
//   ret._account = account
//   return ret
// }

// Account.createAccount = function () {
//   // 生成 mnemonic code
//   var mnemonic = BIP39.generateMnemonic()
//   // 生成 seed
//   var seed = BIP39.mnemonicToSeed(mnemonic)

//   // 生成 master key
//   // 使用 seed 生成 HD Wallet。如果要说更明确，就是生成 Master Key 并记录起来。

//   var _wallet = EthereumHDKey.fromMasterSeed(seed)
//   // 生成第一个 Ethereum Address
//   var account = _wallet.derivePath("m/44'/60'/0'/0/0")

//   return fromAccount(mnemonic, _wallet, account.getWallet())
// }

// Account.fromAccountByMnemonic = function (mnemonic) {
//   if (!BIP39.validateMnemonic(mnemonic)) {
//     throw new Error('Mnemonic is wrong')
//   }
//   var seed = BIP39.mnemonicToSeed(mnemonic)

//   var _wallet = EthereumHDKey.fromMasterSeed(seed)
//   var account = _wallet.derivePath("m/44'/60'/0'/0/0")

//   return fromAccount(mnemonic, account.getWallet())
// }

// Account.fromAccountByPrivateKey = function (privateKey) {
//   return fromAccount('EMPTY', Wallet.fromPrivateKey(ethUtil.toBuffer(privateKey)))
// }

// Account.fromAccountByKeystore = function (keystore, pwd) {
//   return fromAccount('EMPTY', Wallet.fromV3(keystore, pwd))
// }

// Account.prototype.getMnemonicString = function () {
//   return this._mnemonic
// }

// // 生成 Master Private Key
// Account.prototype.getMasterPrvKey = function () {
//   return this._wallet.privateExtendedKey()
// }

// Account.prototype.getAddressString = function () {
//   return this._wallet.getAddressString()
// }

// Account.prototype.getPrivateKeyString = function () {
//   // 生成第一个 Ethereum Address 的 Private key
//   return this._wallet.getPrivateKeyString()
// }

// Account.prototype.getPublicKeyString = function () {
//   // 生成第一个 Ethereum Address 的 Public key
//   return this._wallet.getPublicKeyString()
// }

// Account.prototype.getKeystoreString = function (pwd) {
//   // 生成第一个 Ethereum Address 的 Keystore
//   return this._wallet.toV3String(pwd)
// }

// module.exports = Wallet
