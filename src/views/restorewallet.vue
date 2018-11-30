<template>
  <div class="create-wallet">
    <h1>恢复身份</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="助记词" name="mnemonic">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
      <el-tab-pane label="私钥" name="privateKey">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
      <el-tab-pane label="keystore" name="keystore">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import dataForm from '@/components/form'
import { Account, fromV3KeyStore, fromPrivateKey } from '@/utils/wallet'

export default {
  name: 'restorewallet',
  components: {
    dataForm
  },
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'bg-create'
  },
  data () {
    return {
      activeName: 'mnemonic',
      postForm: {}
    }
  },
  mounted: function () {},
  methods: {
    dataForm (dataForm) {
      this.postForm = dataForm

      let account = {
        name: dataForm.name,
        password: dataForm.password
      }
      this.$store.commit('setAccount', account)

      this.restoreAccount()
    },
    restoreAccount () {
      if (this.activeName === 'mnemonic') this.restoreFromMnemonic()
      if (this.activeName === 'privateKey') this.restoreFromPrvkey()
      if (this.activeName === 'keystore') this.restoreFromKeystore()
    },
    restoreFromMnemonic () {
      const mnemonic = this.postForm.content
      let wallet = {}
      wallet = new Account(mnemonic, '60', '0').account
      wallet.mnemonic = mnemonic
      console.log('wallet', wallet)
      this.$store.commit('setWallet', wallet)
    },
    restoreFromPrvkey () {
      const prvkey = this.postForm.content
      let wallet = fromPrivateKey(prvkey)
      console.log('wallet', wallet)
      this.$store.commit('setWallet', wallet)
    },
    restoreFromKeystore () {
      const keystore = this.postForm.content
      const password = this.postForm.password
      let prvKey = fromV3KeyStore(keystore, password)
      let wallet = fromPrivateKey(prvKey)
      console.log('wallet', wallet)
      this.$store.commit('setWallet', wallet)
    }
  }
}

</script>
<style lang="scss">
body {}

</style>
