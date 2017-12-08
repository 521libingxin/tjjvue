<template>
  <div class="hello">
    <Menu :active-name="activeobj.selected" theme="light" width="auto" :open-names="[activeobj.openname]" >
        <div style="height:100px;"></div>
        <MenuItem name="1">
            <Icon type="home" ></Icon>
            <span class="layout-text">首页</span>
        </MenuItem>
        <Submenu name="2">
            <template slot="title">
                <Icon type="star"></Icon>
                全网通
            </template>
            <MenuItem name="2-1">服务开启</MenuItem>
            <MenuItem name="2-2">新建推广</MenuItem>
            <MenuItem name="2-3">推广管理</MenuItem>
            <MenuItem name="2-4">数据报表</MenuItem>
            <MenuItem name="2-5">微站</MenuItem>
        </Submenu>
        <MenuItem name="3">
            <Icon type="ios-keypad" ></Icon>
            <span class="layout-text">账户</span>
        </MenuItem>
        <MenuItem name="4">
            <Icon type="help" ></Icon>
            <span class="layout-text">答疑解惑</span>
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'menulist',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeobj:{
          selected:'1',
          openname:'2'
      }
    }
  },
  mounted () {
      
  },
  methods: {
    menuselect () {
      console.log(123);
    }
  }
}
</script>
