<template>
  <div>
    <h3>{{username}}，欢迎回来</h3>
    <div class="listtitle">我的账户</div>
    <div class="accountul">
      <div class="accountbox">
        <div class="accountboxtop">我的推广</div>
        <div class="accountboxmid">1个</div>
        <Button type="primary" v-on:click="linkfor('account')" >管理</Button>
      </div>
      <div class="accountbox">
        <div class="accountboxtop">可用优惠券</div>
        <div class="accountboxmid">0张</div>
        <Button type="primary" v-on:click="linkfor('test')">查看</Button>
      </div>
      <div class="accountbox">
        <div class="accountboxtop">推广可用资金</div>
        <div class="accountboxmid">138元</div>
        <Button type="primary" v-on:click="linkfor('help')">充值</Button>
      </div>
      <div class="clearboth"></div>
    </div>
    <div class="listtitle">系统公告</div>
    <div class="listtitle">推广状态通知</div>
    <a v-on:click="this.fetch(2,5)">jia</a>
    <router-view/>
  </div>
</template>

<script>
import {fetch} from '@/store/new_file'
export default {
  name: 'main',
  data () {
    return {
      username: '沈阳礼品回收'
    }
  },
  mounted () {
  	fetch(1,2);
  },
  methods: {
    linkfor (a) {
      this.$router.push('/main/'+a);
    },
    fetch1(a,b){
    	fetch(a,b)
    }
  }
}
</script>
