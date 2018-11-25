<template>
  <div>
    <h1>创建身份</h1>
    <data-form :activeName="activeName" @dataForm="dataForm" />
  </div>
</template>
<script>
import dataForm from '@/components/form'

import { Account, generateMnemonic } from '@/util/wallet'

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
    this.test()
    // console.log('ss',generateChildAccount('0'))
  },
  methods: {
    dataForm (dataForm) {
      console.log('dataForm', dataForm)

      this.$store.commit('setAccount', dataForm)

      // 异步用 dispatch
      // this.$store.dispatch('createAccountData', dataForm)
      this.generateAccount()
    },
    test () {
      // 生成 mnemonic code
      let mnemonic = generateMnemonic()
      console.log('Account', new Account(mnemonic, '60', '0'))
    },
    generateAccount () {

    //   // 异步用 dispatch
    //   // this.$store.dispatch('createWalletData', wallet)
    }
  }
}

</script>
