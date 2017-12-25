<template>
  <div class="login-bg">
    <div class="login-box">
    	<div class="login-tle"></div>
    	<div class="login-text">账号</div>
    	<Input v-model="value" size="large" icon="ios-close" placeholder="请输入账号" style="margin-bottom: 40px;"></Input>
    	<div class="login-text">密码</div>
    	<Input v-model="value" size="large" icon="ios-eye-outline" placeholder="请输入密码" type="password"></Input>
    	<div class="login-bom">
    		<Checkbox v-model="single" class="auto-checkbox">下次自动登录</Checkbox>
    	</div>
    	<Button type="primary" size="large" long>登录</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '沈阳礼品回收登录'
    }
  }
}
</script>
<style type="text/css">
	.login-bg{top:0;left:0;bottom:0;right:0;z-index: 2000; position: fixed; background: url(../../static/img/login-bg.jpg);-webkit-background-size:cover;background-size:cover;background-repeat:no-repeat;background-position:center;}
	.login-box{width:380px;height: 420px;position: absolute;left:50%;top:50%;margin-left: -190px;margin-top: -210px; background-color: #fff; border-radius: 3px; padding: 0 40px;}
	.login-tle{height:38px;text-align: center;width:76px; margin:20px auto 36px;background:url(../../static/img/jiu-tle.png);-webkit-background-size:100% 100%;background-size:100% 100%;background-repeat:no-repeat;background-position:center;}
	.login-text{ font-weight: bold; height: 25px;}
	.login-bom{height: 80px; padding-top: 10px;}
</style>