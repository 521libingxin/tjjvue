<template>
  <div class="test">
     cityselect
     <!--<div v-for="city in citys">
        {{city.area_name}}
     </div>-->
     <div>
        <template v-for="city in parent_city" >
            <span v-on:click="changeparent(city.id,false)" style="color:#bbb;" v-if="city.childnum == city.childs.length">
                {{city.area_name}}
            </span>
            <template v-if="city.childnum != city.childs.length">
                <template v-for="ccity in city.childs">
                    <!--<span v-on:click="changechild(ccity,false)" style="color:#bbb" v-if="selectcityobj[ccity.id]">-->
                    <span v-on:click="changechild(ccity,false)" v-if="selectcity.indexOf(','+ccity.id+',') > -1">
                        {{ccity.area_name}}
                    </span>
                </template>
            </template>
        </template>
        <button v-on:click="addcity()">添加</button>
     </div>
    <Modal v-model="modal" width="360" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Delete confirmation</span>
            </p>
            <div  style="text-align:center;height:400px;overflow:auto;">
                <div v-for="city in parent_city" >
                    <button v-on:click="changeparent(city,false)" style="color:#bbb;" v-if="city.childnum == city.childs.length">
                        {{city.area_name}}
                    </button>
                    <button v-on:click="changeparent(city,true)" v-if="city.childnum != city.childs.length">
                        {{city.area_name}}
                    </button>
                    <template  v-for="ccity in city.childs">
                        <!--<span v-on:click="changechild(ccity,false)" style="color:#bbb" v-if="selectcityobj[ccity.id]">-->
                        <span v-on:click="changechild(ccity,false)" style="color:#bbb" v-if="selectcity.indexOf(','+ccity.id+',') > -1">
                            {{ccity.area_name}}
                        </span>
                        <span v-on:click="changechild(ccity,true)" v-if="selectcity.indexOf(','+ccity.id+',') == -1">
                            {{ccity.area_name}}
                        </span>
                    </template>
                    <br>
                </div>
            </div>
            <div slot="footer">
                <Button size="large" @click="del">Delete</Button>
            </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'cityselect',
  // props: ['item'],
  data () {
      return {
          value: '',
          modal:false,
          defaultcity:[],
          citys:[],
          selectcity:',',
          parent_city:[]
      }
  },
  mounted () {
      this.$ajax.get('/json/city.json')
        .then((response) => {
            this.citys = response.data.citys;
            for(let i in response.data.city_list){
                let parentid = response.data.city_list[i].pid;
                if(parentid == 1){
                    this.parent_city.push(response.data.city_list[i]);
                }else{
                    for(let j in this.parent_city){
                        if(parentid == this.parent_city[j].id){
                            if(!this.parent_city[j].childs){
                                this.parent_city[j].childs = [];
                                this.parent_city[j].childnum = 0;
                            }
                            this.parent_city[j].childs.push(response.data.city_list[i]);
                        }
                    }
                    //this.child_city.push(response.data.city_list[i]);
                }
            }
            this.start();
            
        })
        .catch(function (response) {
            console.log(response);
        });
  },
  methods: {
      addcity (){
        this.modal = true;
      },
      del (){
        this.modal = false;
      },
      start (){
        this.selectcity = ",";
        for(let k in this.citys){
            this.addparentnum(this.citys[k],1);
            this.selectcity += this.citys[k].id + ',';
        }
        console.log(this.parent_city);
      },
      addparentnum (obj,type){
            for(let j in this.parent_city){
                if(obj.pid == this.parent_city[j].id){
                    this.parent_city[j].childnum += 1*type;
                }
            }
      },
      changeparent (obj,ok){
        if(ok){
            //选中所有子类
            for(let i in obj.childs){
                if(this.selectcity.indexOf(','+obj.childs[i].id+',') == -1){
                    console.log(obj.childs[i]);
                    this.citys.push(obj.childs[i]);
                    this.addparentnum(obj.childs[i],1);
                    this.selectcity += obj.childs[i].id + ',';
                }
            }
        }else{
            //删除所有子类
            for(let i in obj.childs){
                let objr = obj.childs[i];
                for(let i in this.citys){
                    if(this.citys[i].id == objr.id){
                        this.citys.splice(i,1);
                    }
                }
                this.addparentnum(objr,-1);
                this.selectcity = this.selectcity.replace(','+objr.id+',',',');
            }
        }
      },
      changechild (obj,ok){
          console.log(obj,ok);
        if(ok){
            this.citys.push(obj);
            this.addparentnum(obj,1);
            this.selectcity += obj.id + ',';
        }else{
            for(let i in this.citys){
                if(this.citys[i].id == obj.id){
                    this.citys.splice(i,1);
                }
            }
            this.addparentnum(obj,-1);
            this.selectcity = this.selectcity.replace(','+obj.id+',',',');
            //this.selectcity += obj.id + ',';
        }
      }
  }
}
</script>
