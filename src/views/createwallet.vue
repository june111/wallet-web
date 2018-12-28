<template>
  <div class="create-wallet">
<quick-menu :count=2 />
    <h1>创建身份</h1>
    <data-form :activeName="activeName" @dataForm="dataForm" />
  </div>
</template>
<script>
import dataForm from '@/components/form'
import quickMenu from '@/components/quickMenu'

import { Account, generateMnemonic } from '@/utils/wallet'

export default {
  name: 'createwallet',
  components: {
    dataForm,
    quickMenu
  },
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'bg-create'
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
