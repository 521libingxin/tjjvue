<template>
  <div>
    <h3>{{username}}，欢迎回来</h3>
    <div class="listtitle">我的账户</div>
    <div class="listtitle">系统公告</div>
    <div class="listtitle">推广状态通知</div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      username: '沈阳礼品回收'
    }
  }
}
</script>
