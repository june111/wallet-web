<template>
  <div>
    <h1>恢复身份</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="助记词" name="mnemonic">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
      <el-tab-pane label="私钥" name="privateKey">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
      <el-tab-pane label="keystore" name="keystore">
        <data-form :activeName="activeName" @dataForm="dataForm" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import dataForm from '@/components/form'

export default {
  name: 'restorewallet',
  components: {
    dataForm
  },
  data () {
    return {
      activeName: 'mnemonic',
      postForm: {}

    }
  },
  methods: {
    dataForm (dataForm) {
      this.postForm = dataForm
    }
  }
}

</script>
