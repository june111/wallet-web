<template>
    <div>
        <quick-menu :menu-count=count :icon-class=icons :menu-url-list=list :backgroundColor=backgroundColor></quick-menu>
    </div>
</template>
<script>
import quickMenu from 'vue-quick-menu'

export default {
  components: {
    quickMenu
  },
  props: {
    count: {
      type: Number
    }
  },
  data () {
    return {
      list: [{ isLink: true, url: '/create-wallet' }, { isLink: true, url: '/restore-wallet' }, { isLink: true, url: '/token' }, { isLink: true, url: '/detail' }],
      icons: ['icon icon-create', 'icon icon-restore'],
      backgroundColor: '#74a6b9a8'
    }
  }
}
</script>
<style>
.quick-menu .sub-menu a i{
    width: 35px;
    height: 35px;
    display: inline-block;
}
.icon{
    background-repeat: no-repeat !important;
    background-size: contain !important;
}
.icon-create{
    background-image:url(../assets/icon/add.svg) !important;
}
.icon-restore{
    background-image:url(../assets/icon/restore.svg) !important;
}
</style>
