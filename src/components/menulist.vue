<template>
  <div class="hello">
        <div class="icondiv"></div>
        <Menu :active-name="activeobj.selected" @on-select="menuselect" @on-open-change="openchange" theme="light" width="auto" :open-names="activeobj.openname" ref="child1" >
            
            <template v-for="(item, index) in activeobj.activelist">
                <template v-if="item.type == 0">
                    <MenuItem :name="item.href" >
                        <!--<Icon :type="item.icon" ></Icon>-->
                        <div :class="item.icon"></div>
                        <div class="layout-text">{{item.name}}</div>
                    </MenuItem>
                </template>
               
            </template>
        </Menu>
  </div>
</template>

<script>
export default {
  name: 'menulist',
  data () {
    return {
      activeobj:{
          selected:"#/star_report",
          openname:[1],
          activelist:[
              {
                  'type':0,
                  'name':'我的账户',
                  'icon':['iaccount','cipp'],
                  'href':'#/main'
              },
              {
                  'type':0,
                  'name':'服务开启',
                  'icon':['iservices','cipp'],
                  'href':'#/services'

              },
              {
                  'type':0,
                  'name':'新建推广',
                  'icon':['ic-extension','cipp'],
                  'href':'#/account'
              },
              {
                  'type':0,
                  'name':'推广管理',
                  'icon':['im-extension','cipp'],
                  'href':'#/help'
              },
              {
                  'type':0,
                  'name':'数据列表',
                  'icon':['idata','cipp'],
                  'href':'#/datalist'
              },
              {
                  'type':0,
                  'name':'答疑解惑',
                  'icon':['ianswer','cipp'],
                  'href':'#/answer'
              },
              {
                  'type':0,
                  'name':'安全中心',
                  'icon':['isafe','cipp'],
                  'href':'#/safe'
              },
              {
                  'type':0,
                  'name':'消息提醒',
                  'icon':['inews','cipp'],
                  'href':'#/news'
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
         this.$refs.child1.updateActiveName();
      })
  },
  methods: {
    menuselect (a) {
      console.log(a);
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
