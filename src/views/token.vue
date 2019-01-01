<template>
  <div class="token" v-loading.fullscreen.lock="loading">
    <div class="card">
      <div class="space-betwee">
        <span class="name">{{accountName}}</span>
        <img src="../assets/icon/menu.svg" alt=""  width="30px" @click="detailsFormVisible = true"  />
      </div>
        <span class="address">{{myAddr}}</span>
      </div>
      <div class="space-betwee block-add">
        <span>资产</span>
        <!-- <img src="../assets/icon/add.svg" alt=""  width="25px"   /> -->
      </div>
      <div v-for="(item,i) in tokenList" :key="i">
        <div @click="goDetail(item.name,item.amount)">
          <el-card shadow="always">
            <span>{{item.name}}</span>
            <span style="float: right;">{{item.amount}}</span>
          </el-card>
        </div>
      </div>
      <el-dialog width="80%" title="详情" :visible.sync="detailsFormVisible" center>
        <div style="text-align: center;">
          <el-row>
            {{accountName}}
          </el-row>
          <qrcode :value="qrVal" :options="qroption"></qrcode>
          <el-row class="address">
            <el-button @click="handleCopy">{{myAddr}}</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" @click="verifyPassword('prvKey')">导出私钥</el-button>
            <el-button type="primary" @click="verifyPassword('keystore')" style="margin-left: 30px">导出keystore</el-button>
          </el-row>
        </div>
        <el-dialog width="50%" title="确认密码" :visible.sync="innerVisible" append-to-body :before-close="closePassform">
          <el-form :model="passform" ref="passform" :rules="passwordRules">
            <el-form-item label="密码" prop="password">
              <el-input v-model="passform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleExport">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog width="50%" title="显示私钥" :visible.sync="prvKeyVisible" append-to-body :before-close="closePassform">

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="prvKeyVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getBalance } from '@/utils/transaction'
import { generateKeyStore } from '@/utils/wallet'
import VueQrcode from '@chenfengyuan/vue-qrcode'

import clip from '@/utils/clipboard' // 复制功能
import FileSaver from 'file-saver' // 导出json

import { decrypt } from '@/utils/util'

export default {
  name: 'token',
  components: {
    'qrcode': VueQrcode
  },
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'bg-token'
  },
  data () {
    return {
      loading: false,
      tokenList: [],
      detailsFormVisible: false,
      qroption: {
        width: 200,
        errorCorrectionLevel: 'Q'
      },
      innerVisible: false,
      exportType: '',
      passform: {
        password: ''
      },
      prvKeyVisible: false,
      passwordRules: {
        password: [{ trigger: 'blur', required: true, message: '请输入密码' }]
      }

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
      amount: state => state.wallet.amount,
      myPrvKey: state => state.wallet.prvKey,
      myPassword: state => state.account.password
    }),

    qrVal: function () {
      return 'ethereum:' + this.myAddr
    }
  },
  methods: {

    getList () {
      this.tokenList = [{
        name: 'ETH',
        amount: this.amount,
        address: this.myAddr
      }
        // , {
        //   name: 'RQT',
        //   amount: '',
        //   address: '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa'
        // }
      ]
      getBalance().then(result => {
        this.tokenList[0].amount = result
      })
      // getTokenBalance(this.myAddr, '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa').then(result => {
      //   this.tokenList[1].amount = result
      // })
    },
    goDetail (token, amount) {
      this.$router.push({
        path: '/detail',
        query: {
          token: token,
          amount: amount
        }
      })
    },

    // 点击复制地址
    handleCopy (event) {
      clip(this.myAddr, event)
    },
    // 导出的密码验证
    verifyPassword (type) {
      this.exportType = type
      this.innerVisible = true
    },

    closePassform () {
      this.innerVisible = false
      this.$refs['passform'].resetFields()
    },
    // 通过的密码验证，导出
    handleExport () {
      this.$refs['passform'].validate(vaild => {
        // 通过表单验证
        if (vaild) {
          // 验证密码是否正确
          decrypt(this.passform.password, this.myPassword).then(res => {
            if (res) {
              this.innerVisible = false
              this.$refs['passform'].resetFields()
              this.loading = true
              this.exportType === 'keystore' ? this.exportKeystore() : this.exportPrvkey()
            } else {
              this.$message('密码不正确')
            }
          })
        }
      })
    },
    // 导出私钥
    exportPrvkey () {

    },
    // 导出Keystore
    exportKeystore () {
      setTimeout(() => {
        const text = generateKeyStore(this.myPrvKey, this.passform.password)
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, this.accountName + '-keystore.json')
        this.detailsFormVisible = false
        this.loading = false
      }, 1000)
    }

  }

}

</script>
<style lang="scss">
.token {
  color: #fff;

  // 帐户信息
  .card {
    max-height: 200px;
    max-width: 400px;
    color: #fff;
    border: 1px solid;
    border-radius: 20px;
    margin: 20px auto;
    padding: 15px 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .name {
      font-size: 30px;
      display: inline-block;
    }

    .address {
      font-size: 16px;
      text-align: center;
      display: inline-block;
      width: 100%;
      margin: 20px auto;
    }
  }

  // 添加代币
  .block-add {
    margin: 20px 10px;
  }

  // 帐户详情对话框
  .address {

    margin: auto auto 25px;

    .el-button {
      width: 255px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

}

</style>
