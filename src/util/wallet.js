import BIP39 from 'bip39'
import HDKey from 'ethereumjs-wallet/hdkey'
import Wallet from 'ethereumjs-wallet'
import Util from 'ethereumjs-util'

// 生成 mnemonic code
export function generateMnemonic () {
  return BIP39.generateMnemonic()
}
// 验证 mnemonic code 是否符合BIP39
export function validateMnemonic (mnemonic) {
  return BIP39.validateMnemonic(mnemonic)
}

// 助记词导入账户
export class Account {
  constructor (mnemonic, coinType, accountIndex) {
    this.mnemonic = mnemonic
    this.coinType = coinType
    this.accountIndex = accountIndex
  }

  // 助记词生成账户
  formMnemonic () {
  // 将 mnemonic code 转成 binary 的 seed
    const seed = BIP39.mnemonicToSeed(this.mnemonic)

    // 生成 master key
    // 使用 seed 生成 HD Wallet。如果要说更明确，就是生成 Master Key 并记录起来。
    const masterAccount = HDKey.fromMasterSeed(seed)
    // console.log('hdWallet', masterAccount)
    return masterAccount
  }

  // 助记词 => seed => masterAccount => derivedNode
  // 生成子节点
  generateChildNode () {
    const masterAccount = this.formMnemonic(this.mnemonic)

    // 生成 Master Private Key
    // const masterPrvKey = masterAccount.getWallet().getPrivateKeyString()
    // 生成 Master Public Key
    // const masterPubKey = masterAccount.getWallet().getPublicKeyString()

    //   // 生成第一个 Ethereum Address
    let path = "m/44'/" + this.coinType + "'/0'/0/" + this.accountIndex

    const derivedNode = masterAccount.derivePath(path)
    // console.log('derivedNode', derivedNode)

    return derivedNode
  }

  get account () {
    return this.generateChildAccount()
  }

  // 子节点生成子账号
  generateChildAccount () {
    const childNode = this.generateChildNode(this.accountIndex)
    const childWallet = childNode.getWallet()
    const childAccount = getAccountInfo(childWallet)
    return childAccount
  }
}

// 用Wallet 得到账号的私钥，公钥，地址
export function getAccountInfo (account) {
  // 生成 Private key
  const prvKey = account.getPrivateKeyString()
  // 生成 Public key
  // const childPubKry = derivedNode.getWallet().getPublicKeyString()
  const rowPubKey = Util.privateToPublic(prvKey)
  const pubKey = Util.bufferToHex(rowPubKey)

  //  生成 address。
  // const childAddr = derivedNode.getWallet().getAddressString()
  const addr = Util.publicToAddress(rowPubKey)
  const addrStr = Util.bufferToHex(addr)

  // 用EIP55 Encoding Address
  const address = Util.toChecksumAddress(addrStr)

  return { prvKey, pubKey, address }
}

// todo 优化prvKey 取值
// 私钥恢复钱包
function prvKey2Wallet (prvKey) {
  // 去掉前面的0x
  let rowPrvKey = prvKey.substring(2)
  var key = Buffer.from(rowPrvKey, 'hex')
  // 私钥恢复钱包
  var wallet = Wallet.fromPrivateKey(key)
  return wallet
}

//  加密子节点的 Private key 生成 KeyStore
export function generateKeyStore (prvKey, password) {
  var wallet = prvKey2Wallet(prvKey)
  var keyStore = wallet.toV3String(password)
  return keyStore
}

// KeyStore导入账户
//  解密 KeyStore 得到 Private key
export function fromV3KeyStore (keyStore, password) {
  return Wallet.fromV3(keyStore, password).getPrivateKeyString()
}

// 私钥导入账户
export function fromPrivateKey (prvKey) {
  const wallet = prvKey2Wallet(prvKey)
  return getAccountInfo(wallet)
}
