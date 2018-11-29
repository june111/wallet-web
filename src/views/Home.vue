<template>
  <div class="home">
    <div class="bg">
      <h1>创建你的个人钱包</h1>
    </div>
    <div class="btn">
      <router-link to="/create-wallet">新建</router-link> |
      <router-link to="/restore-wallet">恢复</router-link>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}

</script>
<style lang="scss">
@import "src/assets/common/_common.scss";

.bg {
  height: 15rem;
  background: #afe7fb;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
  }
}
.btn{

}
</style>
