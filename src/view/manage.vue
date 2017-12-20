<template>
  <div>
    <h3>{{username}}，欢迎回来</h3>
    manage
    <Button type="primary" v-on:click="lickfor('a')">aa</Button>
	  <Button type="primary" v-on:click="lickfor('b')">bb</Button>
	  <Button type="primary" v-on:click="lickfor('c')">cc</Button>
	   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'manage',
  data () {
    return {
      username: '沈阳礼品回收'
    }
  },
  methods:{
  	lickfor(a){
  		this.$router.push('/star_manage/'+a)
  	}
  }
}
</script>
