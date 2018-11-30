<template>
  <el-form :model="dataForm" ref="dataForm" label-position="left" class="block-form form" :rules="rules">
    <el-form-item label="name" prop="name">
      <el-input type="text" v-model.trim="dataForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input type="password" v-model.trim="dataForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="password again" prop="checkPass" v-if="activeName !== 'keystore' ">
      <el-input type="password" v-model.trim="dataForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="contentLabel" prop="content" v-if="activeName !== 'create'&&activeName !=='keystore' ">
      <el-input type="text" v-model.trim="dataForm.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item :label="contentLabel" prop="content" v-if="activeName === 'keystore' ">
      <div tabindex="0" class="el-upload el-upload--text">
        <button type="button" class="el-button el-button--primary el-button--small btn-upload" @change="loadTextFromFile">
          <span>点击上传</span>
        </button>
        <input type="file" name="file" multiple="multiple" class="el-upload__input"></div>
      <!-- <input type="file" @change="loadTextFromFile"> -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { validateMnemonic, isValidPrivate } from '@/utils/wallet'
export default {
  // 接受父组件的值
  props: {
    activeName: {
      type: String,
      required: true
    }
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入' + this.activeName))
      } else if (this.activeName === 'mnemonic' && !validateMnemonic(value)) {
        callback(new Error('请输入有效助记词'))
      } else if (this.activeName === 'privateKey' && !isValidPrivate(value)) {
        callback(new Error('请输入有效私钥'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        name: '',
        content: '',
        password: '',
        checkPass: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur', validator: validateContent }],
        password: [{ required: true, trigger: 'blur' }],
        checkPass: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  computed: {
    contentLabel: function () {
      return this.activeName
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // dataForm是在父组件on监听的方法
          // 第二个参数this.dataForm是需要传的值
          this.$emit('dataForm', this.dataForm)

          this.$router.push({ path: '/token' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loadTextFromFile (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        this.dataForm.content = e.target.result
        console.log('load', e.target.result)
      }
      reader.readAsText(file)
    }
  }

}

</script>
<style lang="scss">
.block-form {
  .el-form-item__content {
    text-align: center;
  }

  .btn-upload,
  .el-upload {
    width: 100%;
    height: 40px;
  }

  .el-button {
    margin-top: 20px;
  }
}

</style>
