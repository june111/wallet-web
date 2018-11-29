<template>
  <div class="home">
    <h1>HD Wallet</h1>
    <div class="btn">
      <el-button type="primary" @click="create">新建</el-button>
      <el-button @click="restore">恢复</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    create () {
      this.$router.push({
        path: '/create-wallet'
      })
    },
    restore () {
      this.$router.push({
        path: '/restore-wallet'
      })
    }
  }
}

</script>
<style lang="scss">
@import "src/assets/common/_common.scss";

html {
  background: url('../assets/bg.jpg');
}

.home {
  color: #fff;
  position: relative;
  top: 20vh;
  text-align: center;

  h1 {
    font-size: 5rem;
  }

}

.btn {
  .el-button+.el-button {
    margin-left: auto;
    margin-top: 20px;
  }

  .el-button {
    width: 15rem;
    display: block;
    margin: 0 auto;
    border-radius: 0;
  }

}

</style>
