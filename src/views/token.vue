<template>
  <div>
    <h1>ETH</h1>
    <h2>地址：{{myAddr}}</h2>
    <h2>余额：{{amount}}</h2>
    交易记录
    <el-col v-for="(item) in list" :key="item.id">
      <el-card shadow="hover">
        <div>
          <div class="card-content">
            {{item.from}}
            {{item.to}}
            {{item.hash}}
            {{item.timeStamp | parseTime('{y}/{m}/{d}')}}
            <!-- todo -->
            <!-- <span v-if="item.to !== myAddr ">+</span>
            <span v-else>-</span> -->
            {{item.value | weiToEther() }} ether
          </div>
        </div>
      </el-card>
    </el-col>
    <el-button type="primary" @click="handleTransfer">转账</el-button>
    <el-button type="success" @click="handleReceipt">收款</el-button>
    <el-dialog width="80%" title="转账" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="ETH" :label-width="formLabelWidth" prop="val">
          <el-input v-model.trim="form.val" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款地址" :label-width="formLabelWidth" prop="addr">
          <el-input v-model.trim="form.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="矿工费用" :label-width="formLabelWidth" prop="gasprice">
          <el-input v-model.trim="form.gasprice" autocomplete="off"></el-input>Gwei
        </el-form-item>
      </el-form>
      <el-dialog width="50%" title="确认密码" :visible.sync="innerVisible" append-to-body>
        <el-form :model="passform" ref="passform" :rules="passwordRules">
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model.number="passform.password" autocomplete="off"></el-input>
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

import Web3 from 'web3'
// import abi from 'ethereumjs-abi'
import TX from 'ethereumjs-tx'

import {
  getTransactionRecordURL,
  Request
} from '@/api/api'

export default {
  name: 'token',
  data () {
    let validateAddr = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'))
      } else if (!this.web3.isAddress(value)) {
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
        if (value < this.amount + this.form.gasprice) {
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
      amount: '',
      list: '',
      // 转账表单
      dialogFormVisible: false,
      form: {
        val: '',
        addr: '',
        gasprice: ''
      },
      rules: {
        val: [{ trigger: 'blur', validator: validateAmount }],
        addr: [{ trigger: 'blur', validator: validateAddr }],
        gasprice: [{ required: true, trigger: 'blur' }]
      },
      // 确认密码表单
      innerVisible: false,
      passform: {
        password: ''
      },
      passwordRules: {
        password: [{ trigger: 'blur', validator: validatePass }]
      },
      formLabelWidth: '100px'
    }
  },
  created () {
    this.getWeb3()
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getBalance()
      this.getTransactionRecord()
    })
  },
  // 同步值
  computed: {
    ...mapState({
      // 钱包地址
      myAddr: state => state.wallet.addr,
      myPrvKey: state => state.wallet.prvKey,
      myPassword: state => state.account.password
    })
  },
  methods: {
    getWeb3 () {
      if (typeof web3 !== 'undefined') {
        // this.web3 = new Web3(web3.currentProvider)
        // this.isMetamask = true
      } else {
        // set the provider you want from Web3.providers
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8081')) // 本地同步的测试网络的节点
        // this.isMetamask = false
      }
    },
    getBalance () {
      this.web3.eth.getBalance(this.myAddr, (error, result) => {
        if (!error) {
          this.amount = parseInt(result, 10) / Math.pow(10, 18)
          this.$store.commit('setAmount', this.amount)
        } else {
          console.error(error)
        }
      })
    },
    getTransactionRecord () {
      const addr = {
        address: this.myAddr
      }
      Request(getTransactionRecordURL, 'get', addr)
        .then(res => {
          this.list = res.data.result
          console.log('res', res.data.result)
        })
    },
    handleTransfer () {
      this.form.gasprice = 0.001
      this.dialogFormVisible = true
    },
    confirmPsw () {
      this.innerVisible = false
      this.$refs['passform'].resetFields()
      this.sendTransaction()
    },
    handlePassword () {
      this.$refs['form'].validate(vaild => {
        // 通过表单验证
        if (vaild) {
          this.innerVisible = true
        }
      })
    },
    sendTransaction () {
      const privateKey = Buffer.from(this.myPrvKey, 'hex')
      // var encoded = '0x' + abi.simpleEncode("bet(uint256)", event.target.innerHTML).toString('hex')

      this.getNonce().then(web3Nonce => {
        // gas,gasPrice,value 单位是wei
        const gasPrice = (this.form.gasprice * Math.pow(10, 9)).toString()
        console.log('gasPrice', gasPrice)
        const txParams = {
          nonce: web3Nonce,
          gas: this.web3.fromDecimal('300000'), // 十进制数字或者十进制字符串转为十六进制
          gasPrice: this.web3.fromDecimal(gasPrice), // 0.001 Gwei
          value: this.web3.fromDecimal(this.web3.toWei(this.form.val, 'ether')),
          to: this.form.addr,
          from: this.myAddr,
          // data: encoded,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: 3
        }
        console.log('txParams', txParams)
        const txStr = new TX(txParams)
        txStr.sign(privateKey)
        const serializedTx = txStr.serialize()

        this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, result, data) => {
          if (err) {
            console.error(err)
          } else {
            console.log('result', result)
            this.dialogFormVisible = false
            this.$refs['form'].resetFields()
          }
        })
      })
    },
    getNonce () {
      return new Promise((resolve, reject) => {
        this.web3.eth.getTransactionCount(this.myAddr, (error, result) => {
          if (!error) {
            let nonce = '0x' + result.toString(16)
            resolve(nonce)
          } else {
            console.error(error)
          }
        })
      })
    },
    handleReceipt () {

    }
  }

}

</script>
