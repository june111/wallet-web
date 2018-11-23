<template>
  <el-form :model="dataForm" ref="dataForm" label-width="100px" class="demo-ruleForm" :rules="rules">
    <el-form-item label="name" prop="name">
      <el-input type="text" v-model.trim.number="dataForm.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="password" prop="password">
      <el-input type="password" v-model.trim.number="dataForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="password again" prop="checkPass" v-if="activeName !== 'keystore' ">
      <el-input type="password" v-model.trim.number="dataForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item :label="contentLabel" prop="content" v-if="activeName !== 'create' ">
      <el-input type="text" v-model.trim.number="dataForm.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  // 接受父组件的值
  props: {
    activeName: {
      type: String,
      required: true
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password) {
        callback(new Error('两次输入密码不一致!'))
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
        content: [{ required: true, trigger: 'blur' }],
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
    }
  }

}

</script>
