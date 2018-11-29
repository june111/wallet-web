<template>
  <div v-loading="loading">
    <!-- <el-select v-model="network" placeholder="请选择" @change="changeNetwork">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
    <h1>{{tokenName}}</h1>
    <h2>余额：{{tokenAmount}}</h2>
    <el-row>
      <el-button type="primary" @click="handleTransfer">转账</el-button>
      <el-button @click="detailsFormVisible = true">详情</el-button>
    </el-row>
    <el-row>
      交易记录
      <el-col v-for="(item) in list" :key="item.id">
        <el-card shadow="hover">
          <div>
            <div class="card-content">
              {{item.hash}}
              {{item.timeStamp | parseTime('{y}/{m}/{d} {h}:{i}')}}
              <span v-if="item.from.toUpperCase() == myAddr.toUpperCase() ">-</span>
              <span v-else>+</span>
              {{item.value | weiToEther() }} ether
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog width="80%" :title="tokenName+'转账'" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="金额" prop="val">
          <el-input v-model.trim.number="form.val" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款地址" prop="addr">
          <el-input v-model.trim="form.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="矿工费用" :label-width="formLabelWidth" prop="gasprice">
          <el-input v-model.trim="form.gasprice" autocomplete="off"></el-input>Gwei
        </el-form-item>
      </el-form>
      <el-dialog width="50%" title="确认密码" :visible.sync="innerVisible" append-to-body>
        <el-form :model="passform" ref="passform" :rules="passwordRules" :label-width="formLabelWidth">
          <el-form-item label="密码" prop="password">
            <el-input v-model="passform.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmPsw">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePassword">确 定</el-button>
      </div>
    </el-dialog>
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
          <el-button type="primary" @click="handleExportPrvkey">导出私钥</el-button>
          <el-button type="primary" @click="innerVisible2 = true" style="margin-left: 30px">导出keystore</el-button>
        </el-row>
      </div>
      <el-dialog width="50%" title="确认密码" :visible.sync="innerVisible2" append-to-body>
        <el-form :model="passform" ref="passform" :rules="passwordRules">
          <el-form-item label="密码" prop="password">
            <el-input v-model="passform.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportKeystore">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { generateKeyStore } from '@/utils/wallet'
import { sendTransaction, isAddress } from '@/utils/transaction'

import VueQrcode from '@chenfengyuan/vue-qrcode'

import clip from '@/utils/clipboard' // 复制功能
import FileSaver from 'file-saver' // 导出json

import {
  getTransactionRecordURL,
  getRopstenTransRecordURL,
  getKovanTransRecordURL,
  getRinkebyTransRecordURL,
  getRopstenTokenTransRecordURL,
  Request
} from '@/api/api'

