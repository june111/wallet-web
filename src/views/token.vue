<template>
  <div>
    <h1>{{accountName}}</h1>
    <h2>地址：{{myAddr}}</h2>
    <div v-for="(item,i) in tokenList" :key="i">
      <div @click="goDetail(item.name,item.amount)">
        <el-card shadow="always">
          <span>{{item.name}}</span>
          <span style="float: right;">{{item.amount}}</span>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getTokenBalance } from '@/utils/transaction'

export default {
  name: 'token',

  data () {
    return {
      tokenList: []
    }
  },

  mounted: function () {
    this.$nextTick(function () {
      this.getList()
    })
  },
  // 同步值
  computed: {
    ...mapState({
      // 钱包地址
      accountName: state => state.account.name,
      myAddr: state => state.wallet.address,
      amount: state => state.wallet.amount
    })

  },
  methods: {

    getList () {
      this.tokenList = [{
        name: 'ETH',
        amount: this.amount
      }, {
        name: 'RQT',
        amount: ''
      }]
      getTokenBalance(this.myAddr, '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa').then(result => {
        this.tokenList[1].amount = result
      })
    },
    goDetail (name, amount) {
      this.$router.push({
        path: '/detail',
        query: {
          token: name,
          amount: amount
        }
      })
    }

  }

}

</script>
<style lang="scss">
.address {

  margin: auto auto 25px;

  .el-button {
    width: 255px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

</style>
