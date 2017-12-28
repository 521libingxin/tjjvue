<template>
  <div class="test">
     cityselect
     <AutoComplete
        v-model="value1"
        :data="data1"
        @on-search="handleSearch1"
        placeholder="input here"
        style="width:200px"></AutoComplete>
        <Button v-on:click="searchcity()">添加</Button>
        <Button v-on:click="getthiscity()">当前城市</Button>
     <div>
        <template v-if="parent_obj.selectcity.length == allcity362.length">
        <span>全国362个城市<span v-on:click="clearall()">x</span></span>
        </template>
        <template v-if="parent_obj.selectcity.length != allcity362.length">
            <template v-for="city in parent_obj.parent_city" >
                <span style="color:#bbb;" v-if="city.childnum == city.childs.length && city.id != -1">
                    {{city.area_name}}
                    <span v-on:click="changeparent(city,false)">x</span>
                </span>
            </template>
            <template v-for="city in parent_obj.parent_city" >
                <template v-if="city.childnum != city.childs.length || city.id == -1">
                    <template v-for="ccity in city.childs">
                        <span v-if="parent_obj.selectcity.indexOf(','+ccity.id+',') > -1">
                            {{ccity.area_name}}
                            <span v-on:click="changechild(ccity,false)">x</span>
                        </span>
                    </template>
                </template>
            </template>
        </template><br>
        <Button v-on:click="addcity()">打开</Button>
     </div>
    <Modal v-model="modal" width="360" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Delete confirmation</span>
            </p>
            <div  style="text-align:center;height:400px;overflow:auto;">
                <div v-for="city in modal_obj.parent_city" >
                    <button v-on:click="changeparent(city,false)" style="color:#bbb;" v-if="city.childnum == city.childs.length">
                        {{city.area_name}}
                    </button>
                    <button v-on:click="changeparent(city,true)" v-if="city.childnum != city.childs.length">
                        {{city.area_name}}
                    </button>
                    <template  v-for="ccity in city.childs">
                        <span v-on:click="changechild(ccity,false)" style="color:#bbb" v-if="modal_obj.selectcity.indexOf(','+ccity.id+',') > -1">
                            {{ccity.area_name}}
                        </span>
                        <span v-on:click="changechild(ccity,true)" v-if="modal_obj.selectcity.indexOf(','+ccity.id+',') == -1">
                            {{ccity.area_name}}
                        </span>
                    </template>
                    <br>
                </div>
            </div>
            <div slot="footer">
                <Button size="large" @click="modal_Ok()">确定</Button>
                <Button size="large" @click="selectall()">全选</Button>
                <Button size="large" @click="clearall()">重置</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'cityselect',
  props: ['citys','citylist','province'],
  data () {
      return {
          value1: '',//搜索的值
          data1:[],//搜索数组
          searchobjs:{},//搜索的对象
          modal:false, //弹框是否打开
          //province:'',
          defaultcity:[], //默认城市——预留
          // citys:[],//已选城市
          //selectcity:',', //已选城市id匹配字符串
          //parent_city:[], //父类包含子类主要数据列表
          all_city:[], //后台返回处理后的数据
          checkout:',香港,澳门,台湾,', //排除显示的城市
          parent_obj:{
              selectcity:'',
              parent_city:[]
          },
          modal_obj:{
              selectcity:',',
              parent_city:[]
          },
          checkedobj:'parent_obj',
          allcity362:','
      }
  },
  watch:{
    parent_obj:{
        handler (val,oldVal){
            console.log("change");
            this.submit();
        },
        deep:true
    },
    province (val,oldVal) {
        if(val != oldVal){
            let citys_str = ","+this.citys.join(",")+",";
            this.all_city = this.citylist;
            this.parent_obj.selectcity = ",";
            /*第一次组装数据，删掉直辖市，排除香港等*/
            let zxobj = {
                area_name:"直辖市",
                id:-1,
                pid:1
            }
            this.all_city.unshift(zxobj);
            for(let i in this.all_city){
                if(this.all_city[i].ismit == 1){
                    this.all_city[i].pid = -1;
                }
                if(this.checkout.indexOf(","+this.all_city[i].area_name+",") > -1){
                    this.all_city[i].pid = -2;
                }
            }
            // 第二次数据组装，形成父类包含子类的结构 
            for(let i in this.all_city){
                let parentid = this.all_city[i].pid;
                if(parentid == 1){
                    this.parent_obj.parent_city.push(this.all_city[i]);
                }else{
                    for(let j in this.parent_obj.parent_city){
                        if(parentid == this.parent_obj.parent_city[j].id){
                            this.allcity362 += this.all_city[i].id + ",";
                            if(!this.parent_obj.parent_city[j].childs){
                                this.parent_obj.parent_city[j].childs = [];
                                this.parent_obj.parent_city[j].childnum = 0;
                            }
                            this.parent_obj.parent_city[j].childs.push(this.all_city[i]);
                        }
                    }
                    //this.child_city.push(response.data.city_list[i]);
                }
                if(citys_str.indexOf(","+this.all_city[i].baidu+",") > -1){
                    if(parentid !== 1){
                        this.changechild(this.all_city[i],true);
                    }
                }
            }
            for(let i in this.parent_obj.parent_city){
                if(citys_str.indexOf(","+this.parent_obj.parent_city[i].baidu+",") > -1){
                    this.changeparent(this.parent_obj.parent_city[i],true);
                }
            }
        }
    }
  },
  methods: {
      searchcity(){ //搜索添加城市
        if(this.value1 != ''){
            var selected = this.searchobjs[this.value1];
            if(this[this.checkedobj].selectcity.indexOf(","+selected.id+",") == -1){
                this.addobjcity(selected);
            }
            this.value1 = '';  
        }
      },
      handleSearch1(key){ //搜索列出城市
        this.data1 = [];
        let searchobj = {};
        if(key != ""){
            for(let i in this.all_city){
                if(this.all_city[i].pid != 1 && (this.all_city[i].area_name.indexOf(key) > -1 || this.all_city[i].city_domain.indexOf(key) > -1)){
                    let key1 = this.all_city[i].area_name.indexOf(key);
                    let key2 = this.all_city[i].city_domain.indexOf(key);
                    if(key1 > -1){
                        this.searchobjs[this.all_city[i].area_name] = this.all_city[i];
                        if(searchobj[key1]){
                            searchobj[key1].push(this.all_city[i].area_name);
                        }else{
                            searchobj[key1] = [this.all_city[i].area_name];
                        }
                    }else if(key2 > -1){
                        this.searchobjs[this.all_city[i].area_name] = this.all_city[i];
                        if(searchobj[key2]){
                            searchobj[key2].push(this.all_city[i].area_name);
                        }else{
                            searchobj[key2] = [this.all_city[i].area_name];
                        }
                    }
                    if(searchobj[0] && searchobj[0].length > 4){
                        break;
                    }
                    //this.data1.push(this.all_city[i].area_name);
                }
            }
            this.data1 = [];
            for(var i in searchobj){
                this.data1 = this.data1.concat(searchobj[i]);
                if(this.data1.length > 4){
                    break;
                }
            }
        }
      },
      addcity (){//打开模态框
        this.modal_obj = JSON.parse(JSON.stringify(this.parent_obj));
        this.checkedobj = 'modal_obj';
        this.modal = true;
      },
      modal_Ok (){//关闭模态框
        this.parent_obj = this.modal_obj;
        this.checkedobj = 'parent_obj';
        this.modal = false;
      },
      selectall (){
        this[this.checkedobj].selectcity = this.allcity362;
        for(let j in this[this.checkedobj].parent_city){
            if(this[this.checkedobj].parent_city[j].pid == 1){
                this[this.checkedobj].parent_city[j].childnum = this[this.checkedobj].parent_city[j].childs.length;
            }
        }
      },
      clearall (){
        for(let j in this[this.checkedobj].parent_city){
            if(this[this.checkedobj].parent_city[j].pid == 1){
                this[this.checkedobj].parent_city[j].childnum = 0;
            }
        }
        this[this.checkedobj].selectcity = ',';
      },
      addparentnum (obj,type){
            for(let j in this[this.checkedobj].parent_city){
                if(obj.pid == this[this.checkedobj].parent_city[j].id){
                    this[this.checkedobj].parent_city[j].childnum += 1*type;
                }
            }
      },
      addobjcity(obj){
        this.addparentnum(obj,1);
        this[this.checkedobj].selectcity += obj.id + ',';
      },
      removeobjcity(objr){
        this.addparentnum(objr,-1);
        this[this.checkedobj].selectcity = this[this.checkedobj].selectcity.replace(','+objr.id+',',',');
      },
      changeparent (obj,ok){
        if(ok){
            //选中所有子类
            for(let i in obj.childs){
                if(this[this.checkedobj].selectcity.indexOf(','+obj.childs[i].id+',') == -1){
                    this.addobjcity(obj.childs[i]);
                }
            }
        }else{
            //删除所有子类
            for(let i in obj.childs){
                let objr = obj.childs[i];
                this.removeobjcity(objr);
            }
        }
      },
      changechild (obj,ok){
        if(ok){//选中单个子类
            this.addobjcity(obj);
        }else{//删除单个子类
            this.removeobjcity(obj);
        }
      },
      getthiscity(){
        let parent_city = this.parent_obj.parent_city;
        for(let i in parent_city){
            if(parent_city[i].id == this.province){
                this.changeparent(parent_city[i],true);
            }
        }
      },
      submit (){
          let submitarray = [];
          let parent_city = this.parent_obj.parent_city;
          if(this.parent_obj.selectcity.length == this.allcity362.length){
              submitarray.push('9999');
          }else{
            for(let i in parent_city){
                if(parent_city[i].childnum == parent_city[i].childs.length && parent_city[i].id != -1){
                    submitarray.push(parent_city[i].baidu);
                }else{
                    for(let j in parent_city[i].childs){
                        if(this.parent_obj.selectcity.indexOf(','+parent_city[i].childs[j].id+',') > -1){
                            submitarray.push(parent_city[i].childs[j].baidu);
                        }
                    }
                }
            }
          }
          this.$emit('cityselected',submitarray);
      }
  }
}
</script>
