<template>
  <div class="hello">
        <div class="icondiv"></div>
        <Menu :active-name="activeobj.selected" @on-select="menuselect" @on-open-change="openchange" theme="light" width="auto" :open-names="activeobj.openname" ref="child1" >
            
            <template v-for="(item, index) in activeobj.activelist">
                <template v-if="item.type == 0">
                    <MenuItem :name="item.href" >
                        <Icon :type="item.icon" ></Icon>
                        <span class="layout-text">{{item.name}}</span>
                    </MenuItem>
                </template>
                <template v-if="item.type == 1">
                    <Submenu :name="index">
                        <template slot="title" >
                            <Icon :type="item.icon"></Icon>
                            {{item.name}}{{index}}
                        </template>
                        <template v-for="(item2, index2) in item.child">
                            <MenuItem :name="item2.href" >{{item2.name}}</MenuItem>
                        </template>
                    </Submenu>
                </template>
            </template>
            <!--<template v-if="ok">
                <MenuItem name="1" >
                    <Icon type="home" ></Icon>
                    <span class="layout-text">首页</span>
                </MenuItem>
            </template>
            <div>
                <Submenu name="2">
                    <template slot="title" >
                        <Icon type="star"></Icon>
                        全网通
                    </template>
                    <MenuItem name="2-1">服务开启</MenuItem>
                    <MenuItem name="2-2">新建推广</MenuItem>
                    <MenuItem name="2-3">推广管理</MenuItem>
                    <MenuItem name="2-4">数据报表</MenuItem>
                    <MenuItem name="2-5">微站</MenuItem>
                </Submenu>
            </div>
            <div>
                <MenuItem name="3" href="/account">
                    <Icon type="ios-keypad" ></Icon>
                    <span class="layout-text">账户</span>
                </MenuItem>
            </div>
            <MenuItem name="4">
                <Icon type="help" ></Icon>
                <span class="layout-text">答疑解惑</span>
            </MenuItem>-->
        </Menu>
  </div>
</template>

<script>
export default {
  name: 'menulist',
  data () {
    return {
      ok:true,
      msg: 'Welcome to Your Vue.js App',
      activeobj:{
          selected:"#/services",
          openname:[0],
          activelist:[
              {
                  'type':0,
                  'name':'首页',
                  'icon':'home',
                  'href':'#/'
              },
              {
                  'type':1,
                  'name':'全网通',
                  'icon':'star',
                  'child':[
                      {
                          'name':'服务开启',
                          'href':'#/star/services'
                      },
                      {
                          'name':'新建推广',
                          'href':'#/star/generalize'
                      },
                      {
                          'name':'推广管理',
                          'href':'#/star/manage'
                      },
                      {
                          'name':'数据报表',
                          'href':'#/star/report'
                      },
                      {
                          'name':'微站',
                          'href':'#/star/microstation'
                      }
                  ]
              },
              {
                  'type':0,
                  'name':'账户',
                  'icon':'ios-keypad',
                  'href':'#/account'
              },
              {
                  'type':0,
                  'name':'答疑解惑',
                  'icon':'help',
                  'href':'#/help'
              }
          ]
      }
    }
  },
  mounted () {
      if(localStorage.openchange == 1 || this.$route.path.indexOf("/star") > -1){
        localStorage.openchange = 1;
        this.activeobj['openname'] = [1];
      }
      console.log(this.$route.path);
      //this.activeobj['openname'] = [1];
      this.activeobj['selected'] = "#"+this.$route.path;
      this.$nextTick( () => {
         this.$refs.child1.updateOpened();
      })
  },
  methods: {
    menuselect (a) {
      console.log(a);
      /*var numstr = ""+a;
      if(numstr.indexOf("-") > -1){
        console.log(this.activeobj.activelist[numstr.split("-")[0]]['child'][numstr.split("-")[1]].href);
        window.location.href = this.activeobj.activelist[numstr.split("-")[0]]['child'][numstr.split("-")[1]].href;
      }else{
        console.log(this.activeobj.activelist[a].href);
        window.location.href = this.activeobj.activelist[a].href;
      }*/
      window.location.href = a
    },
    openchange (b) {
      if(b.length == 2){
          localStorage.openchange = 1;
      }else{
          localStorage.openchange = 0;
      }
        console.log( b);
    }
  }
}
</script>
