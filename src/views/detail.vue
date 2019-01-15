<template>
  <div v-loading="loading" class="detail">
    <!-- <el-select v-model="network" placeholder="请选择" @change="changeNetwork">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
    <div class="block-card">
      <span class="name">{{tokenName}}</span>
      <span class="amout">{{tokenAmount}}</span>
      <el-button type="primary" @click="handleTransfer">转账</el-button>
    </div>
    <el-row>
      <span class="trans">交易记录</span>
      <el-col v-for="(item) in list" :key="item.id">
        <el-card shadow="hover">
          <div style="display: flex">
            <img v-if="item.from.toUpperCase() == myAddr.toUpperCase() " src="../assets/icon/out.svg" alt=""  width="30px" style="margin-right: 10px;" />
            <img v-else src="../assets/icon/in.svg" alt=""  width="25px" style="margin-right: 10px;" />
            <div class="card-content space-betwee" style="width: 90%">
              <span>
                <span class="address">{{item.hash.substring(0,10) + '...' +item.hash.substring(56)}}</span>
              <span class="time">{{item.timeStamp | parseTime('{y}/{m}/{d}')}}</span>
              </span>
              <span>
                <span v-if="item.from.toUpperCase() == myAddr.toUpperCase() ">-</span>
              <span v-else>+</span>
              {{item.value | weiToEther() | trimPrecision(4) }} ether
              </span>
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
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { sendTransaction, isAddress } from '@/utils/transaction'

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
  beforeCreate: function () {
    document.getElementsByTagName('body')[0].className = 'bg-detail'
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
      contractaddress: '0x42a99ea3a2dc9bcac72031d8e67723dccfa6edfa',
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
      // innerVisible2: false,
      passform: {
        password: ''
      },
      passwordRules: {
        password: [{ trigger: 'blur', validator: validatePass }]
      },
      formLabelWidth: '100px'

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
        contractaddress: this.contractaddress
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
      this.tokenName === 'ETH' ? this.sendETH() : this.sendToken()
    },
    handlePassword () {
      this.$refs['form'].validate(vaild => {
        // 通过表单验证
        if (vaild) {
          this.innerVisible = true
        }
      })
    },
    sendETH () {
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
      sendTransaction(this.myPrvKey, this.myAddr, this.contractaddress, this.form.gasprice, this.form.val, feedback, this.form.addr)
    }

  }

}

</script>
<style lang="scss">

.detail {
  color: #fff;

  // 余额信息
  .block-card {
    border: 1px solid #fff;
    border-radius: 20px;
    max-height: 200px;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    text-align: center;

    .el-button--primary {
      background-color: #293bc1;
      border-color: #293bc1;
      width: 200px;
    }

    .name,
    .amout {
      display: block;
      margin-bottom: 20px;

    }

    .name {
      font-size: 24px;

    }

    .amout {}
  }

  // 交易记录的字
  .trans {
    margin: 0 auto 20px 10px;
    display: inline-block;
  }

  // 交易记录
  .el-card {
    .address {
      display: block;

    }

    .time {
      color: #ffffff9c;
    }
  }
}

</style>
