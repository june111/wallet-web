<template>
  <div>
    <h1>创建身份</h1>
    <data-form :activeName="activeName" @dataForm="dataForm" />
  </div>
</template>
<script>
import dataForm from '@/components/form'

export default {
  name: 'createwallet',
  components: {
    dataForm
  },
  data () {
    return {
      activeName: 'create'

    }
  },
  methods: {
    dataForm (dataForm) {
      console.log('dataForm', dataForm)

      this.$store.commit('setAccount', dataForm)

      // 异步用 dispatch
      // this.$store.dispatch('createAccountData', dataForm)

      // this.generateAddr()
    }
    // generateAddr () {
    //   let wallet = {}

    //   // 生成 mnemonic code
    //   wallet.mnemonic = bip39.generateMnemonic()

    //   // 生成 seed
    //   const seed = bip39.mnemonicToSeed(wallet.mnemonic)

    //   // 生成 master key
    //   // 使用 seed 生成 HD Wallet。如果要说更明确，就是生成 Master Key 并记录起来。
    //   const hdWallet = hdkey.fromMasterSeed(seed)

    //   // 生成 Master Private Key
    //   // const masterPrivateKey = hdWallet._hdkey.privateKey.toString('hex')

    //   // 生成第一个 Ethereum Address
    //   const derivedNode = hdWallet.derivePath("m/44'/60'/0'/0/0")
    //   // console.log('derivedNode', derivedNode)

    //   // 生成第一个 Ethereum Address 的 Private key
    //   wallet.prvKey = derivedNode._hdkey.privateKey.toString('hex')

    //   // 私钥生成公钥
    //   // 生成第一个 Ethereum Address 的 Public key
    //   wallet.pubKey = util.privateToPublic(derivedNode._hdkey._privateKey).toString('hex')

    //   // 公钥生成 address。
    //   wallet.addr = util.pubToAddress(derivedNode._hdkey._publicKey, true)

    //   // 用EIP55 Encoding Address
    //   wallet.addr = util.toChecksumAddress(wallet.addr.toString('hex'))

    //   this.$store.commit('setWallet', wallet)

    //   let b = derivedNode.getWallet()
    //   console.log('b', b)

    //   // var walletaaa = Wallet.generate();
    //   const jsV3 = b.toV3('passwd')

    //   console.log('hdWallet', hdWallet)
    //   console.log('jsV3', jsV3)
    //   console.log('address1 EIP55 ', wallet.addr)

    //   // 异步用 dispatch
    //   // this.$store.dispatch('createWalletData', wallet)
    // }
  }
}

</script>
