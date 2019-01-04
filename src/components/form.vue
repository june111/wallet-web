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
      <el-upload ref="upload" action="/assets" :auto-upload="false" :limit="1" :on-change="handleUpload" :on-exceed="fileExceed">
        <el-button type="primary">点击上传 keystore 文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { validateMnemonic, isValidPrivate } from '@/utils/wallet'
import { encrypt } from '@/utils/util'
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
          // 通过表单验证
          let postForm = Object.assign({}, this.dataForm)
          delete postForm['checkPass']
          postForm['createtime'] = (new Date()).valueOf()

          // 加密存储密码
          const hash = encrypt(postForm['password'], postForm['createtime'])
          postForm['password'] = hash

          // dataForm是在父组件on监听的方法
          this.$emit('dataForm', postForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkJson (file) {
      const isJosn = file.raw.type === 'application/json'
      if (!isJosn) this.$message.error('上传文件必须是json文件')
      return isJosn
    },
    fileExceed () {
      this.$message.error('只能上传1个文件')
    },
    handleUpload (file, fileList) {
      this.checkJson(file) ? this.loadTextFromFile(file) : this.$refs.upload.clearFiles()
    },
    loadTextFromFile (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.dataForm.content = e.target.result
      }
      reader.readAsText(file.raw)
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
