<template>
  <div>
    <h1>创建身份</h1>
    <main>
      <el-form :model="postForm" ref="postForm" label-width="100px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="name" prop="name">
          <el-input type="text" v-model.number="postForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model.number="postForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password again" prop="repassword">
          <el-input type="password" v-model.number="postForm.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('postForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script>
export default {
  name: 'createwallet',
  data () {
    return {
      postForm: {
        name: '',
        password: '',
        repassword: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        repassword: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
