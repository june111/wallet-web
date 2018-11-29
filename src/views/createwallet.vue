<template>
  <div>
    <div>
    <h1>创建身份</h1>
    </div>

    <data-form :activeName="activeName" @dataForm="dataForm" />
  </div>
</template>
<script>
import dataForm from '@/components/form'

import { Account, generateMnemonic } from '@/utils/wallet'

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
  mounted: function () {
    // console.log('ss',generateChildAccount('0'))
  },
  methods: {
    dataForm (dataForm) {
      // console.log('dataForm', dataForm)
      this.$store.commit('setAccount', dataForm)

      // 异步用 dispatch
      // this.$store.dispatch('createAccountData', dataForm)
      this.generateAccount()
    },
    generateAccount () {
      // 生成 mnemonic code
      let mnemonic = generateMnemonic()
      let wallet = {}
      wallet = new Account(mnemonic, '60', '0').account
      wallet.mnemonic = mnemonic
      console.log('wallet', wallet)
      this.$store.commit('setWallet', wallet)
      //   // 异步用 dispatch
      //   // this.$store.dispatch('createWalletData', wallet)
    }
  }
}

</script>