export default {
  name: 'token',
  components: {
    'qrcode': VueQrcode
  },
  data () {
    let validateAddr = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'))
      } else if (!isAddress(value)) {
        callback(new Error('地址不正确'))
      } else {
        callback()
      }
    }
    let validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入转账数量'))
      }
      setTimeout(() => {
        // gas * price + value
        if (value > (this.amount + this.form.gasprice)) {
          callback(new Error('余额不足'))
        } else {
          callback()
        }
      }, 1000)
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.myPassword) {
        callback(new Error('密码不正确'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      options: [{ value: '1', label: 'Main Net' },
        { value: '3', label: 'Ropsten test network' },
        { value: '4', label: 'Rinkeby test network' },
        { value: '42', label: 'Kovan test network' }
      ],
      network: '3',
      // 交易列表
      list: '',
      tokenName: '',
      tokenAmount: '',
      // 转账表单
      dialogFormVisible: false,
      form: {
        val: '',
        addr: '',
        gasprice: '0.001'
      },
      rules: {
        val: [{ required: true, trigger: 'blur', validator: validateAmount }],
        addr: [{ required: true, trigger: 'blur', validator: validateAddr }],
        gasprice: [{ required: true, trigger: 'blur' }]
      },
      // 确认密码表单
      innerVisible: false,
      innerVisible2: false,
      passform: {
        password: ''
      },
      passwordRules: {
        password: [{ trigger: 'blur', validator: validatePass }]
      },
      formLabelWidth: '100px',

      detailsFormVisible: false,
      // 二维码的设置
      qroption: {
        width: 200,
        errorCorrectionLevel: 'Q'
      }
    }
  },
  created () {},
  mounted: function () {
    this.$nextTick(function () {
      this.getParam()
    })
  },
  // 同步值
  computed: {
    ...mapState({
      // 钱包地址
      accountName: state => state.account.name,
      myAddr: state => state.wallet.address,
      myPrvKey: state => state.wallet.prvKey,
      myPassword: state => state.account.password
    }),
    qrVal: function () {
      return 'ethereum:' + this.myAddr
    }

  },
  watch: {
    '$route': function () {
      this.getParam()
    }
  },
  methods: {
    // 网络
    getNetwork () {
      var version = this.web3.version.network
      this.network = version
      this.$store.commit('setNetwork', this.network)
    },
    changeNetwork () {
      this.getTransactionRecord()
      this.$store.commit('setNetwork', this.network)
    },

    getParam () {
      this.tokenName = this.$route.query.token
      this.tokenAmount = this.$route.query.amount
      this.tokenName === 'ETH' ? this.getTransactionRecord() : this.getRQTTransRecord()
    },
    getRQTTransRecord () {
      const addr = {
        address: this.myAddr,
        contractaddress: '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa'
      }
      Request(getRopstenTokenTransRecordURL, 'get', addr)
        .then(res => {
          const result = res.data.result
          result === '0' ? this.list = '' : this.list = result
        })
    },
    // 查交易记录
    getTransactionRecord () {
      const addr = {
        address: this.myAddr
      }
      let url
      if (this.network === '1') url = getTransactionRecordURL
      if (this.network === '3') url = getRopstenTransRecordURL
      if (this.network === '4') url = getRinkebyTransRecordURL
      if (this.network === '42') url = getKovanTransRecordURL

      Request(url, 'get', addr)
        .then(res => {
          const result = res.data.result
          result === '0' ? this.list = '' : this.list = result
        })
    },
    // 转账
    handleTransfer () {
      this.dialogFormVisible = true
    },
    confirmPsw () {
      this.innerVisible = false
      this.$refs['passform'].resetFields()
      this.tokenName === 'ETH' ? this.sendTrans() : this.sendToken()
    },
    handlePassword () {
      this.$refs['form'].validate(vaild => {
        // 通过表单验证
        if (vaild) {
          this.innerVisible = true
        }
      })
    },
    sendTrans () {
      let feedback = () => {
        this.dialogFormVisible = false
        this.$refs['form'].resetFields()
      }
      sendTransaction(this.myPrvKey, this.myAddr, this.form.addr, this.form.gasprice, this.form.val, feedback)
    },
    sendToken () {
      let feedback = () => {
        this.dialogFormVisible = false
        this.$refs['form'].resetFields()
      }
      sendTransaction(this.myPrvKey, this.myAddr, '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa', this.form.gasprice, this.form.val, feedback, this.form.addr)
    },

    // todo
    handleExportPrvkey () {

    },
    // 点击复制地址
    handleCopy (event) {
      clip(this.myAddr, event)
    },
    // 导出私钥
    exportKeystore () {
      this.$refs['passform'].validate(vaild => {
        // 通过表单验证
        if (vaild) {
          this.innerVisible2 = false
          this.detailsFormVisible = false
          this.loading = true
          setTimeout(() => {
            const text = generateKeyStore(this.myPrvKey, this.myPassword)
            var blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
            FileSaver.saveAs(blob, this.accountName + '-keystore.json')
            this.loading = false
          }, 1000)
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
