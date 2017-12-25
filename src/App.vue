<template>
  <div id="app">
    <div class="menuleft">
        <menulist></menulist>
    </div>
    <div class="main-head"><div class="main-head-con">aaa<span style="float: right;">dad</span></div></div>
    <div class="main">
        <div class="mainbox">
            <div class="maintop"></div>
            <router-view/>
        </div>
        <div class="main-right">
                          右边
        </div>
   
    </div>

  </div>
</template>

<script>
import menulist from '@/components/menulist'
export default {
  name: 'app',
  data () {
      return {
      }
  },
  mounted () {
      
  },
  components: {
    menulist
  }
}
</script>
<style>
  @import './base.css';
</style>

